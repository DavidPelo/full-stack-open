import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = () => {
    return (good - bad) / (good + neutral + bad);
  };

  const calculatePositiveFeedback = () => {
    return (good / (good + neutral + bad)) * 100;
  };

  return (
    <>
      <h1>Statistics</h1>
      <table className="table">
        <tbody>
          <StatisticLine label='good' value={good} />
          <StatisticLine label='neutral' value={neutral} />
          <StatisticLine label='bad' value={bad} />
          <StatisticLine
            label='average'
            value={calculateAverage()}
          />
          <StatisticLine
            label='positive'
            value={calculatePositiveFeedback()}
            unit='%'
          />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
