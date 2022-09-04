import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import './App.css'
import GetAllBusinesses from './components/getAllBusinesses/getAllBusinesses';
import GetBusinessDetail from './components/getBusinessDetail/getBusinessDetail';
// import UploadPicture from './components/createNewBusiness/uploadPicture';
import CreateNewBusiness from './components/createNewBusiness/createNewBusiness';
import EditBusiness from './components/editBusiness/editBusiness';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
      <div>
      <NavBar />
      </div>
      <div className='middle-section-container'>
          <Switch>

            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>

            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>

            <Route path='/' exact={true} >
              <GetAllBusinesses />
            </Route>

            <Route path={'/businesses/new'} exact={true}>
              <CreateNewBusiness />
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
        <div>
          <p>for footer</p>
        </div>



    </div>

    </BrowserRouter>
  );
}

export default App;
