//Char counter
$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    $messageLength = $('textarea#tweet-text').val().length;
    $charsLeft = 140 - $messageLength;

    $charCounter = $(this).nextUntil('output.counter').find('.counter');
    $($charCounter).html($charsLeft);

    if ($($charCounter).html() < 0){
      $($charCounter).css("color", "red");
    }
    if ($($charCounter).html() >= 0){
      $($charCounter).css("color", "black");
    }
  });
});

//scroll ---> back to top button appears
$(window).on('scroll', () => {
  let y = window.scrollY;
  if (y >= 75) {
    $('button.backToTopButton ').show();
    $('#writeNewTweetButton').slideUp('slow');
    
    $('button.backToTopButton ').on('click', () => {
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      })
      
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();
    })
  }
  if (y < 75) {
    $('button.backToTopButton ').hide();
    $('#writeNewTweetButton').slideDown('slow');
  }
})