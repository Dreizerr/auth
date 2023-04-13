const authSubmit = document.querySelector(".popup__submit");

import { toHTML } from "./question.js";

export function authFormHandler(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  authSubmit.disabled = true;

  auth(email, password).then((data) => {
    authSubmit.disabled = false;
    if (data.error) authNotValid();
    else {
      RenderAllQuestions(data.idToken);
    }
  });
}

async function auth(email, password) {
  const apiKey = "AIzaSyAPg0ErVQjkz8OhO1E5QzvhNL2V78r5ChQ";

  let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": `application/json`,
    },
  });
  response = response.json();
  return response;
}

function authNotValid() {
  return alert("Неправильная почта или пароль");
}

async function RenderAllQuestions(token) {
  let response = await fetch(`https://auth-practic-c1761-default-rtdb.firebaseio.com/questions.json?auth=${token}`);
  const overlay = document.querySelector(".body-overlay");
  const sign = document.querySelector(".sign");
  overlay.remove();
  sign.remove();

  response = await response.json();
  let quesitons;
  if (response) {
    quesitons = Object.values(response);
  }

  if (quesitons)
    quesitons = quesitons.map((elem, index) => `<div class="question">${index + 1}. ${elem.text}</div>`).join("");

  document.getElementById("body").innerHTML = quesitons
    ? ` 
  <div class="container">
  <div class="block-questions">
        <h4 class="title margin-authorized">Присланные вопросы</h4>
        <div class="questions">
        ${quesitons}
        </div>
        </div>
        </div>
  
  `
    : `<div class="container">
        <div class="block-questions">
        <h4 class="title margin-authorized">Вопросов еще нет</h4>
        </div>
        </div>`;
}
