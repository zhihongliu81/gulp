import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import './App.css'
import GetAllBusinesses from './components/getAllBusinesses/getAllBusinesses';
import GetBusinessDetail from './components/getBusinessDetail/getBusinessDetail';
// import UploadPicture from './components/createNewBusiness/uploadPicture';
import CreateNewBusiness from './components/createNewBusiness/createNewBusiness';
import EditBusiness from './components/editBusiness/editBusiness';
import SearchResults from './components/searchResults/searchResults';
import GetUserProfile from './components/userProfile/userProfile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <div className='app-main-container'>

      <NavBar />

      <div className='middle-section-container'>
          <Switch>

            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>

            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>

            <Route path={'/user/reviews'} exact={true}>
              <GetUserProfile />
            </Route>

            <Route path='/' exact={true} >
              <GetAllBusinesses />
            </Route>

            <Route path={'/businesses/new'} exact={true}>
              <CreateNewBusiness />
            </Route>

            <Route path={'/businesses/searchresults'} exact={true}>
              <SearchResults />
            </Route>

            <Route path={`/businesses/:businessId`} exact={true}>
              <GetBusinessDetail />
            </Route>

            <Route path={`/businesses/:businessId/edit`} exact={true} >
              <EditBusiness />
            </Route>

            <Route path={'/images'} exact={true}>
              <h2>Image Loaded successfully!</h2>
            </Route>



            <Route>
              <h1>404: Page not found</h1>
            </Route>
          </Switch>
        </div>
        {!user && <div className='app-footer-container'>
          <a href={'https://github.com/zhihongliu81/gulp'} rel="noreferrer" target="_blank">GitHub Repository | gulp</a>
          <a href='https://www.linkedin.com/in/zhihong-liu-915a08114/' rel="noreferrer" target="_blank">LinkedIn</a>
          <p>AWS</p>
          <p>Python</p>
          <p>React</p>
          <p>Redux</p>
          <p>SQLAlchemy</p>
          <p>Flask</p>
          <p>PostgreSQL</p>
          <p>Docker</p>
        </div>}



    </div>

    </BrowserRouter>
  );
}

export default App;
