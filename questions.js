export class Question {
  static create(question) {
    return fetch("https://auth-practic-c1761-default-rtdb.firebaseio.com/questions.json", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-type": "application/json",
      },
    }).then((respone) => respone.JSON);
  }
}
