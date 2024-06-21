import React from "react";
import Button from "@mui/material/Button";

function CustomBtn({ isDataSubmitted, onClicked }) {
  return (
    <Button
      sx={{
        color: "white",
        backgroundColor: "#4caf50",
        fontFamily: "Oswald, sans-serif",
      }}
      disabled={!isDataSubmitted}
      onClick={onClicked}
    >
      Download
    </Button>
  );
}

export default CustomBtn;
