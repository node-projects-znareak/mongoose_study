window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const btnToggleModal = document.getElementById("btn-create");
  const modal = document.querySelector(".modal");
  const closeModal = document.getElementById("close");

  function toggleModal() {
    wrapper.classList.toggle("modal-open");
    modal.classList.toggle("modal-open");
  }

  btnToggleModal.addEventListener("click", toggleModal);
  closeModal.addEventListener("click", toggleModal);
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) toggleModal();
  });
});
