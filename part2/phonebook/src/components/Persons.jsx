import React from "react";

const Persons = ({ contacts, onDeleteUser }) => {
  function deleteUser(name, id) {
    if (!window.confirm(`Delete ${name}?`)) return;
    onDeleteUser(id);
  }
  return (
    <ul className='list-group'>
      {contacts.map(contact => (
        <li className='list-group-item' key={contact.id}>
          {contact.name} | {contact.number}
          <button
            className='btn btn-danger btn-sm'
            onClick={() => deleteUser(contact.name, contact.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
