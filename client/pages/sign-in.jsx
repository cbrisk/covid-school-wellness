import React, { useState, useReducer, useContext } from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const initialState = {
  username: '',
  password: ''
};

const reducer = (state, { name, value }) => {
  return { ...state, [name]: value }
}

const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ error, setError ] = useState('');
  const { user, updateUser } = useContext(AppContext);

  const handleChange = event => {
    dispatch({
      name: event.target.name,
      value: event.target.value
    })
  }

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

  if (user && user.role === 'student') return <Redirect to="student" />;
  if (user && user.role === 'admin') return <Redirect to="admin" />
  return (
    <main className="main-color d-flex align-items-center">
      <div className="sign-form rounded">
        <form className="d-flex flex-column align-items-center black pt-3" onSubmit={handleSubmit}>
          <h4>Sign In</h4>
          <div className="mb-3 mt-2">
            <label htmlFor="username" className="form-label black">Username</label>
            <input
              className="black form-control"
              type="text"
              name="username"
              id="username"
              required
              onChange={handleChange}
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
              onChange={handleChange}
              value={state.password} />
          </div>
          <div>
            <button className="py-2 px-4 border-0 text-center rounded main-color mb-0 mt-2" type="submit">
              Sign In
            </button>
          </div>
          <div>
            <p className="text-danger my-2">{error}</p>
          </div>
          <div className="pb-4 text-center">
            <p className="mb-0 black">Don&apos;t have an account?</p>
            <a href="#sign-up" className="text-decoration-none text-primary">Sign Up</a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignIn;
