import React from 'react';
import Message from '../components/message';
import NavBar from '../components/navbar';

const AdminMain = props => {

  return (
    <main className="main-color">
      <NavBar />
      <Message>Welcome Admin!</Message>
      <div>
        <button></button>
        <button></button>
      </div>
    </main>
  );
}

export default AdminMain;
