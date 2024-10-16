// /**
//  * if you want to create another accordion, add your selectors as shown in the example below
//  */
// // createAccordion(".example__item", ".example__answer");

// // default accordion
// createAccordion(".accordion__item", ".accordion__answer");

// function createAccordion(question, answer) {
//   document
//     .querySelectorAll(question)
//     .forEach((item) => item.addEventListener("click", toggleAccordion));

//   function toggleAccordion(e) {
//     const currentTarget = e.currentTarget;
//     const target = e.target;

//     if (currentTarget !== target) {
//       return;
//     }

//     const ariaExpanded = currentTarget.getAttribute("aria-expanded");
//     const accordionAnswer = currentTarget.querySelector(answer);

//     if (ariaExpanded === "false") {
//       currentTarget.setAttribute("aria-expanded", "true");
//       accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + "px";
//     } else {
//       currentTarget.setAttribute("aria-expanded", "false");
//       accordionAnswer.style.maxHeight = 0;
//     }
//   }
// }
