import React, { useEffect, useState } from 'react';
import Home from './pages/home';
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
  const [ isAuthorizing, setAuthorizing ] = useState(true);
  const [ route, setRoute ] = useState(parseRoute(window.location.hash))

  useEffect(() => {
    const localStorage = window.localStorage.getItem('csw');
    const token = localStorage || null;
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setAuthorizing(false);
    window.addEventListener('hashchange', event => {
      setRoute(parseRoute(window.location.hash))
    });
  }, []);

  const updateUser = token => {
    window.localStorage.setItem('csw', token);
    setUser(decodeToken(token));
  }

  const signOut = () => {
    window.localStorage.removeItem('csw');
    setUser(null);
  }

  const renderPage = () => {
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'sign-up') {
      return <SignUp />;
    } else if (route.path === 'sign-in') {
      return <SignIn />;
    } else if (!user) {
      return <Redirect to="sign-in" />;
    }
  }

  if (isAuthorizing) return null;
  const type = user ? user.type : null;
  const contextValue = { signOut, updateUser, user, type };
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
