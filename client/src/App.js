import React from 'react';


import Navbar from './components/Navbar';
import {TweetsList} from './tweets';

function App(){
  
  return (
    <>
      <Navbar />
        <div className="container">
          {
            <TweetsList />
          }
        </div>
    </>
  )
}


export default App;
