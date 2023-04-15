import React from "react";
import {
  //  InputLabel,
  TextField,
} from "@mui/material";

export default function CustomInputFeild({
  // label,
  name,
  type,
  value,
  placeholder,
  onChange,
  inputRef,
  disabled,
  inputProps,
  errorText,
  style,
  errorColor,
}) {
  return (
    <div>
      {/* <InputLabel>{label}</InputLabel> */}
      <TextField
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        inputRef={inputRef}
        disabled={disabled}
        InputProps={inputProps}
        style={style}
      />
      <br />
      <span className="error" style={errorColor}>
        {errorText}
      </span>
    </div>
  );
}
