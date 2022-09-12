import {useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState ([
    {name: 'Arto Hellas', number: '040-123456', id: 1},
    {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    {name: 'Dan Abramov', number: '12-43-234345', id: 3},
    {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
  ]);
  const [newName, setNewName] = useState ('');
  const [newNumber, setNewNumber] = useState ('');
  const [searchValue, setSearchValue] = useState ('');

  const addNewName = () => {
    if (persons.some (person => person.name === newName)) {
      alert (`${newName} is already added to the phonebook`);
      return;
    }

    setPersons ([...persons, {name: newName, number: newNumber}]);
    setNewName ('');
    setNewNumber ('');
  };

  const handleNameInput = nameInput => {
    setNewName (nameInput);
  };

  const handleNumberInput = numberInput => {
    setNewNumber (numberInput);
  };

  const handleSearchInput = value => {
    setSearchValue (value);
  };

  const filterContactList = () => {
    return persons
      .filter (person =>
        person.name.toLowerCase ().includes (searchValue.toLowerCase ())
      )
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchValueChange={handleSearchInput} value={searchValue} />
      <h2>Add a New Contact</h2>
      <PersonForm
        onFormSubmit={addNewName}
        onNameValueChange={handleNameInput}
        onNumberValueChange={handleNumberInput}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons contacts={filterContactList()}/>
    </div>
  );
};

export default App;
