import React from "react";

const List = ({ countries, onShowCountry }) => {
  return (
    <ul className='list-group'>
      {countries.map((country, idx) => {
        return (
          <li className='list-group-item' key={country.cca2}>
            {country.name.common}
            <button
              id={country.name.common}
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={onShowCountry}
            >
              show
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
