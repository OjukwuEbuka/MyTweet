import React, { useState, useEffect } from 'react';


function loadTweets(callBack){    
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = "http://127.0.0.1:8001/api/tweets/";
  const responseType = "json";

  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function() {
    callBack(xhr.status, xhr.response)
  }
  xhr.onerror = function(e){
    console.log(e)
    callBack({"message":"An error occurred!"}, 400)
  }
  xhr.send();
}

function App(){
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const myCallBack = (stat, res) => {
      if(stat === 200){
        setTweets(res);        
      } else {

      }
    }
    loadTweets(myCallBack);
  }, [])


  return (
    <div>
      {
        tweets.map(tweet => (
          <li key={tweet.id}>{tweet.content}</li>
        ))
      }
    </div>
  )
}


export default App;
