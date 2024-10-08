import React from "react";
import Button from "@mui/material/Button";
import Navbar from "../NewHeader";
import { useNavigate } from "react-router-dom";
import useFormHook from "../hooks/useFormHook";
import FormField from "../FormField";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PersonalData({ setIsDataSubmitted }) {
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
    navigate("/skills");
    toast("Data Saved!");
  }

  return (
    <>
      <Navbar logOut={logOut} pdfData={pdfData} loggedIn={loggedIn} />
      <div className="cv-form">
        <form>
          <h2>Personal data</h2>
          <FormField
            label="Full Name"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <FormField
            label="Phone Number"
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
          />
          <FormField
            label="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="cardButton">
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

export default PersonalData;
