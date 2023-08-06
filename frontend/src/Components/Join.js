import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

let UserName;

const Join = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState(null);

  const onClickSbmitHandler = () => {
    if (username === null) {
      return alert("Enter the name");
    }
    UserName = username;
    setusername("");
    navigate("/chat");
  };
  return (
    <div className="joinWrapper">
      <div className="">
        <TextField
          id="username"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setusername(e.target.value)}
        />
        <Button variant="contained" onClick={onClickSbmitHandler}>
          Clikc
        </Button>
      </div>
    </div>
  );
};

export default Join;
export { UserName };
