/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweetData) {
  const user = tweetData.user;
  const content = tweetData.content;
  const createdAt = tweetData.created_at;

  let $tweet = 
    $(`<article class="tweetContainer"> 
        <header>
          <div class="tweetHeaderAccount">
          <img class="tweetAvatar" src=${user.avatars}>
            <p class="tweetAccount">${user.name}</p>
          </div>
          <div>
            <p class="tweetUser">${user.handle}</p>
          </div>
        </header>
        <body>
          <div>
            <p class="tweet">${content.text}</p>
          </div>
        </body>
        <footer>
          <div>
            <p class="tweetDate">${createdAt}</p>
          </div>
          <div class="tweetIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-cannabis"></i>
          </div>
        </footer> 
      </article>`)
  
  return $tweet;
};

const renderTweets = function(tweets) {
  for(const tweet in tweets) {
    const $currentTweet = createTweetElement(tweets[tweet]);

    $("#tweetSection").prepend($currentTweet);
  }
};

$(document).ready(function(){

  $('form').on('submit', (evt) => {
    console.log("EVENT TRIGGERED!!");
    evt.preventDefault();

    const $str = $('form').serialize();

    $.post( "/tweets/", $str)
  })
  renderTweets(data);
})

