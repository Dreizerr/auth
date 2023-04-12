export function overlayClose(event) {
  if (event.target.classList.contains("body-overlay") || event.target.classList.contains("popup__close")) {
    let visibles = document.querySelectorAll(".visible");

    for (let i = 0; i < visibles.length; i++) {
      const element = visibles[i];
      element.classList.remove("visible");
    }
    body.style.overflow = "visible";
  }
}
