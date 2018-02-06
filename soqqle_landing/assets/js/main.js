var addGroupSubscriber = function addGroupSubscriber(groupId, subscriber, onCallbackSuccess, onCallbackFail) {
    var body = {groupId: groupId, name: subscriber.name, email: subscriber.email};

    axios.post('http://13.59.19.153:8080/addSubscriberToGroup', subscriber)
      .then(function (response) {
        onCallbackSuccess(response);
      })
      .catch(function (error) {
        onCallbackFail(error);
      });
}