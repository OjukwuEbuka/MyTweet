import {lookup} from '../lookup';


export function apiTweetCreate(newTweet, callBack){
    const token = localStorage.getItem('token');
    lookup('POST', '/tweets/create', callBack, {content: newTweet}, {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
  }

export function apiTweetList(callBack){
    const token = localStorage.getItem('token');
    lookup('GET', '/tweets/', callBack, {}, {
      'Authorization': `Token ${token}`
    });
}

export function apiTweetAction(data, callBack){
    const token = localStorage.getItem('token');
    lookup('POST', '/tweets/action', callBack, data, {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      });
}
