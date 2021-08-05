'use strict';

var child_process = require('child_process');
var path = require('path');
var WebSocket = require('ws');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const GAMESERVER = "d1";
const YAREDOMAIN = "yare.io";
function verifySession(acc) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let failed = false;
        let req = yield axios__default['default']
            .post(`https://yare.io/session`, {
            user_id: acc.user_id,
            session_id: acc.session_id,
        })
            .catch((e) => {
            failed = true;
        });
        if (failed)
            return false;
        return ((_a = req === null || req === void 0 ? void 0 : req.data) === null || _a === void 0 ? void 0 : _a.username) === acc.user_id;
    });
}
function getGames(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield axios__default['default'].get(`https://${YAREDOMAIN}/active-games/${userID}`);
        if (req.data.data === "no active games") {
            return [];
        }
        else {
            return req.data.data;
        }
    });
}
function sendCode(code, game, acc) {
    return __awaiter(this, void 0, void 0, function* () {
        // If its multiple games, run them individually
        if (Array.isArray(game)) {
            let stillworking = true;
            let promises = [];
            for (let g of game) {
                promises.push(sendCode(code, g, acc).then((result) => {
                    if (!result)
                        stillworking = false;
                }));
            }
            yield Promise.all(promises);
            // If all were successful then return true
            return stillworking;
        }
        if (!(yield verifySession(acc))) {
            return false;
        }
        let ws = new WebSocket__default['default'](`wss://${YAREDOMAIN}/${GAMESERVER}/${game}`, {
            headers: {
                "User-Agent": "yare-sync (https://github.com/swz-gh/yare-sync)",
            },
        });
        return new Promise((resolve) => {
            // @ts-ignore
            ws.on("open", (event) => {
                ws.send(JSON.stringify({
                    u_code: code,
                    u_id: acc.user_id,
                    session_id: acc.session_id,
                }));
                ws.close();
                resolve(true);
            });
            // @ts-ignore
            ws.on("error", (e) => {
                resolve(false);
            });
        });
    });
}
function login(username, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield axios__default['default']
            .post(`https://${YAREDOMAIN}/validate`, {
            user_name: username !== null && username !== void 0 ? username : "INVALID_USER",
            password,
        })
            .catch((e) => {
            throw Error("Couldn't log in");
        });
        if (((_a = req.data) === null || _a === void 0 ? void 0 : _a.user_id) === username) {
            return {
                user_id: req.data.user_id,
                session_id: req.data.data,
            };
        }
        else {
            throw Error("Couldn't log in");
        }
    });
}
/** @deprecated since version 2.0 */
function updateCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            let fpath = path__default['default'].join(path__default['default'].dirname(__filename), "../dist/server.js ");
            let resp = child_process.execSync(`node ${fpath} ${Buffer.from(code, "utf-8").toString("base64")}`).toString();
            if (resp.includes("Success!")) {
                res(true);
            }
            else {
                rej();
            }
        });
    });
}
module.exports = { updateCode, login, getGames, sendCode };
