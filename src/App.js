import React, {useState, useEffect} from 'react'
import axios from 'axios'
import schema from './validation/formSchema'
import { reach } from 'yup'
import './App.css';
import UserForm from './components/UserForm'

const initialFormValues = { user: '', email: '', password: '', terms: false } // this is so our function knows what data to accept
const initialFormErrors = { user: '', email: '', password: '', terms: false }
const initialDisabled = true

function App() {

  //////////////// STATES ////////////////
  const [users, setUsers] = useState([]) // We will add our friends to this empty array
  const [formValues, setFormValues] = useState(initialFormValues) // letting the form know the structure of the data
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //////////////// HELPERS ////////////////
  // Get's users from API
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data)
        console.log(users)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Add's user to API
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim()
    }
    // POST NEW FRIEND USING HELPER
    postNewUser(newFriend)
  }

  const inputChange = (name, value) => {
    // RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({ ...formValues, [name]: value })
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  return (
    <div className='container'>
      <header><h1>User App</h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        // users.map(friend => {
        //   return (
        //     <Friend key={friend.id} details={friend} />
        //   )
        // })
      }
    </div>
  )
}

export default App;
