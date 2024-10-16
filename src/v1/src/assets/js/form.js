/**
 * Form.js - v1.2.0
 * Created @Suzuya_re1 at 2022-10-01
 * Updated @Dizardmk
 */

import $ from "jquery";
import intlTelInput from "intl-tel-input";
import JustValidate from "just-validate";
import service from "./service.js";
import crm from "./submit.js";

$(window).on("load", async function () {
  const defaultLang =
    {
      pl: "pl",
      en: "en",
      ro: "ro",
      es: "es",
      tr: "tr",
    }[window.locale] || "uk";

  const itiLocale =
    {
      pl: "pl",
      en: "ph",
      ro: "ro",
      es: "es",
      tr: "tr",
    }[window.locale] || "ua";

  // Params
  const params = {
    defaultLocale: defaultLang,
    defaultPhoneCountry: itiLocale,
    preferredPhoneCountries: [itiLocale],
    excludePhoneCountries: ["ru", "by"],
    /* It's a check that the domain has MX records on dns server */
    needsCheckEmailDomain: true,
    needsRedirectToLeeloo: !!window.leelooHash,
    // radio: true,
    forms: [
      {
        formId: "modalForm",
        productName: window.productName,
        productId: window.productId,
      },
    ],
  };

  /* It's a check the locale. */
  if (!window.locale) {
    console.error("LOCALE IS NOT SET. PLEASE SET THE LOCALE IN ADMIN PANEL");
    console.log("setting default locale:", params.defaultLocale);
    window.locale = params.defaultLocale;
  }

  /* It's a function that gets the user's IP address. */
  await service.getIpInfo().then((data) => (window.ipData = data));

  /* It's a function that gets the country code from the user's IP address. */
  await service
    .geoIpLookup(params.defaultPhoneCountry)
    .then((country_code) => (window.itiInitialCountry = country_code));

  /* It's a function that saves the UTM marks to cookies. */
  service.saveParamsToCookies([
    "utm_source",
    "utm_medium",
    "utm_content",
    "utm_term",
    "utm_campaign",
    "campaignId",
    "adsetId",
    "adId",
  ]);

  /* It's a function that takes an array of forms and validates them. */
  await Promise.all(params.forms.map(async (form) => await formHandler(form)));

  /**
   * It's a function that initializes the form
   * @param formParams - form params
   */
  async function formHandler(formParams) {
    const {
      formId,
      productName = window.productName,
      productId = window.productId,
    } = formParams;

    // Refs
    const form = document.getElementById(formId);

    if (!form) {
      throw new Error(`Form with formId <${formId}> not found`);
    }

    // Vars
    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    // const telegram = form.querySelector('[name="telegram"]');
    // const notes = form.querySelector('[name="notes"]');
    // let userType = null;
    // if (params.radio) {
    //   const radio = form.querySelectorAll('[name="user"]');

    //   radio.forEach((item) => {
    //     item.addEventListener("change", () => {
    //       userType = item.value;
    //     });
    //   });
    // }
    const iti = intlTelInput(
      phone,
      await service.getItiConfig(
        params.preferredPhoneCountries,
        params.excludePhoneCountries,
      ),
    );

    /* It's a function that initializes the validation library. */
    const validationForm = new JustValidate(
      form,
      service.validationOptions,
      // ✅ TODO: refac this
      service.getValidationLocale(),
    );
    // if (params.radio) {
    //   validationForm.addRequiredGroup(
    //     ".input-wrap-radio",
    //     "The field is required",
    //   );
    // }
    // ✅ TODO: refac this
    validationForm.setCurrentLocale(window.locale);

    phone.addEventListener("input", function (e) {
      // Replace all characters except digits and spaces globally in the input value
      e.target.value = e.target.value.replace(/[^\d\s]/g, "");
    });

    // apply rules to form fields
    service
      .setFormValidation(validationForm)
      .addField(`#${phone.id}`, [
        {
          validator: () => iti.isValidNumber(),
          errorMessage: "Phone number is invalid!",
        },
      ])
      // submit form
      .onSuccess(async function (event) {
        event.preventDefault();

        /* Adds "disabled" attribute to button with type submit. */
        service.addDisabledAttributeToSubmitBtn();

        /* It's a check that the email domain has MX records on dns server. */
        if (
          params.needsCheckEmailDomain &&
          !(await service.checkEmailDomain(email.value))
        ) {
          return service.showError(service.translate("emailNotExists"));
        }

        /* It's a function that removes extra spaces */
        name.value = name.value.trim();

        /* It's a function that gets the phone number from the input field. */
        const phoneNumber = iti.getNumber();

        const loading = new service.Loading(
          form,
          service.translate("loadingMessage"),
        );
        $(form).css("display", "none");
        loading.show();

        const crmParams = {
          userName: name.value,
          userPhone: phoneNumber,
          userEmail: email.value,
          // userTelegram: telegram.value,
          // userNotes: notes.value,
          // userType: params.radio ? userType : null,
          productName: productName,
          productId: productId,
        };

        /* It's a function that sends data to the CRM. */
        const response = crm.submit(crmParams);

        /* It's a Google Tag Manager event. */
        dataLayer.push({
          event: "lead",
          phone: phoneNumber,
          email: email.value,
          conversionId: service.uid(),
        });

        service.changeFormStep(form, 2);

        if (params.needsRedirectToLeeloo) {
          return showLeelooBlock();
        } else {
          return showDefaultBlock();
        }

        /* It's a function that redirects the user to the Leeloo CRM. */
        async function showLeelooBlock(leelooHash) {
          const data = crm.generateData(crmParams);
          service.setParamsForLeeloo(data);

          try {
            const resp = await response;

            if (resp.status === 200) {
              service.setUrlParameter("name2", name.value);
              service.setUrlParameter(
                "template_version",
                window.templateVersion,
              );

              if (window.elzaToken) {
                service.setUrlParameter("elza_id", resp.intelza_id);
              }

              // ✅ TODO: refac this
              if (window.leelooDeepLink) {
                let deepLink = String(window.leelooDeepLink);
                // https://edu.goit.global/uk/dl/maksqa-test?email=%7Bemail%7D&phone=%7Bphone%7D&fullname=%7Bname%7D&locale=uk

                const linkName = "fullname=%7Bname%7D";
                const linkPhone = "phone=%7Bphone%7D";
                const linkEmail = "email=%7Bemail%7D";

                if (deepLink.includes(linkName)) {
                  deepLink = deepLink.replace(
                    linkName,
                    `fullname=${crmParams.userName}`,
                  );
                }
                if (deepLink.includes(linkPhone)) {
                  deepLink = deepLink.replace(
                    linkPhone,
                    `phone=${crmParams.userPhone}`,
                  );
                }
                if (deepLink.includes(linkEmail)) {
                  deepLink = deepLink.replace(
                    linkEmail,
                    `email=${crmParams.userEmail}`,
                  );
                }

                service.setUrlParameter("lms_deeplink", deepLink);
              }

              service.initializeLeeloo(form, leelooHash);
              $(form).css("display", "none");
              $(form).trigger("reset");
              service.changeFormStep(form, 3);
            } else {
              console.log("error ", resp.statusText);
              $(form).css("display", "block");
              service.showError();
            }
          } catch (error) {
            console.log(error);
            $(form).css("display", "block");
            service.showError();
          } finally {
            loading.hide();
          }
        }

        /* It's a function that shows to user the default block. */
        async function showDefaultBlock() {
          try {
            const resp = await response;

            if (resp.status === 200) {
              $(form).trigger("reset");
              service.changeFormStep(form, 3);
              // show showSuccess banner and close the modal form
              service.showSuccess(
                service.translate("reply"),
                true,
                loading,
                true,
              );
              $(form).css("display", "block");

              // OR just close the modal form
              // service.closeModalForm();

              /* That redirects user to some URL after send form. */
              // window.location.href = 'someURL';
            } else {
              console.log("error ", resp.statusText);
              $(form).css("display", "block");
              service.showError();
            }
          } catch (error) {
            console.log(error);
            $(form).css("display", "block");
            service.showError();
            loading.hide();
          }
        }
      });
  }
});
