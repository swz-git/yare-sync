# yare-sync

Update your yare code easily from node.js.

## Setup

- Install node.js

## Example

```js
let server = require("yare-sync");

let username = "your-username";
let password = "VerySecurePassword"; // remember to not store your password in your code

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
```
