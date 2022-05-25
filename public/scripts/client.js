/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetData) {
  const user = tweetData.user;
  const content = tweetData.content;
  const createdAt = timeago.format(new Date());

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

const renderTweets = function (tweets) {
  for (const tweet in tweets) {
    const $currentTweet = createTweetElement(tweets[tweet]);

    $("#tweetSection").prepend($currentTweet);
  }
};

$(document).ready(function () {
  $('form').on('submit', (evt) => {
    //console.log("EVENT TRIGGERED!!");
    evt.preventDefault();

    const $str = $('form').serialize();

    $.post("/tweets/", $str, () => {
      renderTweets($str);
    })
  })

  const loadTweets = function() {
    $.get('/tweets', (res) => {
      renderTweets(res);
    })
  };

  loadTweets();
})

