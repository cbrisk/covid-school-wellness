import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

const Footer = () => {
  const { user } = useContext(AppContext);
  const className = user ? 'far fa-comment-dots' : 'far fa-comment-dots invisible';

  return (
    <footer className="d-flex justify-content-center main-color">
      <a className="main-color footer-size" href=""><i className={ className }></i></a>
    </footer>
  );
}

export default Footer;
