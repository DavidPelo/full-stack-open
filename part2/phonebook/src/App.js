import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState ([]);
  const [newName, setNewName] = useState ('');
  const [newNumber, setNewNumber] = useState ('');
  const [searchValue, setSearchValue] = useState ('');

  const fetchPersons = async () => {
    const response = await axios.get('http://localhost:3001/persons');
    setPersons(response.data);
  }

  useEffect(() => {
    fetchPersons()
  }, [])
  
  const addNewName = e => {
    e.preventDefault ();

    if (persons.some (person => person.name === newName)) {
      alert (`${newName} is already added to the phonebook`);
      return;
    }

    setPersons ([...persons, {name: newName, number: newNumber}]);
    setNewName ('');
    setNewNumber ('');
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
          <h2 className="mt-2">Numbers</h2>
          <Persons contacts={contacts} />
        </div>
      </div>
    </div>
  );
};

export default App;
