import React from 'react';
import Home from './pages/home/home';
import './index.css';
import SignUp from './pages/signup/signup';
import Login from './pages/login/login';
import {Toaster} from 'react-hot-toast';
import {Navigate,Routes,Route} from 'react-router-dom';
import {useAuthContext} from './context/AuthContext';
const App = () => {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser?<Home/>: <Navigate to={"/login"}/>}> </Route>
        <Route path='/login' element={authUser?<Navigate to='/'  />:<Login/>}> </Route>
        <Route path='/signup' element={authUser?<Navigate to='/'  />:<SignUp/>} ></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
