import React from "react";

const PopularAnecdote = ({ anecdote, votes }) => {
  const text =
    votes !== 0
      ? `${anecdote} has ${votes} votes`
      : "None of the anecdotes have any votes...";

  return (
    <>
      <hr />
      <h2>Anecdote with most votes</h2>
      <p>{text}</p>
    </>
  );
};

export default PopularAnecdote;
