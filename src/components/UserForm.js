import React from 'react'

export default function UserForm() {

    return (
        <div className='container'>
            <form>
                <label>
                    Name: <input
                    name='user'
                    type='text'
                    />
                </label>

                <label>
                    Email: <input
                    name='email'
                    type='text'
                    />                    
                </label>

                <label>
                    Password: <input
                    name='password'
                    type='text'
                    />
                </label>

                <label>
                    Terms of Service: <input
                    name='terms'
                    type='checkbox'
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}

// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.