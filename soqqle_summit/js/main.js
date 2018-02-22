
/*add subscriber through backend, using 'axios' library*/
var addGroupSubscriber = function addGroupSubscriber(groupId, subscriber, onCallbackSuccess, onCallbackFail) {
    var body = {groupId: groupId, name: subscriber.name, email: subscriber.email};

    axios.post('http://13.59.19.153:8080/addSubscriberToGroup', body)
      .then(function (response) {
        onCallbackSuccess(response);
      })
      .catch(function (error) {
        onCallbackFail(error);
      });
}
/******************************************************** */

//logic for adding subscribers into groups
var lastActiveInputField = undefined;

  /* server response handlers */
  var handleGroupSubscriberAddSuccess = function handleGroupSubscriberAddSuccess(response) {
    console.log("Successfully added");
    console.dir(response.data);

    onNetworkOperationFinish();
  }

  var handleGroupSubscriberAddFail = function handleGroupSubscriberAddFail(error) {
    console.log("Failed to add subscriber: " + error);

    onNetworkOperationFinish();
  }
  /**************************************** */

  /*put code for visual notification of network request in progress here (loading spinner)*/
  var onNetworkOperationStart = function onNetworkOperationStart() {
    console.log("Loading...");
    //put code for showing the spinner here
  }

  var onNetworkOperationFinish = function onNetworkOperationFinish() {
    console.log("Complete!");
    //put code for hiding the spinner here
    $(lastActiveInputField).val("Subscribed!");
    console.log("lastActiveInputField: " + lastActiveInputField);
    console.log("lastActiveInputField.value: " + $(lastActiveInputField).val());
    lastActiveInputField = undefined;
  }

  /* add click event listeners for modal buttons */
  //form_subscribe_news_letter
  var NewsLetterFormId = "#form_subscribe_news_letter";
  var NewsLetterInputId = "#newsletter-form-email";
  $(NewsLetterFormId).on("submit", function(e) {
    e.preventDefault();

    if (lastActiveInputField) {
      return;
    }
    
    var name = "empty";
    var email = $(NewsLetterInputId).val();

    console.log("name: " + name);
    console.log("email: " + email);

    lastActiveInputField = NewsLetterInputId;

    //add subscriber, with name and email taken from input fields
    $(lastActiveInputField).val("Wait a moment...");

    onNetworkOperationStart();
    addGroupSubscriber(9224454, {name: name, email: email}, handleGroupSubscriberAddSuccess, handleGroupSubscriberAddFail);
  });
    
    //form_subscribe_sponsor
    var SponsorFormId = "#form_subscribe_sponsor";
    var SponsorFormInputId = "#sponsor-form-email";
    $(SponsorFormId).on("submit", function(e) {
      e.preventDefault();

      if (lastActiveInputField) {
        return;
      }

      var name = "empty";
      var email = $(SponsorFormInputId).val();
  
      console.log("name: " + name);
      console.log("email: " + email);
  
      lastActiveInputField = SponsorFormInputId;
  
      //add subscriber, with name and email taken from input fields
      $(lastActiveInputField).val("Wait a moment...");
  
      onNetworkOperationStart();
      addGroupSubscriber(9227992, {name: name, email: email}, handleGroupSubscriberAddSuccess, handleGroupSubscriberAddFail);
    });
  /****************************************************** */