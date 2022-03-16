let server = require("../dist/wrappers.js");

let username = process.env.USERN;
let password = process.env.PASSW;

async function main() {
  console.log("Logging in as", username);
  let acc = await server.login(username, password);

  if (!acc) return console.log("Login failed");

  console.log("Session id:", acc.session_id);

  let games = await server.getGames(username);

  console.log("Games:", games);

  let successful = await server.sendCode(
    "console.log('Hello, World!')",
    games,
    acc
  );

  if (successful) {
    console.log("Uploaded code!");
  }
}

main();
