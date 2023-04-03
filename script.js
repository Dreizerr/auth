import { isValid } from "./isValid.js";
import { questionCreate } from "./questions(1).js";

const form = document.querySelector(".block-form");
const input = form.querySelector(".input");
const submitButton = form.querySelector(".submit");

form.addEventListener("submit", submitHandler);
input.addEventListener("input", () => {
  submitButton.disabled = !isValid(input.value);
});

function submitHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    input.disabled = true;
    submitButton.disabled = true;
    input.value = "";

    questionCreate(question).then(() => {
      input.disabled = false;
    });
  }
}
