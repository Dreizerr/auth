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
