import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import React, { useState } from 'react';
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
            <DeleteReviewModal/>
            <EditReviewModal/>
            <Footer/>
        </Route>
        <Route path="/account/">
            <NavBar tagsOn={false} searchType={"simple"} barType={"show"}/>
            <RegisterForm />
            {/* <ShowListing/>  */}
            {/* <DeleteReviewModal/> */}
            <EditReviewModal/>
            <AccountPage/>
            <Footer/>
        </Route>
       
      </Switch>
  </Router>
  </SearchContext.Provider>
  );
}

export default App;
