(function (root) {
  let storage =
    typeof localStorage !== "undefined"
      ? localStorage
      : { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  const TOKEN_KEY = "ttcmanager-token";

  function getToken() {
    return storage.getItem(TOKEN_KEY);
  }
  function setToken(t) {
    if (t) storage.setItem(TOKEN_KEY, t);
    else storage.removeItem(TOKEN_KEY);
  }
  function redirectLogin() {
    if (typeof root.__redirectLogin === "function") root.__redirectLogin();
    else if (typeof window !== "undefined") window.location.href = "login.html";
  }

  async function api(path, opts) {
    const o = opts || {};
    const headers = Object.assign({ "Content-Type": "application/json" }, o.headers || {});
    if (getToken()) headers.Authorization = "Bearer " + getToken();
    const res = await fetch(path, Object.assign({}, o, { headers }));
    if (res.status === 401) {
      setToken(null);
      redirectLogin();
      throw new Error("未登录");
    }
    return res;
  }

  async function login(username, password) {
    const res = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "登录失败");
    setToken(data.token);
    return data;
  }

  async function logout() {
    try { await api("/api/auth/logout", { method: "POST" }); } catch (e) {}
    setToken(null);
  }

  async function checkAuth() {
    const res = await fetch("/api/auth/check");
    return res.json();
  }

  async function requireAuth() {
    try {
      const { initialized } = await checkAuth();
      if (!initialized) { redirectLogin(); return false; }
      if (!getToken()) { redirectLogin(); return false; }
      const r = await fetch("/api/servers", { headers: { Authorization: "Bearer " + getToken() } });
      if (r.status === 401) { redirectLogin(); return false; }
      return true;
    } catch (e) {
      redirectLogin();
      return false;
    }
  }

  const mod = { api, login, logout, checkAuth, requireAuth, setToken, getToken };
  if (typeof module !== "undefined" && module.exports) {
    mod.__setStorage = (s) => { storage = s; };
    module.exports = mod;
  }
  Object.assign(root, mod);
})(typeof window !== "undefined" ? window : globalThis);
