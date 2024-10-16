import axios from "axios";
import Cookies from "js-cookie";

function generateData(crmParams) {
  const { origin, pathname } = window.location;
  const action_source = `${origin}${pathname}`;

  const form = new FormData();

  // WordPress Ajax
  form.append("action", "forms");
  form.append("security", window.ajaxnonce);
  form.append("post", window.post);
  // Locale and Connector
  form.append("locale", window.locale);
  // Inputs
  form.append("name", crmParams.userName);
  form.append("phone", crmParams.userPhone);
  form.append("email", crmParams.userEmail);
  // form.append('telegram', crmParams.userTelegram);
  // form.append('notes', crmParams.userNotes);
  // form.append('psWhoIs1', crmParams.userType);
  // Site Data
  form.append("product_name", crmParams.productName);
  form.append("product_id", crmParams.productId);
  form.append("templateVersion", window.templateVersion);
  form.append("SiteURL", action_source);
  form.append("website", "website");
  form.append("Projects", "GoIT");
  form.append("Potential_Category", "Course");
  form.append("Course", crmParams.productId);
  // Lead info
  form.append("leadActionSource", action_source);
  form.append("leadFormat", window.leadFormat || "marathon");
  form.append("leadIP", window.ipData?.ip || "");
  form.append("leadUserAgent", window.navigator.userAgent);
  form.append("google_id", readCookie("_ga"));
  form.append("leadFBC", Cookies.get("_fbc"));
  form.append("leadFBP", Cookies.get("_fbp"));
  // UTMs
  form.append("utm_source", Cookies.get("utm_source"));
  form.append("utm_medium", Cookies.get("utm_medium"));
  form.append("utm_term", Cookies.get("utm_term"));
  form.append("utm_campaign", Cookies.get("utm_campaign"));
  form.append("utm_content", Cookies.get("utm_content"));
  form.append("campaignId", Cookies.get("campaignId"));
  form.append("adsetId", Cookies.get("adsetId"));
  form.append("adId", Cookies.get("adId"));

  return form;
}

async function submit(crmParams) {
  const data = generateData(crmParams);
  return await send(data);
}

async function send(data) {
  return axios.post(window.ajaxurl, data);
  /**
   * uncomment the code below to work with form submit in localhost
   */
  // return axios.post("https://goit-connectors.place/test/", data);
}

function readCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (const cookie of ca) {
    let c = cookie.trim();
    if (c.startsWith(nameEQ)) {
      const cidLong = c.substring(nameEQ.length);
      const tmp = cidLong.split(".");
      return `${tmp[2]}.${tmp[3]}`;
    }
  }
  return null;
}

export default {
  generateData,
  submit,
};
