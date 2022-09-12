import React from 'react';

const Filter = props => {
  const searchInputHandler = e => {
    props.onSearchValueChange(e.target.value);
  };

  return (
    <>
      <label htmlFor='search'>search: </label>
      <input
        type='text'
        name='search'
        id='search'
        value={props.value}
        onChange={searchInputHandler}
      />
    </>
  );
};

export default Filter;
