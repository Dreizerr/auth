export class Popup {
  static testFunc() {}
}

export function overlayClose(event) {
  let visibles = document.querySelectorAll(".visible");

  for (let i = 0; i < visibles.length; i++) {
    const element = visibles[i];
    element.classList.remove("visible");
  }
  body.style.overflow = "visible";
}
