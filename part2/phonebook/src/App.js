import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import contactsService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState ([]);
  const [newName, setNewName] = useState ('');
  const [newNumber, setNewNumber] = useState ('');
  const [searchValue, setSearchValue] = useState ('');
  const [notification, setNotification] = useState (null);

  const fetchPersons = async () => {
    const contacts = await contactsService.getAll ();
    setPersons (contacts);
  };

  useEffect (() => {
    fetchPersons ();
  }, []);

  const addNewName = e => {
    e.preventDefault ();

    if (
      persons.some (
        person => person.name.toLowerCase () === newName.toLowerCase ()
      )
    ) {
      const personToUpdate = persons.find (
        person => person.name.toLowerCase () === newName.toLowerCase ()
      );

      if (
        window.confirm (
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updateExistingContact (personToUpdate);
      }
      return;
    }

    const newContact = {name: newName, number: newNumber};
    contactsService.create (newContact).then (createdContact => {
      createNotification (
        `Contact added for ${createdContact.name}`,
        'success'
      );
      setPersons ([...persons, createdContact]);
      setNewName ('');
      setNewNumber ('');
    });
  };

  const updateExistingContact = contactToUpdate => {
    const updatedContact = {...contactToUpdate, number: newNumber};

    console.log (updatedContact);
    contactsService
      .update (contactToUpdate.id, updatedContact)
      .then (changedContact => {
        setPersons (
          persons.map (
            person =>
              person.id !== changedContact.id ? person : changedContact
          )
        );

        createNotification (
          `Number updated for ${changedContact.name}`,
          'success'
        );
        setNewName ('');
        setNewNumber ('');
      })
      .catch (error => {
        console.log (error);
        createNotification (
          'Contact has already been deleted from the server',
          'danger'
        );
        setPersons (
          persons.filter (person => person.id !== contactToUpdate.id)
        );
        setNewName ('');
        setNewNumber ('');
      });
  };

  const deleteHandler = id => {
    contactsService
      .deleteContact (id)
      .then (deletedContact => {
        createNotification (
          `Contact deleted for ${persons.find (person => person.id === id).name}`,
          'success'
        );
        setPersons (persons.filter (person => person.id !== id));
      })
      .catch (error => {
        console.log (error);
        createNotification (
          'Contact has already been deleted from the server',
          'danger'
        );
        setPersons (persons.filter (person => person.id !== id));
      });
  };

  const createNotification = (message, type) => {
    setNotification ({
      message: message,
      type: type,
    });
    setTimeout (() => {
      setNotification (null);
    }, 3000);
  };

  const handleNameInput = e => {
    setNewName (e.target.value);
  };

  const handleNumberInput = e => {
    setNewNumber (e.target.value);
  };

  const handleSearchInput = value => {
    setSearchValue (value);
  };

  const contacts = searchValue
    ? persons.filter (person =>
        person.name.toLowerCase ().includes (searchValue.toLowerCase ())
      )
    : persons;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-xs-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
          <h2>Phonebook</h2>
          <Filter onSearchValueChange={handleSearchInput} value={searchValue} />
          <h2 className="mt-2">Add a New Contact</h2>
          <PersonForm
            onFormSubmit={addNewName}
            onNameValueChange={handleNameInput}
            onNumberValueChange={handleNumberInput}
            nameValue={newName}
            numberValue={newNumber}
          />
          {notification && <Notification notification={notification} />}
          <h2 className="mt-2">Numbers</h2>
          <Persons contacts={contacts} onDeleteUser={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default App;
