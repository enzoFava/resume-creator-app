import React from "react";
import { Button } from "@mui/material";
import GoogleButton from 'react-google-button';

function GoogleLoginButton(){
    function handleLogin(){
        window.location.href = "http://localhost:5000/auth/google";
    };

    return (
        <div className="myButtons">
            <GoogleButton onClick={handleLogin} />
        </div>
    );
};

export default GoogleLoginButton;