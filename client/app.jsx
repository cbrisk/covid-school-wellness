import React, { useEffect, useState } from 'react';
import StudentMain from './pages/student-main';
import Header from './components/header';
import Footer from './components/footer';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Redirect from './components/redirect';


const App = () => {
  const [ user, setUser ] = useState(null);
  const [token, setToken] = useState(null);
  const [ isAuthorizing, setAuthorizing ] = useState(true);
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

  const updateUser = token => {
    window.localStorage.setItem('csw', token);
    setToken(token);
  }

  const signOut = () => {
    window.localStorage.removeItem('csw');
    setToken(null);
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
    }
  }

  if (isAuthorizing) return null;
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
