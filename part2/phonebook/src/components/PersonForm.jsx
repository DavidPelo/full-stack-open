import React from "react";

const PersonForm = props => {
  return (
    <div className='row'>
      <form onSubmit={props.onFormSubmit}>
        <div className='form-group'>
          Name
          <input
            className='form-control'
            value={props.nameValue}
            onChange={props.onNameValueChange}
          />
        </div>
        <div className='form-group'>
          Number
          <input
            className='form-control'
            value={props.numberValue}
            onChange={props.onNumberValueChange}
          />
        </div>
        <div className="mt-2">
          <button type='submit' className='btn btn-primary'>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
