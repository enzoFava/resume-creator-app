import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import Divider from "@mui/material/Divider";
import { login, register } from "../api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckUser({ setLoggedIn }) {
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
      toast.success("Welcome!")
    } catch (error) {
      console.error("Login failed", error);
      setValidationMessage("Invalid username or password, please register.");
      setUsername("");
      setPassword("");
      setLoggedIn(false);
      toast.error("Error logging in")
    }
  };

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await register(username, password);
      toast.success("New user registered: " + username);
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      navigate("/personal-data");
      toast.success("Welcome!")
    } catch (error) {
      console.error("Error during registration " + error);
      setLoggedIn(false);
      setValidationMessage(
        "Username already exists, Login or try a different one. "
      );
      toast.error("Error registering")
    }
  }

  return (
    <>
    <div className="user-validation">
      <form>
        <h2> Log In</h2>
        <p>With Google: </p>
        <div className="myButtons">
          <GoogleLoginButton />
        </div>
        <Divider>OR</Divider>
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
          {/* <Button
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
          </Button> */}
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
          <Typography
            sx={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "18px",
            }}
          >
            Don't have an account?{" "}
          </Typography>
          <Button
            onClick={handleRegister}
            sx={{
              color: "white",
              alignSelf: "center",
              justifySelf: "center",
              backgroundColor: "#4caf50",
              fontFamily: "Oswald, sans-serif",
              opacity: "0.8",
              padding: 0,
              "&:hover": {
                color: "white",
              },
            }}
          >
            REGISTER
          </Button>
        </div>
      </form>
      <p className="validation-message">{validationMessage}</p>
      
    </div>
    <ToastContainer
    position="bottom-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Bounce}
  />
  </>
  );
}

export default CheckUser;
