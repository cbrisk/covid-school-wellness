import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/home';

const App = () => {

  return <Home />;

  const renderPage = () => {
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  }

  if (this.state.isAuthorizing) return null;
  return (
    <div className="custom-container">
      <Header />
      { this.renderPage()}
      <Footer token={this.state.token} />
    </div>
  );
}

export default App
