import React, {useContext} from 'react';
import AppContext from '../lib/app-context';

const NavBar = () => {
  const { signOut, user } = useContext(AppContext);
  return (
    <div className="d-flex justify-content-between p-3">
      <a href="#"><i className="fas fa-home home-icon main-color"></i></a>
      <i className="fas fa-sign-out-alt home-icon main-color" onClick={signOut}></i>
    </div>
  );
}

export default NavBar;
