import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import Search from './components/Search';
import List from './components/List';
import Country from './components/Country';

function App () {
  const [countryData, setCountryData] = useState ([]);
  const [searchBy, setSearchBy] = useState ('');

  const fetchCountries = async () => {
    const response = await axios.get ('https://restcountries.com/v3.1/all');
    setCountryData (response.data);
  };

  useEffect (() => {
    fetchCountries ();
  }, []);

  const handleSearchInput = e => {
    setSearchBy (e.target.value);
  };

  const handleShowCountry = e => {
    setSearchBy (e.target.id);
  };

  const countries = searchBy
    ? countryData.filter (country =>
        country.name.common.toLowerCase ().includes (searchBy.toLowerCase ())
      )
    : countryData;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-xs-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
          <Search
            onSearchInput={handleSearchInput}
            searchValue={searchBy}
            resultsNum={countries.length}
          />
          <div className="mt-2">
            {countries.length === 1 && <Country country={countries[0]} />}
            {countries.length <= 10 &&
              countries.length > 1 &&
              <List countries={countries} onShowCountry={handleShowCountry} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
