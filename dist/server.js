"use strict"
function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=e(require("http"))
console.log("yare-sync\n")
let o=process.argv.slice(2)
o.length<1&&(console.log("You need to provide the code in base64 format as the first argument"),process.exit(1))
let r=""
try{r=Buffer.from(o[0],"base64").toString()}catch(e){throw Error("First argument isn't valid base64")}t.default.createServer(((e,t)=>{t.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}),t.write(r),t.end(),console.log("Success!"),process.exit(0)})).listen(8047),setTimeout((()=>{console.log("Tampermonkey connection failed"),process.exit(1)}),3e3)
