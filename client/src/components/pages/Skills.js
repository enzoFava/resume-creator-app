import React from "react";
import Button from "@mui/material/Button";
import Navbar from "../NewHeader";
import { useNavigate } from "react-router-dom";
import useFormHook from "../hooks/useFormHook";
import TextAreaField from "../TextAreaField";

function Skills({ setIsDataSubmitted }) {
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

  return (
    <>
      <Navbar logOut={logOut} pdfData={pdfData} loggedIn={loggedIn} />
      <div className="cv-form">
        <form>
          <TextAreaField
            label="Skills"
            name="skills"
            value={data.skills}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="cardButton">
        <Button
          onClick={() => {
            navigate("/personal-data");
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
          type="button"
          onClick={loadedData ? handleUpdate : handleSave}
          sx={{
            color: "white",
            backgroundColor: "#4caf50",
            fontFamily: "Oswald, sans-serif",
            opacity: "0.8",
          }}
        >
          {loadedData ? "Update" : "Save"} Data
        </Button>
        <Button
        onClick={() => {
          navigate("/education");
        }}
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
      </div>
    </>
  );
}

export default Skills;
