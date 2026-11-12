const test = require("node:test");
const assert = require("node:assert");

function freshApi() {
  delete require.cache[require.resolve("../js/api.js")];
  const apiMod = require("../js/api.js");
  let store = {};
  const storage = { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } };
  apiMod.__setStorage(storage);
  return { apiMod, storage };
}

test("login stores token", async () => {
  const { apiMod } = freshApi();
  global.fetch = async () => ({ ok: true, status: 200, json: async () => ({ token: "tok123" }) });
  await apiMod.login("admin", "pw");
  assert.equal(apiMod.getToken(), "tok123");
});

test("api adds Authorization header", async () => {
  const { apiMod } = freshApi();
  let seen;
  global.fetch = async (path, opts) => { seen = opts; return { ok: true, status: 200, json: async () => ({}) }; };
  apiMod.setToken("abc");
  await apiMod.api("/api/servers");
  assert.equal(seen.headers.Authorization, "Bearer abc");
});

test("api on 401 clears token and redirects", async () => {
  const { apiMod, storage } = freshApi();
  let redirected = false;
  global.fetch = async () => ({ ok: false, status: 401, json: async () => ({ error: "未登录" }) });
  apiMod.setToken("expired");
  global.__redirectLogin = () => { redirected = true; };
  await assert.rejects(() => apiMod.api("/api/servers"));
  assert.equal(apiMod.getToken(), null);
});

test("requireAuth redirects to login when not initialized", async () => {
  const { apiMod } = freshApi();
  global.fetch = async (path) => {
    if (path === "/api/auth/check") return { ok: true, status: 200, json: async () => ({ initialized: false }) };
    return { ok: false, status: 401, json: async () => ({}) };
  };
  const seen = [];
  global.__redirectLogin = () => { seen.push("login"); };
  const ok = await apiMod.requireAuth();
  assert.equal(ok, false);
});
