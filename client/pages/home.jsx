import React, { useContext, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

const Home = props => {
  const { user, type, signOut } = useContext(AppContext);

  // useEffect(() => {
  //   fetch()
  // }, [])





  if (!user) return <Redirect to="sign-in" />;
  return null;
//   return (
//     <div>
//       {type === 'student' &&

//       }
//       {type === 'admin' &&
//         <>
//           <a href="#sign-in" className="btn btn-primary">
//             Sign In
//               </a>
//           <a href="#sign-up" className="btn btn-dark">
//             Sign Up
//               </a>
//         </>
//       }
//     </div>
//   );
  }

export default Home;
