import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomBtn from "./CustomBtn";
import { jsPDF } from "jspdf";
import Zoom from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api"; // Import checkLogin function

function Navbar({ pdfData, logOut }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await checkLogin(); // Check login status
        setLoggedIn(response.data.loggedIn); // Set loggedIn state
      } catch (error) {
        console.error("Error checking login status", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchLoginStatus(); // Fetch login status on component mount
  }, []);

  function handleDownload() {
    if (pdfData) {
      // Generate PDF
      const doc = new jsPDF();

      // Add background image with opacity
      const backgroundImage = new Image();
      backgroundImage.src = "/assets/background-img.png"; // Path to the background image
      backgroundImage.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 210;
        canvas.height = 297;
        const ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.2; // Adjust the opacity value as needed
        ctx.drawImage(
          backgroundImage,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0, 210, 297);

        // Apply custom styles
        doc.setTextColor("#d545f7");
        doc.setFontSize(24);
        doc.text(pdfData.fullname, 20, 30);

        doc.setTextColor("black");
        doc.setFontSize(16);
        doc.text("Personal information", 20, 50);
        doc.setFontSize(12);
        doc.text(`Email:  ${pdfData.email}`, 20, 60);
        doc.text(
          `Phone Number:  ${pdfData.phone_number}`,
          20,
          70
        );
        doc.text(`Address:  ${pdfData.address}`, 20, 80);

        doc.setTextColor("black");
        doc.setFontSize(16);
        doc.text("Skills:", 20, 100);
        doc.setFontSize(12);
        doc.text(pdfData.skills, 20, 110);

        doc.setTextColor("black");
        doc.setFontSize(16);
        doc.text("Studies:", 20, 130);
        doc.setFontSize(12);
        doc.text(pdfData.education, 20, 140);

        doc.setTextColor("black");
        doc.setFontSize(16);
        doc.text("Experience:", 20, 160);
        doc.setFontSize(12);
        doc.text(pdfData.experience, 20, 170);

        doc.save(
          `${pdfData.fullname}-Resume.pdf`
        );
      };
    } else {
      alert("No PDF data available. Please generate the PDF first.");
    }
  }

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <div id="main-navbar" className="navbar">
        <h2 className="logo">Resume creator</h2>
        <nav>
          {loggedIn ? (
            <Zoom in={loggedIn}>
              <ul>
                <li>
                  <CustomBtn
                    onClicked={handleDownload}
                    isDataSubmitted={!!pdfData}
                  />
                </li>
                <li>
                  <Button
                    onClick={handleLogOut}
                    sx={{
                      color: "white",
                      backgroundColor: "#4caf50",
                      fontFamily: "Oswald, sans-serif",
                    }}
                  >
                    Log out
                  </Button>
                </li>
              </ul>
            </Zoom>
          ) : (
            <p>Not logged in</p>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;