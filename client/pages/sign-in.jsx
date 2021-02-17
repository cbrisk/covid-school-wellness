import React, { useState, useReducer } from 'react';
import Redirect from '../components/redirect';

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return { username: action.payload };
    case 'password':
      return { password: action.payload };
    default:
      return state;
  }
}

const SignIn = () => {
  const initialState = {
    username: '',
    password: ''
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ error, setError ] = useState('');
  const { user, signOut, updateUser } = useContext(AppContext);


  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          event.target.reset();
          return;
        }
        const { token } = data;
        updateUser(token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <main className="main-color">
      <div className="sign-form">
        <form className="d-flex flex-column align-items-center pt-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={(event) => {
              dispatch({
                type: 'username',
                payload: event.target.value
              })
            }}
            value={state.username} />
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(event) => {
              dispatch({
                type: 'password',
                payload: event.target.value
              })
            }}
            value={state.password} />
        </form>
      </div>
    <main/>
  );
}

export default SignIn
