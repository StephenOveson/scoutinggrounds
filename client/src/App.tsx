import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  RecoilRoot,
} from 'recoil';
import './App.css';
import { Login } from './pages/Login'
import { PlayerDashboard } from './pages/PlayerDashboard';
import { SignUp } from './pages/SignUp';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <PlayerDashboard />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
