export async function questionCreate(question) {
  let response = await fetch("https://auth-practic-c1761-default-rtdb.firebaseio.com/questions.json", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "Content-type": "application/json",
    },
  });
  response = response.json();
  return response;
}
