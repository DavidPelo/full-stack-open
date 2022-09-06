import React from "react";

const StatisticLine = ({ label, value, unit }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>
        {value}
        {unit}
      </td>
    </tr>
  );
};

export default StatisticLine;
