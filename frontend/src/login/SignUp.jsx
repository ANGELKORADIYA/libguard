import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest"; // Assuming post is the function for making HTTP POST requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
    width: "23%",
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledSelect = styled(Select)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  width: "100%",
});

const SignUpPopup = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "citizen", // New property for role
  });
  const roleOptions =  ["citizen", "police"];

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body

    const { username, email, password, confirmpassword, role } = state;
    try {
      const response = await post("signup", {
        username,
        email,
        password,
        confirmpassword,
        role,
      });

      if (response.okk) {
        toast.success("🦄 Sign Up Successfully !!");
        navigate("/login");
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      document.body.style.cursor = "default"; // Reset cursor to default after processing
    }
  };

  return (
    <StyledDialog open={props.open} onClose={() => props.setinorout(null)}>
      <StyledDialogTitle>Sign Up</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="Username"
          variant="outlined"
          value={state.username}
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <StyledTextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={state.confirmpassword}
          onChange={(e) => setState({ ...state, confirmpassword: e.target.value })}
        />
        <StyledSelect
          value={state.role}
          onChange={(e) => setState({ ...state, role: e.target.value })}
          label="Role"
          variant="outlined"
        >
          {roleOptions.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledButton
          variant="contained"
          onClick={(evt) => handleSignUp(evt)}
          color="primary"
        >
          Sign Up
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={() => props.setinorout(null)}
        >
          Cancel
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignUpPopup;
