import React from 'react';
import { 
  Route,
  // Redirect, 
  Switch } from 'react-router-dom'; 

import GardenPage from './pages/garden/gardenpage.component';
import SignInPage from './pages/signin/signin-page.component';

import './App.css';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={SignInPage} />
        <Route path='/home' component={GardenPage} />
      </Switch>
    </div>
  );
}

export default App;
