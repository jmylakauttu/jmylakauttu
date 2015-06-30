$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 180
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

  if(!email && !phone) {
    validationFailed.show();
  } else {
    spinner.show();
    sendButton.prop('disabled', true);
    var message = "<p>" + email + "</p>" + "<p>" + phone + "</p>" + "<p>" + desc + "</p>";

    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        "key": "bfe92QqfRMzq6bLatXy4CQ",
        "message": {
          "from_email": "purts12015@gmail.com",
          "to": [
            {
              "email": "purts12015@gmail.com",
              "type": "to"
            }
          ],
          "subject": "Tarjouspyynto web-sivulta",
          "html": message
        }
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