(function () {
  const form = document.getElementById("auth-form");
  const title = document.getElementById("auth-title");
  const sub = document.getElementById("auth-sub");
  const err = document.getElementById("auth-error");
  const confirmField = document.getElementById("confirm-field");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const submitBtn = document.getElementById("submit-btn");

  let mode = "login";

  function setMode(m) {
    mode = m;
    if (m === "setup") {
      title.textContent = "初始化管理员";
      sub.textContent = "首次运行：创建管理员账号";
      confirmField.hidden = false;
      submitBtn.textContent = "创建并进入";
    } else {
      title.textContent = "登录";
      sub.textContent = "输入管理员账号继续";
      confirmField.hidden = true;
      submitBtn.textContent = "进入面板";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.textContent = "";
    submitBtn.disabled = true;
    try {
      if (mode === "setup") {
        if (password.value.length < 4) throw new Error("密码至少 4 位");
        if (password.value !== confirm.value) throw new Error("两次密码不一致");
        const res = await fetch("/api/auth/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.value.trim(), password: password.value }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "初始化失败");
      }
      await window.login(username.value.trim(), password.value);
      window.location.href = "index.html";
    } catch (ex) {
      err.textContent = ex.message || "操作失败";
    } finally {
      submitBtn.disabled = false;
    }
  });

  (async () => {
    try {
      const { initialized } = await window.checkAuth();
      setMode(initialized ? "login" : "setup");
    } catch (e) {
      setMode("login");
    }
  })();
})();
