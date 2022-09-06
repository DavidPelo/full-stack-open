import React from "react";

const RandomAnecdote = ({ anecdote, votes }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdote}</p>
      <p>votes: {votes}</p>
    </>
  );
};

export default RandomAnecdote;
