import React, { useState } from "react";
import { login, register, googleLogin } from "../api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function CheckUser({setLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setValidationMessage("Login successful!");
      navigate("/personal-data");
    } catch (error) {
      console.error("Login failed", error);
      setValidationMessage("Invalid username or password, please register.");
      setUsername("");
      setPassword("");
      setLoggedIn(false);
    }
  };

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await register(username, password);
      alert("New user registered: " + username);
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      navigate("/personal-data");
    } catch (error) {
      console.error("Error during registration " + error);
      setLoggedIn(false)
      setValidationMessage(
        "Username already exists, Login or try a different one. "
      );
    }
  }

  return (
    <div className="user-validation">
      <form>
        <h2> Log In</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="myButtons">
          <Button
            sx={{
              color: "white",
              backgroundColor: "#4caf50",
              fontFamily: "Oswald, sans-serif",
              opacity: "0.8",
            }}
            value={username}
            type="submit"
            onClick={handleRegister}
          >
            Register
          </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#4caf50",
                fontFamily: "Oswald, sans-serif",
                opacity: "0.8",
              }}
              value={username}
              type="submit"
              onClick={handleLogin}
            >
              Login
            </Button>
        </div>
      </form>
      <p className="validation-message">{validationMessage}</p>
    </div>
  );
}

export default CheckUser;
