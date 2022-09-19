import React from "react";

const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>toggle importance</button>
    </li>
  );
};

export default Note;
