import React from "react";
import "../styles/components/ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-banner">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
