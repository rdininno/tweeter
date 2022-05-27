/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Create tweet
const createTweetElement = function (tweetData) {
  const user = tweetData.user;
  const content = tweetData.content;
  const createdAt = timeago.format(tweetData.created_at);

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

//Render the tweets
const renderTweets = function (tweets) {
  for (const tweet in tweets) {
    const $currentTweet = createTweetElement(tweets[tweet]);

    $("#tweetSection").prepend($currentTweet);
  }
};

//Hide elements on load
$(document).ready(function () {
  $("#errorMessageLong").hide();
  $("#errorMessageEmpty").hide();
  $('.new-tweet').hide();
  $('button.backToTopButton ').hide();
})

//doc ready
$(document).ready(function () {
  //slide down new tweet container
  $('#writeNewTweetButton').on('click', () => {
    $('.new-tweet').slideDown('slow');
    $('#writeNewTweetButton').slideUp('slow');
  })

  //tweet submission
  $('form').on('submit', (evt) => {
    $('#tweetSection').empty();
    evt.preventDefault();

    const $str = $('#tweet-text').serialize();
    const strText = $('#tweet-text').val();

    //tweet validation before posting
    if (!$str.split("=")[1]) {
      $("#errorMessageEmpty").show("fast");

      $('#tweet-text').on('click', () => {
        $("#errorMessageEmpty").hide("fast");
      })

      loadTweets();
    } else if (strText.length > 140) {
      $("#errorMessageLong").show("fast");

      console.log("ERROR")
      $('#tweet-text').on('click', () => {
        $("#errorMessageLong").hide("fast");
      })

      loadTweets();
    } else {
      $.post("/tweets/", $str)
        .done(() => {
          loadTweets();

          console.log("String Text: ", strText);

          $('#tweet-text').val('');
          $('.new-tweet').slideUp('slow');

          window.scrollTo({
            top: top,
            behavior: 'smooth'
          })

          

          $('#writeNewTweetButton').slideDown('slow');
          $('.counter').html(140);
        })
    }
  })

  //load the tweets
  const loadTweets = function () {
    $('#tweetSection').empty()

    $.get('/tweets', (res) => {
      renderTweets(res);
    })
  };

  //load tweets immediately
  loadTweets();
})

