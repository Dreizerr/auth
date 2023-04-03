export async function questionCreate(question) {
  await fetch("https://auth-practic-c1761-default-rtdb.firebaseio.com/questions.json", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "Content-type": "application/json",
    },
  });
}
