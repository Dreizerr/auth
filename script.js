import { isValid } from "./isValid.js";
import { Question } from "./questions(1).js";

const form = document.querySelector(".block-form");
const input = form.querySelector(".input");
const submitButton = form.querySelector(".submit");
const blockQuestions = document.querySelector(".block-questions");

form.addEventListener("submit", submitHandler);
input.addEventListener("input", () => {
  submitButton.disabled = !isValid(input.value);
});

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
      .then(addToLocalStorage);
  }
}

function addToLocalStorage(question) {
  let questionsArray = getFromLocalStorage() || [];
  questionsArray.push(question);
  localStorage.setItem("questions", JSON.stringify(questionsArray));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions"));
}
