# yare-sync

Update your yare code easily from node.js.

## Setup

- Install node.js
- Install tampermonkey
- Install [this](https://raw.githubusercontent.com/swz-gh/yare-sync/main/dist/client.js) userscript

## Example

```js
let server = require("yare-sync");
let result = server.updateCode("console.log('test')");
console.log(result ? "Updated code!" : "Failed to update code...");
```
