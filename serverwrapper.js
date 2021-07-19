let { execSync } = require("child_process");
let path = require("path");

async function updateCode(code) {
  return new Promise((res, rej) => {
    let fpath = path.join(path.dirname(__filename), "dist/server.js ");
    let resp = execSync(
      `node ${fpath} ${Buffer.from(code, "utf-8").toString("base64")}`
    ).toString();
    if (resp.includes("Success!")) {
      res(true);
    } else {
      rej();
    }
  });
}

module.exports = { updateCode };
