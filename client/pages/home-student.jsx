import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import dayjs from 'dayjs';
import NavBar from '../components/navbar'

const HomeStudent = props => {
  const { user, token } = useContext(AppContext);
  const [ symptoms, setSymptoms ] = useState([]);
  const [ status, setStatus ] = useState('');

  useEffect(() => {
    fetch(url, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          setStatus('stayhome');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  const handleChange = event => {
    const { checked, name } = event.target;
    console.log(name);
    const newState = checked
      ? symptoms.concat(name)
      : symptoms.filter(item => item !== name);
    setSymptoms(newState);
  }

  const handleSubmit = event => {

  }

  const today = dayjs().format('YYYY-MM-DD');
  const fourDaysAgo = dayjs().subtract(4, 'day').format('YYYY-MM-DD');

  if (!user) return <Redirect to="sign-in" />;
  return (
    <main className="main-color">
      <NavBar/>
      <div className="symptom-form rounded">
        <form className="d-flex flex-column black pt-3" onSubmit={handleSubmit}>
          <div className="text-center">
            <h4>Wellness Check</h4>
            <h6>Please check off all symptoms that apply</h6>
          </div>
          <div className="form-check py-2 ml-4 black">
            <input className="form-check-input" type="checkbox" name="fever" id="fever" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="fever">Fever over 100°F</label>
          </div>
          <div className="form-check py-2 ml-4 black">
            <input className="form-check-input" type="checkbox" name="cough" id="cough" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="cough">Cough</label>
          </div>
          <div className="form-check py-2 ml-4 black">
            <input className="form-check-input" type="checkbox" name="sorethroat" id="sorethroat" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="sorethroat">Sore Throat</label>
          </div>
          <div className="form-check py-2 ml-4 black">
            <input className="form-check-input" type="checkbox" name="contact" id="contact" onChange={handleChange}></input>
            <label className="form-check-label" htmlFor="contact">Contact with someone who tested positive</label>
          </div>
          <div className="d-flex flex-column align-items-center">
            <h5>When did the symptoms begin?</h5>
            <input type="date" name="symtoms" min={fourDaysAgo} max={today}/>
            <div>
              <button className="py-2 px-4 border-0 text-center rounded main-color m-3" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
  }

export default HomeStudent;
