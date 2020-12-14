import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Home';
import Products from './Products';

import './App.css';


class App extends React.Component {
  render(){
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
