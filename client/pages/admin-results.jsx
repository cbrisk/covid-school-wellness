import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import NavBar from '../components/navbar';
import Message from '../components/message';
import dayjs from 'dayjs';

const AdminResults = props => {
  const { token } = useContext(AppContext);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = props.view === 'coming-today'
      ? `/api/admin/coming-today/date/${dayjs().format('YYYY-MM-DD')}`
      : `/api/admin/stay-home/date/${dayjs().format('YYYY-MM-DD')}`;
    fetch(url, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const msg = props.view === 'coming-today' ? 'Coming Today' : 'Stay Home';
  return (
    <main className="main-color">
      <NavBar />
      {
        isLoading &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border main-color" role="status"></div>
        </div>
      }
      {
        results.length !== 0 && !isLoading &&
        <>
          <Message>{msg}</Message>
          <ul>
            {
              results.map((student, index) => {
                return (
                  <li key={index}>
                    <div className="d-flex justify-content-between p-2">
                      <span className="white">{student.name}</span>
                      <span className="white">{student.date}</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </>
      }
      {
        !results.length &&
        <Message>No students found</Message>
      }
    </main>
  );
};

export default AdminResults;
