/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function (tweetData) {
  const user = tweetData.user;
  const content = tweetData.content;
  const createdAt = timeago.format(new Date());

  //helper excape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
            <p class="tweet">${escape(content.text)}</p>
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
    $('#tweetSection').empty();
    evt.preventDefault();

    const $str = $('#tweet-text').serialize();

    if (!$str) {   ////check this
      alert("tweet is empty");
    } else if ($str.length > 140) {
      alert("tweet is too long")
    } else {
      $.post("/tweets/", $str).done(() => {
        loadTweets();
      })
    }
  })

  const loadTweets = function () {
    $('#tweetSection').empty()
    $.get('/tweets', (res) => {
      renderTweets(res);
    })
  };

  loadTweets();
})

