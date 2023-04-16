import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Button, Paper, IconButton, InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CustomInputFeild from "../../Components/CustomInputs";
import { capitalizedWord } from "../../Action";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    emailError: "",
    passwordError: "",
    invalidCredential: "",
  });

  const inputRef = useRef({});
  const navigate = Navigate();

  const handleChange = (e) => {
    setInputErrors("");
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    if (inputValues?.email === "") {
      inputRef.current.email.focus();
      setInputErrors({
        ...inputErrors,
        emailError: "Please enter the email address.",
      });
    } else if (inputValues?.password === "") {
      setInputErrors({
        ...inputErrors,
        passwordError: "Please enter the password.",
      });
      inputRef.current.password.focus();
    }
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("https://reqres.in/api/login", inputValues)
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        navigate("/");
        setInputValues();
        setLoading(false);
      })
      .catch((err) => {
        setInputErrors({
          ...inputErrors,
          invalidCredential: capitalizedWord(err?.response?.data?.error),
        });
        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues?.email && inputValues?.password) {
      handleLogin();
    } else {
      formValidation();
    }
  };

  return (
    <div data-test-id="test-01">
      <Paper
        sx={{
          width: 500,
          height: 510,
          textAlign: "center",
          marginTop: "100px",
          marginLeft: "400px",
          border: "#1e2021",
        }}
        elevation={10}
      >
        <AccountCircleIcon
          style={{ paddingTop: "30px", fontSize: "70px", color: "#087ec2" }}
        />
        <h2 style={{ paddingTop: "10px" }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <InputLabel
              style={{
                paddingRight: "240px",
                color: "black",
                fontSize: "15px",
              }}
            >
              Email:
            </InputLabel>
            <CustomInputFeild
              name="email"
              type="text"
              value={inputValues.email}
              placeholder={inputValues.email === "" && "Email Address*"}
              onChange={(e) => handleChange(e)}
              inputRef={(ref) => (inputRef.current.email = ref)}
              disabled={loading}
              errorText={inputErrors.emailError}
              style={{ width: "284px" }}
              errorColor={{ color: "red", fontSize: "12px" }}
              dataTestid={"text-input-element"}
            />
          </div>
          <br />
          <div>
            <InputLabel
              style={{
                paddingRight: "213px",
                color: "black",
                fontSize: "15px",
              }}
            >
              Password:
            </InputLabel>
            <CustomInputFeild
              name="password"
              type={showPassword ? "text" : "password"}
              value={inputValues.password}
              placeholder={inputValues.password === "" && "Password*"}
              onChange={(e) => handleChange(e)}
              inputRef={(ref) => (inputRef.current.password = ref)}
              disabled={loading}
              inputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
              errorText={inputErrors.passwordError}
              errorColor={{ color: "red", fontSize: "12px" }}
              dataTestid={"password-input-element"}
            />
          </div>
          <Link
            style={{ paddingLeft: "145px", color: "#087ec2", fontSize: "15px" }}
          >
            Forgot password?
          </Link>
          <br />
          {inputErrors.invalidCredential && (
            <span style={{ color: "red", fontSize: "13px" }}>
              {inputErrors.invalidCredential}
            </span>
          )}
          <br />
          <Button
            type="onSubmit"
            style={{ textTransform: "none", width: "100px" }}
            color="primary"
            variant="contained"
            dataTestid={"login-button-element"}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <br />
          <br />
          <div>
            <p>
              Don't have an account?{" "}
              <Link style={{ color: "#087ec2", fontSize: "15px" }}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </Paper>
    </div>
  );
}
