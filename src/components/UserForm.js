import React from 'react'

export default function UserForm(props) {
    const { values, submit, change, disabled, errors } = props

    const onChange = event => {
        const {value, name, type, checked} = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    const onSubmit = event => {
        event.preventDefault()
        submit()
    }
    
    return (
        <form className='form container' onSubmit={onSubmit}>
          <div className='form-group submit'>
            <h2>This is a Header Boi</h2>
    
            {/* DISABLE THE BUTTON */}
            <button disabled={disabled}>submit</button>
    
            <div className='errors'>
              {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
              <div>Name errors: {errors.username}</div>
              <div>Password errors: {errors.password}</div>
              <div>Email errors: {errors.email}</div>
              <div>Terms errors: {errors.terms}</div>
            </div>
          </div>
    
          <div className='form-group inputs'>
            <h4>General information</h4>
    
            {/* ////////// TEXT INPUTS ////////// */}
            <label>Username: 
              <input
                value={values.username}
                onChange={onChange}
                placeholder = 'username'
                name='username'
                type='text'
              />
            </label>
    
            <label>Password: 
              <input
                value={values.password}
                onChange={onChange}
                name='password'
                placeholder = 'password'
                type='text'
              />
            </label>

            <label>Email: 
              <input
                value={values.email}
                onChange={onChange}
                name='email'
                placeholder = 'email'
                type='text'
              />
            </label>
    
            {/* ////////// CHECKBOXES ////////// */}
            <label>Terms of Service: 
              <input
                type='checkbox'
                name='terms'
                onChange={onChange}
                checked={values.terms}
              />
            </label>
    
          </div>
        </form>
      )
}