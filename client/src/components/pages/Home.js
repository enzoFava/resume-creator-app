import React, { useState, useEffect } from "react";
import Navbar from "../NewHeader";
import CheckUser from "../CheckUser";
import { checkLogin, getUserData } from "../../api";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await checkLogin();
        console.log("Check login response:", response); // Check response object
  
        setLoggedIn(response.data.loggedIn);
  
        if (response.data.loggedIn) {
          const userDataResponse = await getUserData();
          console.log("User data response:", userDataResponse); // Check user data response
  
          if (userDataResponse.status === 404) {
            setPdfData(null);
            setIsDataSubmitted(false);
          } else {
            setPdfData(userDataResponse.data);
            setIsDataSubmitted(true);
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        setIsCheckingLogin(false);
      }
    };
  
    verifyLogin();
  
    const interval = setInterval(verifyLogin, 120000);
  
    return () => clearInterval(interval);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (isCheckingLogin) {
    return <div>Loading...</div>; // Display loading spinner or message
  }

  return (
    <div>
      {loggedIn ? (
        <Navbar logOut={logOut} pdfData={pdfData} loggedIn={loggedIn} />
      ) : (
        <div>
          <Navbar loggedIn={loggedIn} />
          <CheckUser setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </div>
      )}
    </div>
  );
}

export default Home;
