import {lookup} from '../lookup';


export function apiTweetCreate(newTweet, callBack){
    const token = localStorage.getItem('token');
    lookup('POST', '/tweets/create', callBack, {content: newTweet}, {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
  }

export function apiTweetList(callBack){
    lookup('GET', '/tweets/', callBack);
}

export function apiTweetAction(data, callBack){
    const token = localStorage.getItem('token');
    lookup('POST', '/tweets/action', callBack, data, {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      });
}
