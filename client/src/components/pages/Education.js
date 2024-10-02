import React from "react";
import Navbar from "../NewHeader";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFormHook from "../hooks/useFormHook";
import TextAreaField from "../TextAreaField";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Education({ setIsDataSubmitted }) {
  const navigate = useNavigate();
  const {
    data,
    pdfData,
    loggedIn,
    loadedData,
    handleChange,
    handleSave,
    handleUpdate,
    setLoggedIn,
  } = useFormHook(setIsDataSubmitted);

  const logOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  function handleNext() {
    loadedData ? handleUpdate() : handleSave();
    navigate("/experience");
  }

  return (
    <>
      <Navbar logOut={logOut} pdfData={pdfData} loggedIn={loggedIn} />
      <div className="cv-form">
        <form>
          <TextAreaField
            label="Education"
            name="education"
            value={data.education}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="cardButton">
        <Button
          onClick={() => {
            navigate("/skills");
          }}
          type="button"
          sx={{
            color: "white",
            backgroundColor: "#4caf50",
            fontFamily: "Oswald, sans-serif",
            opacity: "0.8",
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          type="button"
          sx={{
            color: "white",
            backgroundColor: "#4caf50",
            fontFamily: "Oswald, sans-serif",
            opacity: "0.8",
          }}
        >
          Next
        </Button>
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

      </div>
    </>
  );
}

export default Education;
