import React from "react";
import Navbar from "../NewHeader";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFormHook from "../hooks/useFormHook";
import TextAreaField from "../TextAreaField";

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
            navigate("/experience");
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

export default Education;
