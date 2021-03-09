import React, { useState, useEffect } from 'react';
import {apiTweetAction, apiTweetCreate, apiTweetList} from './lookup';

export function TweetsComponent(props){
  const [newTweets, setNewTweets] = useState([]);

  const textAreaRef = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVal = textAreaRef.current.value;
    let tempNewTweets = [...newTweets];

    apiTweetCreate(newVal, (stat, res) => {
      if(stat === 201){
        console.log(res)
        // tempNewTweets = [res, ...tempNewTweets];
        setNewTweets([res, ...tempNewTweets]);
      } else {
        alert("An error occurred!")
      }
    })
    console.log(newTweets)
    textAreaRef.current.value = '';
  }

  return (
    <div className={props.className}>
      <div className='col-12 mb-3 text-center'>
        <form onSubmit={handleSubmit}>
          <textarea ref={textAreaRef} className="form-control" name="tweet" required={true}></textarea>

          <button type='submit' className='btn btn-primary my-3'>Tweet</button>
        </form>
      </div>
      <TweetsList newTweets={newTweets} />
    </div>
  )
}

export function TweetsList(props){
  const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
  const [tweets, setTweets] = useState([]);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);

  useEffect(() => {
    let final = [...props.newTweets, ...tweetsInit];
    if(final.length !== tweets.length){
      setTweets(final);
    }
  }, [tweetsInit, props.newTweets, tweets])

  useEffect(() => {
    if(tweetsDidSet === false){
      const myCallBack = (stat, res) => {
        if(stat === 200){
          setTweetsDidSet(true)
          setTweetsInit(res);        
        } else {
  
        }
      }
      apiTweetList(myCallBack);
    }
  }, [tweetsDidSet, setTweetsDidSet])

  return (
    tweets.map((tweet, i) => (
      <Tweet key={i} tweet={tweet} className="my-5 py-5 col-md-6 mx-auto border bg-white text-center" />
    ))
  )
}

export function ParentTweet(props){
  const {tweet} = props;

  return (
    tweet.parent ?
      <div className="row">
        <div className='col-11 mx-auto p-3 border rounded '>
          <p className='mb-0 text-muted small'>Retweet</p>
          <Tweet className='' tweet={tweet.parent} />
        </div>
      </div>
      :
      null
  )
}

export function Tweet(props){
    const {tweet} = props;
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null);
    const className = props.className ? props.className : "col-10 mx-auto col-md-6";

    const handlePerformAction = (newActionTweet, stat) => {
      if(stat === 200){
        setActionTweet(newActionTweet)
      }else if(stat === 201){
        //pass to tweetList
      }
    }
    
    return (

      <div className={className}>
        <div>
          <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        {actionTweet && <div className="btn btn-group">
          <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display: "Likes"}} />
          <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "unlike", display: "Unlike"}} />
          <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "retweet", display: "Retweet"}} />
        </div>}
      </div>
    )
  }
  
export function ActionBtn(props){
    const {tweet, action, didPerformAction} = props;
    const likes = tweet.likes ? tweet.likes : 0;
    
    const className = props.className ? props.className : "btn btn-primary";
    const actionDisplay = action.display ? action.display : 'Action';
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay;

    const handleActionbackendEvent = (stat, res) => {
      console.log(res, stat)
        if((stat === 200 || stat === 201) && didPerformAction){
          didPerformAction(res, stat)
        }
    }
    const handleClick = (e) => {
        e.preventDefault()
        apiTweetAction({id: tweet.id, action: action.type, content:tweet.content}, handleActionbackendEvent)
    }

    return (
      <button className={className} id="" onClick={handleClick}>
        {display}
      </button>
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
            // apiTweetList(()=>{})
        }
    }
    xhr.send(data);
    return
  }