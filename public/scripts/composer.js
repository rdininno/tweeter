//Char counter
$(document).ready(function () {
  $("#tweet-text").on('keydown', function () {
    $messageLength = $('textarea#tweet-text').val().length;
    $charsLeft = 140 - $messageLength;

    $charCounter = $(this).nextUntil('output.counter').find('.counter');
    $($charCounter).html($charsLeft);

    if ($($charCounter).html() < 0){
      $($charCounter).css("color", "red");
    }
  });
});

//scroll ---> back to top button appears
$(window).on('scroll', () => {
  let y = window.scrollY;
  if (y >= 150) {
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
  if (y < 150) {
    $('button.backToTopButton ').hide();
    $('#writeNewTweetButton').slideDown('slow');
  }
})