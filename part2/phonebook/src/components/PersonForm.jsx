import React from 'react';

const PersonForm = props => {
  const addNewNameHandler = (e) => {
    e.preventDefault();
    props.onFormSubmit();
  };

  const nameInputHandler = e => {
    props.onNameValueChange(e.target.value);
  };

  const numberInputHandler = e => {
    props.onNumberValueChange(e.target.value);
  };

  return (
    <>
      <form onSubmit={addNewNameHandler}>
        <div>
          name: <input value={props.nameValue} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={props.numberValue} onChange={numberInputHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
