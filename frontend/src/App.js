// import "./src/Scrollbar.css"
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import React from 'react';
import Splash from "./components/Splash/Splash.jsx"
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
// import LoadingPage from './components/LoadingSplash/LoadingSplash.jsx';
import ShowListing from './components/ShowListing/ShowListing.jsx';

function App() {
  return (
    <Router>
    <>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact>
            <NavBar tagsOn={false} searchType={"full"}/>
            <SearchForm />
            <RegisterForm />
            <Splash />
        </Route>
        <Route path="/listing/:listingId">
            <NavBar tagsOn={false} searchType={"full"}/>
            <ShowListing/> 
        </Route>
       
      </Switch>
    </>
  </Router>
  );
}

export default App;
