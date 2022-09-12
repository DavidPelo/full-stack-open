import React from 'react';

const Persons = ({contacts}) => {
  return (
    <>
      {contacts.map(contact => (
        <p key={contact.name}>
          {contact.name} | {contact.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
