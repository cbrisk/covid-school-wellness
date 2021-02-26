import React, { useContext } from 'react';
import Message from '../components/message';
import NavBar from '../components/navbar';
import AppContext from '../lib/app-context';

const AdminMain = props => {
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;
  return (
    <main className="main-color">
      <NavBar />
      <Message>Welcome Admin!</Message>
      <div className="d-flex flex-column align-items-center mt-5">
        <button onClick={() => location.hash = `#admin/results?view=coming-today`} className="btn btn-width inverse-color rounded mb-5">View Students - coming today</button>
        <button onClick={() => location.hash = `#admin/results?view=stay-home`} className="btn btn-width inverse-color rounded mb-5">View Students - stay at home</button>
      </div>
    </main>
  );
}

export default AdminMain;
