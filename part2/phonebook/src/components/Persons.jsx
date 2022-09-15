import React from 'react';

const Persons = ({contacts}) => {
  return (
    <ul className="list-group">
      {contacts.map(contact => (
        <li className="list-group-item" key={contact.name}>
          {contact.name} | {contact.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
