import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { loadUser } from './actions/auth';

import Login from './components/Login';
import Navbar from './components/Navbar';
import { store } from './store';
import {TweetsComponent} from './tweets';

function App(){

  useEffect(() => {
    store.dispatch(loadUser());
  })
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
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
