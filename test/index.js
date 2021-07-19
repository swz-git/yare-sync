let server = require("../serverwrapper");

server
  .updateCode("console.log('test')")
  .then(() => {
    console.log("Updated code!");
  })
  .catch((e) => {
    console.error("Failed to update code");
  });
