import { isValid } from "./isValid.js";
import { Question, addToLocalStorage, getFromLocalStorage, toHTML, RenderQuestions } from "./question.js";
import { overlayClose } from "./popup.js";
import { authFormHandler } from "./auth.js";

const form = document.querySelector(".block-form");
const input = form.querySelector(".input");
const submitButton = form.querySelector(".submit-button");
const sign = document.querySelector(".sign");
const body = document.getElementById("body");
const overlay = document.querySelector(".body-overlay");
const authForm = document.querySelector(".popup__form");
// const popupInputs = document.querySelectorAll(".popup__input");

form.addEventListener("submit", submitHandler);

input.addEventListener("input", () => {
  submitButton.disabled = !isValid(input.value);
});

window.addEventListener("load", RenderQuestions);

function submitHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = new Question(input.value.trim(), new Date().toJSON());

    input.disabled = true;
    submitButton.disabled = true;
    input.value = "";

    question
      .fetchPost()
      .then((response) => {
        question.id = response.name;
        input.disabled = false;
        return question;
      })
      .then(addToLocalStorage)
      .then(RenderQuestions);
  }
}

overlay.onclick = overlayClose;

sign.onclick = () => {
  body.style.overflow = "hidden";
  overlay.classList.add("visible");
};

authForm.addEventListener("submit", authFormHandler);
