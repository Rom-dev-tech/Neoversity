/**
 * if you want to create another modal, add your selectors as shown in the example below
 */
// createModal(
//   "[data-example-modal]",
//   "[data-example-openModalBtn]",
//   "[data-example-closeModalBtn]",
// );

// default modal
createModal("[data-modal]", "[data-modal-open]", "[data-modal-close]");

function createModal(modal, openModalBtn, closeModalBtn) {
  const refs = {
    body: document.querySelector("body"),
    modal: document.querySelector(modal),
    openModalBtn: document.querySelectorAll(openModalBtn),
    closeModalBtn: document.querySelector(closeModalBtn),
  };

  // Error checking
  if (!refs.modal || !refs.closeModalBtn || refs.openModalBtn.length === 0) {
    console.error(
      "createModal function error: One or more modal elements not found",
    );
    return;
  }

  document.addEventListener("keydown", handleKey);
  refs.modal.addEventListener("mousedown", handleClose);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.openModalBtn.forEach(function (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });
  });

  function handleKey(e) {
    if (!refs.modal.classList.contains("is-hidden")) {
      if (e.key === "Escape") {
        toggleModal();
      }
    }
  }

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  }

  function toggleModal() {
    refs.body.classList.toggle("scroll-hidden");
    refs.modal.classList.toggle("is-hidden");

    // Accessibility improvement
    const isHidden = refs.modal.classList.contains("is-hidden");
    refs.modal.setAttribute("aria-hidden", isHidden);

    // Set focus to the modal when opening
    if (!isHidden) {
      refs.modal.focus();
    }
  }
}
