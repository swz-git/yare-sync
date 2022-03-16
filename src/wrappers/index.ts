import { execSync } from "child_process";
import path from "path";
import WebSocket from "ws";
import axios from "axios";

let YAREDOMAIN = "yare.io";

function changeYareEndpoint(domain: string) {
  YAREDOMAIN = domain;
}

interface userAccount {
  user_id: string;
  session_id: string;
}

async function verifySession(acc: userAccount): Promise<boolean> {
  let failed = false;
  let req = await axios
    .post(`https://yare.io/session`, {
      user_id: acc.user_id,
      session_id: acc.session_id,
    })
    .catch((e) => {
      failed = true;
    });
  if (failed) return false;
  return req?.data?.username === acc.user_id;
}

interface game {
  id: string;
  server: `d${number}`;
  pl1?: string;
  pl2?: string;
}

async function getGames(userID: string): Promise<game[]> {
  let req = await axios.get(`https://${YAREDOMAIN}/active-games/${userID}?v=2`);
  if (req.data.data === "no active games") {
    return [];
  } else {
    return req.data.data;
  }
}

async function sendCode(
  code: string,
  game: game | game[],
  acc: userAccount
): Promise<boolean> {
  // If its multiple games, run them individually
  if (Array.isArray(game)) {
    let stillworking = true;
    let promises: Promise<boolean | void>[] = [];
    for (let g of game) {
      promises.push(
        sendCode(code, g, acc).then((result) => {
          if (!result) stillworking = false;
        })
      );
    }
    await Promise.all(promises);
    // If all were successful then return true
    return stillworking;
  }

  if (!(await verifySession(acc))) {
    return false;
  }
  let ws = new WebSocket(`wss://${YAREDOMAIN}/${game.server}/${game.id}`, {
    headers: {
      "User-Agent": "yare-sync (https://github.com/swz-gh/yare-sync)",
    },
  });

  return new Promise((resolve) => {
    // @ts-ignore
    ws.on("open", (event: any) => {
      ws.send(
        JSON.stringify({
          u_code: code,
          u_id: acc.user_id,
          session_id: acc.session_id,
        })
      );
      ws.close();
      resolve(true);
    });
    // @ts-ignore
    ws.on("error", (e) => {
      resolve(false);
    });
  });
}

async function login(username: string, password: string): Promise<userAccount> {
  let req = await axios
    .post(`https://${YAREDOMAIN}/validate`, {
      user_name: username ?? "INVALID_USER",
      password,
    })
    .catch((e) => {
      throw Error("Couldn't log in");
    });

  if (req.data?.user_id === username) {
    return {
      user_id: req.data.user_id,
      session_id: req.data.data,
    };
  } else {
    throw Error("Couldn't log in");
  }
}

interface module {
  author: string;
  client_script_location: string;
  description: string;
  module_id: string;
  name: string;
  public: number;
  server_script_location: string;
  subscribers: string[];
  type: string;
}

async function getAvailableModules(username: string): Promise<module[]> {
  let req = await axios
    .post(`https://${YAREDOMAIN}/get-available-modules`, {
      user_name: username ?? "INVALID_USER",
    })
    .catch((e) => {
      throw Error("Couldn't log in");
    });

  if (req.data?.data === "modules retreived") {
    return req.data?.stream ?? [];
  } else {
    throw Error("Couldn't get available modules");
  }
}

async function getActiveModules(username: string): Promise<string[]> {
  let req = await axios
    .post(`https://${YAREDOMAIN}/get-active-modules`, {
      user_name: username ?? "INVALID_USER",
    })
    .catch((e) => {
      throw Error("Couldn't log in");
    });

  if (req.data?.data === "modules retreived") {
    return req.data?.active_modules ?? [];
  } else {
    throw Error("Couldn't get active modules");
  }
}

/** @deprecated since version 2.0 */
async function updateCode(code: string) {
  return new Promise((res, rej) => {
    let fpath = path.join(path.dirname(__filename), "../dist/server.js ");
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

module.exports = {
  updateCode,
  changeYareEndpoint,
  login,
  getGames,
  sendCode,
  verifySession,
  getAvailableModules,
  getActiveModules,
};
