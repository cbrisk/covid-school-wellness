import React, { useState, useReducer, useContext } from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const initialState = {
  name: '',
  username: '',
  password: '',
  role: ''
};

const reducer = (state, {name, value}) => {
  return { ...state, [name]: value}
}

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const { user, updateUser } = useContext(AppContext);

  const handleChange = event => {
    dispatch({
      name: event.target.name,
      value: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/sign-up', {
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

  if (user) return <Redirect to="" />;
  return (
    <main className="main-color d-flex align-items-center">
      <div className="sign-form rounded">
        <form className="d-flex flex-column align-items-center black pt-3" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <div className="mb-3 mt-2">
            <label htmlFor="name" className="form-label black">Full Name</label>
            <input
              className="black form-control"
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
              value={state.name} />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label black">Username</label>
            <input
              className="black form-control"
              type="text"
              name="username"
              id="username"
              required
              onChange={ handleChange }
              value={state.username} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label black">Password</label>
            <input
              className="black form-control"
              type="password"
              name="password"
              id="password"
              required
              onChange={ handleChange }
              value={state.password} />
          </div>
          <div className="form-check py-2 black">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="admin"
              value="admin"
              checked={state.role === "admin"}
              onChange={handleChange} />
            <label className="form-check-label pr-5" htmlFor="admin">Admin</label>
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="student"
              value="student"
              checked={state.role === "student"}
              onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="student">Student</label>
          </div>
          <div>
            <button className="py-2 px-4 border-0 text-center rounded main-color my-2" type="submit">
              Sign Up
            </button>
          </div>
          <div>
            <p className="text-danger my-4">{error}</p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
