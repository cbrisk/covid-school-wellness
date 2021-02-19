import React, { useContext, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import dayjs from 'dayjs';
import NavBar from '../components/navbar'

const initialState = {
  username: '',
  password: ''
};

const reducer = (state, { name, value }) => {
  return { ...state, [name]: value }
}

const HomeStudent = props => {
  const { user, signOut } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   fetch()
  // }, [])

  const handleChange = event => {
    dispatch({
      name: event.target.name,
      value: event.target.value
    })
  }

  const handleSubmit = event => {

  }

  const today = dayjs().format('MMDDYYYY');
  const fourDaysAgo = dayjs().subtract(4, 'day');

  if (!user) return <Redirect to="sign-in" />;
  return (
    <main className="main-color d-flex align-items-center">
      <NavBar/>
      <div className="sign-form rounded">
        <form className="d-flex flex-column align-items-center black pt-3" onSubmit={handleSubmit}>
          <h4>Wellness Check</h4>
          <h6>Please check off all symptoms that apply</h6>
          <div className="form-check py-2 black">
            <input className="form-check-input" type="checkbox" name="fever" id="fever" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="fever">Fever over 100°F</label>
          </div>
          <div className="form-check py-2 black">
            <input className="form-check-input" type="checkbox" name="cough" id="cough" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="cough">Cough</label>
          </div>
          <div className="form-check py-2 black">
            <input className="form-check-input" type="checkbox" name="sorethroat" id="sorethroat" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="sorethroat">Sore Throat</label>
          </div>
          <div className="form-check py-2 black">
            <input className="form-check-input" type="checkbox" name="contact" id="contact" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="contact">Contact with someone who tested positive</label>
          </div>
          <h5>When did the symptoms begin?</h5>
          <input type="date" name="symtoms" min={fourDaysAgo} max={today}/>
          <div>
            <button className="py-2 px-4 border-0 text-center rounded main-color mb-0 mt-2" type="submit">
              Submit
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

export default HomeStudent;
