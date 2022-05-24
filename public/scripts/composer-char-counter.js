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
