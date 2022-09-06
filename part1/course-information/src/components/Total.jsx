import React from "react";

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((total, part) => total + part.exercises)}</p>
  );
};

export default Total;
