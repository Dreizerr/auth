export class Question {
  constructor(text, date) {
    this.text = text;
    this.date = date;
  }

  async fetchPost() {
    let response = await fetch("https://auth-practic-c1761-default-rtdb.firebaseio.com/questions.json", {
      method: "POST",
      body: JSON.stringify(this),
      headers: {
        "Content-type": "application/json",
      },
    });
    response = response.json();
    return response;
  }
}

export function addToLocalStorage(question) {
  let questionsArray = getFromLocalStorage();
  questionsArray.push(question);
  localStorage.setItem("questions", JSON.stringify(questionsArray));
}

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions")) || [];
}

export function RenderQuestions() {
  const blockQuestions = document.querySelector(".questions");

  const questions = getFromLocalStorage();
  const html = questions.map(toHTML).join(" ");
  blockQuestions.innerHTML = html;
}

export function toHTML(question, index) {
  return `
  <div class="question">${index + 1}. ${question.text}</div>
  `;
}
