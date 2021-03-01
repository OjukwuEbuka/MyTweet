import React, { useState, useEffect } from 'react';
import {loadTweets} from '../lookup'

export function TweetsList(){
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
    tweets.map(tweet => (
      <Tweet key={tweet.id} tweet={tweet} className="my-5 py-5 col-md-6 mx-auto border bg-white text-center" />
    ))
  )
}

export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : "col-10 mx-auto col-md-6";
    
    return (
      <div className={className}>
        <p>{tweet.id} - {tweet.content}</p>
        <ActionBtn tweet={tweet} action={{type: "like", display: "Likes"}} />
        <ActionBtn tweet={tweet} action={{type: "unlike", display: "Unlike"}} />
        <ActionBtn tweet={tweet} action={{type: "retweet", display: "Retweet"}} />
      </div>
    )
  }
  
export function ActionBtn(props){
    const {tweet, action} = props;
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    
    const className = props.className ? props.className : "btn btn-primary";
    const actionDisplay = action.display ? action.display : 'Action';
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay;

    const handleClick = (e) => {
        e.preventDefault()
        if(action.type === 'like'){
            if(userLike ){
                setUserLike(false)
                setLikes(likes - 1)
            } else {
                setUserLike(true)
                setLikes(likes + 1)
            }
        }
    }
    return (
      action.type === 'like' ?
      <button className={className} id="" onClick={handleClick}>
        {display}
      </button>
      :
      null
    )
  }

  
function handleTweetActionBtn(tweet_id, currentCount, action){
    // const csrftoken = getCookie('csrftoken');
    const url = '/api/tweets/action';
    const method = 'POST';
    const data = JSON.stringify({
        id: tweet_id, 
        action: action
    });
  
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    // xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.onload = function(){
        if(xhr.status === 200){
            // loadTweets(()=>{})
        }
    }
    xhr.send(data);
    return
  }