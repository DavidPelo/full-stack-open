import React from "react";

const Content = ({ parts }) => {
  return (
    <>
    {parts.map(part => {
      return (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )
    })}
    </>
  );
};

export default Content;
