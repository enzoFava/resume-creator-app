import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "../NewHeader";
import useFormHook from "../hooks/useFormHook";
import TextAreaField from "../TextAreaField";

function Experience({setIsDataSubmitted}) {
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
            label="Experience"
            name="experience"
            value={data.experience}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="cardButton">
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
      </div>
    </>
  );
}

export default Experience;
