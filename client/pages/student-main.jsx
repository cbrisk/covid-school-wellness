import React, { useState, useContext, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import dayjs from 'dayjs';
import AppContext from '../lib/app-context';
import stayAtHome from '../lib/stay-at-home';
import Redirect from '../components/redirect';
import NavBar from '../components/navbar';
import Message from '../components/message';

const StudentMain = props => {
  const { user, token } = useContext(AppContext);
  const [ symptoms, setSymptoms ] = useState([]);
  const [ status, setStatus ] = useState('');
  const [ startDate, setStartDate ] = useState(null);
  const [ stayHomeDate, setStayHomeDate, ref] = useStateRef(null);

  useEffect(() => {
    fetch(`/api/student/stay-home/date/${dayjs().format('YYYY-MM-DD')}`, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          setStatus('stay-home');
          setStayHomeDate(data[0].date);
        } else {
          return fetch(`/api/student/coming-today/date/${dayjs().format('YYYY-MM-DD')}`, {
            headers: {
              'X-Access-Token': token
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.length && dayjs().hour() >= 6 && dayjs().hour() <= 16) {
                setStatus('coming-today');
              } else if (dayjs().day() >= parseInt('01', 10) && dayjs().day() <= parseInt('05', 10) && dayjs().hour() >= parseInt('06', 10) && dayjs().hour() <= parseInt('08', 10)) {
                setStatus('get-form');
              } else {
                setStatus('school-day');
              }
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  const handleChange = event => {
    if (event.target.name === 'symptoms') {
      setStartDate(event.target.value);
      return;
    }
    const { checked, name } = event.target;
    const newState = checked
      ? symptoms.concat(name)
      : symptoms.filter(item => item !== name);
    setSymptoms(newState);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (symptoms.length) {
      if (!startDate) {
        window.alert('Date must be entered if you checked off any options!');
        return;
      }
      setStayHomeDate(stayAtHome(symptoms, startDate));
      const body = { date: ref.current };
      fetch('/api/stay-home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        body: JSON.stringify(body)
      })
        .then(() => {
          setStatus('stay-home');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      const body = { date: dayjs().format('YYYY-MM-DD') };
      fetch('/api/coming-today', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        body: JSON.stringify(body)
      })
        .then(() => {
          setStatus('coming-today');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  if (!user) return <Redirect to="sign-in" />;
  return (
    <main className="main-color">
      <NavBar/>
      {
        status === 'coming-today' &&
        <Message>We look forward to seeing you at school!</Message>
      }
      {
        status === 'school-day' &&
        <Message>Please come back here on the next school day between 6AM and 9AM to fill out the wellness form.</Message>
      }
      {
        status === 'stay-home' &&
        <Message>{`We are very sorry. You must stay home from school until ${dayjs(stayHomeDate).format('dddd MM/DD/YYYY')}`}</Message>
      }
      {
        status === 'get-form' &&
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
              <input type="date" name="symptoms" onChange={handleChange} min={dayjs().subtract(4, 'day').format('YYYY-MM-DD')} max={dayjs().format('YYYY-MM-DD')} />
              <div>
                <button className="py-2 px-4 border-0 text-center rounded main-color m-3" type="submit">
                  Submit
              </button>
              </div>
            </div>
          </form>
        </div>
      }
    </main>
  );
  }

export default StudentMain;
