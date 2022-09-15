import React from "react";

const Search = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='search'>Find Countries</label>
      <input
        type='text'
        className='form-control'
        name='search'
        id='search'
        onChange={props.onSearchInput}
        value={props.searchValue}
      />
      {props.resultsNum === 0 && <p className="form-text">There are no countries with the specified name</p>}
      {props.resultsNum > 10 && <p className="form-text">Please be more specific with your search</p>}
    </div>
  );
};

export default Search;
