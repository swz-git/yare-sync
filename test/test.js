const sync = require("../");

sync.changeYareEndpoint(process.env.YARE_ENDPOINT);

test("login", () => {
  return sync
    .login(process.env.YARE_USERNAME, process.env.YARE_PASSWORD)
    .then((result) => {
      expect(result.user_id).toBe(process.env.YARE_USERNAME);
    });
});

test("get available modules", () => {
  return sync.getAvailableModules(process.env.YARE_USERNAME).then((result) => {
    console.log("Available modules:", result.length);
    expect(true).toBe(true);
  });
});

test("get active modules", () => {
  return sync.getActiveModules(process.env.YARE_USERNAME).then((result) => {
    console.log("Active modules:", result.length);
    expect(true).toBe(true);
  });
});
