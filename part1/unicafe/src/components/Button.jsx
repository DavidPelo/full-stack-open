import React from "react";

const Button = ({ type, action, label }) => {
  return (
    <button className={`btn ${type}`} onClick={action}>
      {label}
    </button>
  );
};

export default Button;