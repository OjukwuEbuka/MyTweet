export function lookup(method, endpoint, callback, data, extraHeaders={}){
  let jsonData;
  // const csrftoken = getCookie('csrftoken');
  if(data){
    jsonData = JSON.stringify(data);
  }
     
  const xhr = new XMLHttpRequest();
  const url = `http://127.0.0.1:8001/api${endpoint}`;
  xhr.responseType = "json";
  xhr.open(method, url);
  if(extraHeaders){
    for(const [k, val] of Object.entries(extraHeaders)){
      xhr.setRequestHeader(k, val);
    }
  }
  // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
  // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  // if(csrftoken){
  //   xhr.setRequestHeader("X-CSRFToken", csrftoken);    
  // }
  xhr.onload = function() {
    callback(xhr.status, xhr.response)
  }
  xhr.onerror = function(e){
    console.log(e)
    callback({"message":"An error occurred!"}, 400)
  }
  xhr.send(jsonData);
}

export function createTweet(newTweet, callBack){
  lookup('POST', '/tweets/create', callBack, newTweet);
}

export function loadTweets(callBack){
  lookup('GET', '/tweets/', callBack);
}

// function getCookie(name){
//   let cookieValue = null;
//   if(document.cookie && document.cookie !== ''){
//       let cookies = document.cookie.split(';');
//       for(let i = 0; i < cookies.length; i++){
//           let cookie = cookies[i].trim();
//           if(cookie.substring(0, name.length + 1) === (name + '=')){
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   console.log(cookieValue)
//   return cookieValue;
// }