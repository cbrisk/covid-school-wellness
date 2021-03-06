import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import StudentMain from './pages/student-main';
import AdminMain from './pages/admin-main';
import Header from './components/header';
import Footer from './components/footer';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Redirect from './components/redirect';
import AdminResults from './pages/admin-results';


const App = () => {
  const [ user, setUser ] = useState(null);
  const [token, setToken] = useState(null);
  const [ isAuthorizing, setAuthorizing ] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [ route, setRoute ] = useState(parseRoute(window.location.hash))

  useEffect(() => {
    const localStorage = window.localStorage.getItem('csw');
    setToken(localStorage || null);
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setAuthorizing(false);
    window.addEventListener('hashchange', event => {
      setRoute(parseRoute(window.location.hash));
    });
  }, [token]);

  useEffect(() => {
    setModalShow(true);
  }, [])

  const updateUser = token => {
    window.localStorage.setItem('csw', token);
    setToken(token);
  }

  const signOut = () => {
    window.localStorage.removeItem('csw');
    setToken(null);
  }

  const handleClose = () => {
    setModalShow(false);
  }

  const renderPage = () => {
    if (route.path === 'sign-up') {
      return <SignUp />;
    } else if (route.path === 'sign-in') {
      return <SignIn />;
    } else if (!user) {
      return <Redirect to="sign-in" />;
    } else if (route.path === '' && user.role === 'student') {
      return <Redirect to="student" />;
    } else if (route.path === 'student') {
      return <StudentMain />;
    } else if (route.path === '' && user.role === 'admin') {
      return <Redirect to="admin" />;
    } else if (route.path === 'admin') {
      return <AdminMain />;
    } else if (route.path === 'admin/results') {
      const view = route.params.get('view');
      return <AdminResults view={view}/>;
    }
  }

  if (isAuthorizing) return null;
  else if (modalShow) {
    return (
      <Modal centered show={modalShow} onHide={handleClose} className="main-color">
        <Modal.Header closeButton>
          <Modal.Title className="black">
            Please note:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="black">
          <p>
            The functionality of this app varies based on the day of the week as well
            as the time of day, so you may not get the full experience when trying it out. <br /><br />
            This app is seperately designed for students and admins. You can create your own accounts or use demo accounts: <br/>
            username "demo-student" password "testing" <br/>
            username "demo-admin" password "testing"
          </p>
        </Modal.Body>
      </Modal>
    );
  }
  const contextValue = { signOut, updateUser, user, token };
  return (
    <AppContext.Provider value={contextValue}>
      <div className="custom-container">
        <Header />
        { renderPage() }
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
