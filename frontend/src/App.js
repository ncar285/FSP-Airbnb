import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import React from 'react';
import Splash from "./components/Splash/Splash.jsx"
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import ShowListing from './components/ShowListing/ShowListing.jsx';
import DeleteReviewModal from './components/DeleteReviewModal/DeleteReviewModal.jsx';
import EditReviewModal from './components/EditReviewModal/EditReviewModal.jsx';
import AccountPage from './components/AccountPage/AccountPage.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
            <NavBar tagsOn={false} searchType={"simple"} barType={"home"}/>
            {/* <SearchForm /> */}
            <RegisterForm />
            <Splash />
            <Footer/>
        </Route>
        <Route path="/listing/:listingId">
            <NavBar tagsOn={false} searchType={"simple"} barType={"show"}/>
            <RegisterForm />
            <ShowListing/> 
            <DeleteReviewModal/>
            <EditReviewModal/>
            <Footer type="large"/>
        </Route>
        <Route path="/account/">
            <NavBar tagsOn={false} searchType={"simple"} barType={"show"}/>
            <RegisterForm />
            {/* <ShowListing/>  */}
            {/* <DeleteReviewModal/> */}
            {/* <EditReviewModal/> */}
            <AccountPage/>
            <Footer type="large"/>
        </Route>
       
      </Switch>
  </Router>
  );
}

export default App;
