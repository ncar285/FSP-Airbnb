import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Splash from "./components/Splash/Splash.jsx"
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import ShowListing from './components/ShowListing/ShowListing.jsx';
import DeleteReviewModal from './components/DeleteReviewModal/DeleteReviewModal.jsx';
import EditReviewModal from './components/EditReviewModal/EditReviewModal.jsx';
import AccountPage from './components/AccountPage/AccountPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import MapPage from './components/MapPage/MapPage.jsx';

export const SearchContext = React.createContext();

function App() {

  const [searchParams, setSearchParams] = useState({})
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mobileDeviceRegex = /iPhone|iPad|iPod|Android/i;
    if (mobileDeviceRegex.test(navigator.userAgent)) {
      setIsDesktop(false);
    }
  }, []);

  if (!isDesktop) {
    return (
      <div id="non-desktop-message">
        Sorry, this app is only optimized for a desktop right now.
      </div>
    );
  }

  return (

    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <SearchContext.Provider value={{ searchParams, setSearchParams }}> */}
            <NavBar tagsOn={false} searchType={"simple"} barType={"home"}/>
            {/* <SearchForm /> */}
            <RegisterForm />
            <Splash />
            <Footer alwaysthere={true}/>
          
        </Route>
        <Route path="/map">
            <NavBar tagsOn={false} searchType={"simple"} barType={"home"}/>
            <RegisterForm />
            <MapPage/>
        </Route>
        <Route path="/listing/:listingId">
            <NavBar tagsOn={false} searchType={"simple"} barType={"show"}/>
            <RegisterForm />
            <ShowListing/> 
            <Footer/>
        </Route>
        <Route path="/account/">
          <div className="AccountPageWrapper">
            <NavBar tagsOn={false} searchType={"simple"} barType={"show"}/>
            <RegisterForm/>
            <DeleteReviewModal/>
            <AccountPage/>
            <Footer/>
          </div>
        </Route>
       
      </Switch>
  </Router>
  </SearchContext.Provider>

  );
}

export default App;
