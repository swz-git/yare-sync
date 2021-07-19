import Toastify from "toastify-js";
// @ts-ignore Typescript doesn't know about the url rollup plugin
import ToastifyCSS from "../../node_modules/toastify-js/src/toastify.css";

import { colorlog } from "./tools";

const RECONNECT_TIME = 250;
const SERVER_URL = "http://localhost:8047";

function loadToastifyCSS() {
  let code = `<link rel="stylesheet" type="text/css" href="${ToastifyCSS}"></link>`;
  document.head.innerHTML += code;
}

async function fetchWithTimeout(resource: string, options: any) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

function connect() {
  setInterval(() => {
    fetchWithTimeout(SERVER_URL + "/getcode", { timeout: 500 })
      .then(async (req) => await req.text())
      .then((code) => {
        // @ts-ignore
        window.editor.setValue(code);
        // @ts-ignore
        window.update_code();
        Toastify({
          text: "Updated your code!",
          backgroundColor:
            "linear-gradient(90deg, rgba(49,194,0,1) 0%, rgba(48,255,0,1) 100%)",
        }).showToast();
      })
      .catch((e) => {});
  }, 2000);
}

async function main() {
  colorlog("Document loaded, starting yare-sync...", "color:orange");
  Toastify({ text: "Loaded yare-sync" }).showToast();
  loadToastifyCSS();
  connect();
}

export default main;
