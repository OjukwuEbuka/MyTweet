import React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import { store } from './store';
import {TweetsComponent} from './tweets';

function App(){
  
  return (
    <Provider store={store}>
      <Navbar />
      <BrowserRouter>
        <div className="container">
          <Switch>
              <Route exact path='/' component={TweetsComponent} />
              <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
