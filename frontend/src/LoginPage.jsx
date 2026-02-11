import "./LoginPage.css";
import { useState } from "react";
const api = "http://127.0.0.1:8000";
function LoginPage({ onLogin }) {
  const [curr, setCurr] = useState("login");

  async function register() {
    const user_email = document.querySelector(".r_userEmail").value;
    const user_password = document.querySelector(".r_userPassword").value;

    try {
      const response = await fetch(api + "/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: user_email,
          user_password: user_password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("response not ok in register\n" + data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      me();
    } catch (err) {
      alert("Network err" + err);
    }
  }

  async function login() {
    const user_email = document.querySelector(".l_userEmail").value;
    const user_password = document.querySelector(".l_userPassword").value;

    try {
      const response = await fetch(api + "/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: user_email,
          user_password: user_password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("response not ok in login\n" + data.error);
        return;
      }
      localStorage.setItem("token", data.token);
      me();
    } catch (err) {
      alert("Network err" + err);
    }
  }

  async function me() {
    try {
      const response = await fetch(api + "/me/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log("response not ok in me");
      }

      const data = await response.json();
      console.log(data);
      onLogin(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        {curr === "login" && (
          <div id="login">
            <h2>Login</h2>

            <input type="text" placeholder="email" className="l_userEmail" />

            <input
              type="password"
              placeholder="Password"
              className="l_userPassword"
            />

            <button onClick={login}>Login</button>

            <button className="toggle" onClick={() => setCurr("register")}>
              Create account
            </button>
          </div>
        )}
        {curr === "register" && (
          <div id="register">
            <h2>Register</h2>

            <input type="email" placeholder="Email" className="r_userEmail" />

            <input
              type="password"
              placeholder="Password"
              className="r_userPassword"
            />

            <button onClick={register}>Register</button>

            <button className="toggle" onClick={() => setCurr("login")}>
              Already have account?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
