import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Use Railway backend
  const API_BASE_URL = "https://portb-production.up.railway.app/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.username);

        // ✅ fetch user details from Railway, not localhost
        const userResponse = await fetch(`${API_BASE_URL}/auth/user/${data.username}`);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("userId", userData.id);
        }

        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Account created successfully! You can now log in.");
      } else {
        const errorData = await response.json();
        alert("Signup failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="portfolio-container">
        <h1>Portfolio App</h1>
      </div>

      <div className="login-top-right">
        <form onSubmit={handleLogin} className="login-inline-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {/* <button type="button" onClick={handleSignup}>
            Signup
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
