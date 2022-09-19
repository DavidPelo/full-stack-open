import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactsService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState ([]);
  const [newName, setNewName] = useState ('');
  const [newNumber, setNewNumber] = useState ('');
  const [searchValue, setSearchValue] = useState ('');

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
        setNewName ('');
        setNewNumber ('');
      });
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

  const deleteHandler = id => {
    contactsService
      .deleteContact (id)
      .then (deletedContact => {
        setPersons (persons.filter (person => person.id !== id));
      })
      .catch (error => {
        alert (`This contact was already deleted from server`);
        setPersons (persons.filter (person => person.id !== id));
      });
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
          <h2 className="mt-2">Numbers</h2>
          <Persons contacts={contacts} onDeleteUser={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default App;
