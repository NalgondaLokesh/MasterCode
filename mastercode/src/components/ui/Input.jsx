import React from "react";
import "../styles/components/Input.css";

const Input = ({ className = "", ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};

export default Input;
