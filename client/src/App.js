import React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import { store } from './store';
import {TweetsComponent} from './tweets';

function App(){
  
  return (
    <Provider store={store}>
      <Navbar />
      <BrowserRouter>
        <Switch>
            <div className="container">
              <Route to='/' component={TweetsComponent} />
            </div>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
