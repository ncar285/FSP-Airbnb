import React from 'react';
import Splash from "./components/Splash/Splash.jsx"
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import LoadingPage from './components/LoadingSplash/LoadingSplash.jsx';

function App() {
  return (
    <>
      <NavBar/>
      {/* <h1>Hello world!</h1> */}
      <SearchForm/>
      <RegisterForm/>

      <LoadingPage/>
      
      <Splash/>
    </>
  );
}

export default App;
