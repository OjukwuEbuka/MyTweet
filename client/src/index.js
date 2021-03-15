import React from 'react';
import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { TweetsComponent } from './tweets';

const e = React.createElement;
const rootEl = document.getElementById('root');
if(rootEl){
  // const MyApp = e(App, rootEl.dataset)
  // ReactDOM.render(<App />, rootEl);
  ReactDOM.render(e(App, rootEl.dataset), rootEl);
}

const tweetsEl = document.querySelector('#tweetme');

if(tweetsEl){
  ReactDOM.render(<TweetsComponent />, tweetsEl)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
