import React from 'react';

const Filter = props => {
  const searchInputHandler = e => {
    props.onSearchValueChange(e.target.value);
  };

  return (
    <div className='form-group'>
      <label htmlFor='search'>Search</label>
      <input
        className='form-control'
        type='text'
        name='search'
        id='search'
        value={props.value}
        onChange={searchInputHandler}
      />
    </div>
  );
};

export default Filter;
