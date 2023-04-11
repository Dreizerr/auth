import { isValid } from "./isValid.js";
import { Question } from "./question.js";

const form = document.querySelector(".block-form");
const input = form.querySelector(".input");
const submitButton = form.querySelector(".submit");
const blockQuestions = document.querySelector(".questions");

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

function addToLocalStorage(question) {
  let questionsArray = getFromLocalStorage();
  questionsArray.push(question);
  localStorage.setItem("questions", JSON.stringify(questionsArray));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions")) || [];
}

function RenderQuestions() {
  const questions = getFromLocalStorage();
  const html = questions.map(toHTML).join(" ");
  blockQuestions.innerHTML = html;
}

function toHTML(question, index) {
  return `
  <div class="question">${index + 1}. ${question.text}</div>
  `;
}


