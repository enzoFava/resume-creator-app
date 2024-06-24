import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function LoginSuccess(){
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/personal-data")
        }
    }, [navigate]);

    return (
        <div>
            Loggin in...
        </div>
    );
};

export default LoginSuccess;
