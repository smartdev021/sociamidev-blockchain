$(document) ['ready'](function () {
  $('input') ['keypress'](function (evt) {
    var charCode = evt['charCode'] || evt['keyCode'];
    if (charCode == 13) {
      return false;
    };
  });
  SocialSize = $('.social ul li') ['size']() * 60;
  $('.social') ['css']('width', SocialSize);
  ReAlign();
  $('.videoDivider') ['hide']();
  $('.joinusButton') ['click'](subscribe);
});

function openSurvey() {
	window.open('https://soqqle.typeform.com/to/YNFo2O', 'survey', "height=760,width=600");
}

function subscribe() {
  var isNameValid = validateName($('.name') ['val']());
  var isEmailValid = validateEmail($('.mail') ['val']());

  if (!isNameValid) {
    $('.formvalidate#form-validate-name') ['fadeIn']();
  }

  if (!isEmailValid) {
    $('.formvalidate#form-validate-mail') ['fadeIn']();
  }

    if (!isNameValid || !isEmailValid) {
      return
    } else {
      $['ajax']({
        url: 'mail.php?email=' + $('.mail') ['val'](),
        success: function (data) {
          console.log("data");
          console.dir(data);
          if (data == 'OK') {
            $('.formsent') ['fadeIn']();
          };
        }
      });
      $('.formvalidate') ['fadeOut']();
    };
  }
$(window) ['resize'](function () {
  // ReAlign();
});
function ReAlign() {
  // $('.main') ['css']('margin-top', $(window) ['height']() / 2 - 320);
};
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re['test'](email);
};

function validateName(name) {
  return name != "";
};
