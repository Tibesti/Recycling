import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Home';
import Contact from './Contact';
import About from './About';

import Login from './Admin/Login';
import Dashboard from './Admin/Dashboard';
import AdminHome from './Admin/Home';
import AdminAbout from './Admin/About';
import AdminFooter from './Admin/Footer';

import './App.css';


class App extends React.Component {
  render(){
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />

            {/**ADMIN SIDE */}
            <Route path="/admin/login" exact component={Login} />
            <Route path="/admin" exact component={Dashboard} />
            <Route path="/admin/home" exact component={AdminHome} />
            <Route path="/admin/about" exact component={AdminAbout} />
            <Route path="/admin/footer" exact component={AdminFooter} />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;