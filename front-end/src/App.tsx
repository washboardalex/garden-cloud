import React from 'react';
import { 
  Route,
  // Redirect, 
  Switch, 
  Redirect
} from 'react-router-dom';
import { AppState } from './redux/root-reducer';
import { createStructuredSelector } from 'reselect';
import { selectIsUserSignedIn } from './redux/user/user.selectors';
import { connect } from 'react-redux';

import GardenPage from './pages/garden/gardenpage.container';
import SignInPage from './pages/signin/signin-page.component';

import './App.css';


interface IReduxStateProps {
  isUserSignedIn: boolean
}


const App : React.FC<IReduxStateProps> = ({ isUserSignedIn }) => (
  <div className="App">
    <Switch>
      <Route 
        exact path='/' 
        render={
          () => isUserSignedIn 
            ? <Redirect to='/home' /> 
            : <SignInPage />
        } 
      />
      <Route path='/home' component={GardenPage} />
    </Switch>
  </div>
);


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
  isUserSignedIn: selectIsUserSignedIn,
});

export default connect(mapStateToProps)(App);
