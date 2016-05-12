$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - parseInt($('body').css('paddingTop'))
        }, 1000);
        return false;
      }
    }
  });
});

function sendContactRequest() {

  var email = $('#email').val();
  var phone = $('#phone').val();
  var desc = $('#desc').val();

  var validationFailed = $('#validation-failed');
  var sendFailed = $('#send-failed');
  var sendOk = $('#send-ok');
  var sendButton = $('#send-button');
  var spinner = $('#spinner');

  validationFailed.hide();
  sendFailed.hide();
  sendOk.hide();

  if(!phone) {
    validationFailed.show();
  } else {
    spinner.show();
    sendButton.prop('disabled', true);

    $.ajax({
      type: "POST",
      url: "https://boiling-tundra-67911.herokuapp.com/contact",
      data: {
        "email": email,
        "phone": phone,
        "desc" : desc
      }
    }).done(function(response) {
      sendOk.show();
    }).fail(function() {
      sendButton.prop('disabled', false);
      sendFailed.show();
    }).always(function() {
      spinner.hide();
    })
  }


  return false;
}

$('#send-button').click(sendContactRequest);