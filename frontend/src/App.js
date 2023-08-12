import React from 'react';
import Splash from "./components/Splash/Splash.jsx"
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <>
      <NavBar/>
      {/* <h1>Hello world!</h1> */}
      <RegisterForm/>
      <Splash/>
    </>
  );
}

export default App;
