import http from "http";

console.log("yare-sync\n");

let args = process.argv.slice(2);

if (args.length < 1) {
  console.log(
    "You need to provide the code in base64 format as the first argument"
  );
  process.exit(1);
}

let code = "";
try {
  code = Buffer.from(args[0], "base64").toString();
} catch (e) {
  throw Error("First argument isn't valid base64");
}

let server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
  });
  response.write(code);
  response.end();
  console.log("Success!");
  process.exit(0);
});
server.listen(8047);
setTimeout(() => {
  console.log("Tampermonkey connection failed");
  process.exit(1);
}, 3000);
