import React, {useState, useEffect} from 'react'
import axios from 'axios'
import schema from './validation/formSchema'
import { reach } from 'yup'
import './App.css';
import UserForm from './components/UserForm'

const initialFormValues = { user: '', email: '', password: '', terms: false }
const initialFormErrors = { user: '', email: '', password: ''}
const initialDisabled = true

function App() {

  //////////////// STATES //////////////////////////////////////////////
  const [users, setUsers] = useState([])                              //
  const [formValues, setFormValues] = useState(initialFormValues)     //
  const [formErrors, setFormErrors] = useState(initialFormErrors)     //
  const [disabled, setDisabled] = useState(initialDisabled) ////////////

  ////////////// HELPERS //////////////////////////////////////////////////////////////////////
                                                                                      //

  // Add's user to API                                                                       //
  const postNewUser = newUser => {                                                           //
    axios.post('https://reqres.in/api/users', newUser)                                       //
      .then(res => {                                                                         //
        setUsers([res.data, ...users])                                                       //
      })                                                                                     //
      .catch(err => {                                                                        //
        console.log(err)                                                                     //
      })                                                                                     //
      .finally(() => {                                                                       //
        setFormValues(initialFormValues)                                                     //
      })                                                                                     //
  }                                                                                          //

  const validate = (name, value) => {                                                        //
    reach(schema, name)                                                                      //
      .validate(value)                                                                       //
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))                              //
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))                  //
  } ///////////////////////////////////////////////////////////////////////////////////////////

  //////////////// EVENT HANDLERS ///////////////////////////////////////
  const formSubmit = () => {                                           //
    const newUser = {                                                  //
      username: formValues.username,                                   //
      email: formValues.email,                                         //
      password: formValues.password,                                   //
      terms: ['terms'].filter(term => formValues[term])                //
    }                                                                  //
    // POST NEW FRIEND USING HELPER                                    //
    postNewUser(newUser)                                               //
  }                                                                    //

  const inputChange = (name, value) => {                               //
    // RUN VALIDATION WITH YUP                                         //
    validate(name, value)                                              //
    setFormValues({ ...formValues, [name]: value })                    //
  } /////////////////////////////////////////////////////////////////////


  //////////////// SIDE EFFECTS /////////////////////////////////////////////////////

  useEffect(() => {                                                                //
      // Get's users from API                                                      //
    const getUsers = () => {                                                       //
      axios                                                                        //
        .get('https://reqres.in/api/users')                                        //
        .then(res => {                                                             //
        setUsers(res.data)                                                         //
      })                                                                           //
      .catch(err => {                                                              //
        console.log(err)                                                           //
      })                                                                           //
  }                                                                                //
    getUsers()                                                                     //
  }, [])                                                                           //

  useEffect(() => {                                                                //
    // ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES             //
    schema.isValid(formValues).then(valid => setDisabled(!valid))                  //
  }, [formValues]) //////////////////////////////////////////////////////////////////


  return (
    <div className='container'>
      
      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
        {/* {users.map(user => {
          return (<p>{user.username}</p>)
        })} */}
        <p>{users.username}</p>
    </div>
  )
}

export default App;
