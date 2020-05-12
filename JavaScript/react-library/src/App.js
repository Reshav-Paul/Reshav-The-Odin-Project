import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import About from './pages/About';

import './assets/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/catalog' exact >
            <Catalog />
          </Route>
          <Route path='/about' exact>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
