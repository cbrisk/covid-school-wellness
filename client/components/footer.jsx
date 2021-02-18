import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

const Footer = props => {
  const { user } = useContext(AppContext);
  const className = user ? 'main-color footer-size' : 'main-color hidden footer-size';

  return (
    <footer className="d-flex justify-content-center main-color">
      <a className={className} href=""><i className="far fa-comment-dots"></i></a>
    </footer>
  );
}

export default Footer;
