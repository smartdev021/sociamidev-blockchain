/*
    author: Alexander Zolotov
    Helper class for fetching response from remote API
*/

/*
    @data: input data in xml format
    returns array of objects in a form of 'object{xmlNodeName: xmlNodeValue}'
*/

import 'whatwg-fetch'

function xmlToArrayOfObjects(data) {
    if (typeof data === "undefined" || !data) {
      return [];
    }
    //init DomParser, and parse data to xml Document
    let domParser = new DOMParser();
    let dom = domParser.parseFromString(data, "text/xml");

    //array to be filled with objects 'object{xmlNodeName: xmlNodeValue}'
    let jobItems = [];

    //get first node <results> - there should always be only one such node
    let results = dom.getElementsByTagName("results")[0].childNodes;

    //for eacth <result> node child inside <results> node
    for (let i = 0; i < results.length; ++i) {
      //save <result> to local variable
      let currentResult = results[i];

      //empty single jobItem object
      let jobItem = {};

      //for each node inside <result> node
      for (let j = 0; i < currentResult.childNodes.length; ++j) {

        //save current node to local variable
        let resultChildNode = currentResult.childNodes[j];
        
        if (resultChildNode === currentResult.lastChild) {
          //skip last node
          break;
        }
        //add new {key, value} into jobItem
        jobItem[resultChildNode.nodeName] = resultChildNode.textContent;
      }

      //push new single jobItem entry into array
      jobItems.push(jobItem);
    }

    return jobItems;
  }

  /*
    @url: API url
    @listener(result): callback to invoke on success
    @convertToArrayOfObjects: should we convert result to array of objects, or return plain xml
 */
  const requestApiData = function (url, listener, convertToArrayOfObjects) {

    const headers = new Headers();
    headers.set('Content-Type', 'text/xml');

    //use fetch API to get response from remote API
    fetch(url, headers)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
            listener();
          return;  
        }
        //upon success - invoke callback, and pass 'result' as an argument
        response.text().then(function(text) {
          let result = (convertToArrayOfObjects === true) ? xmlToArrayOfObjects((text)) : text;
          listener(result); 
        });
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);
      listener();
    });
  }

module.exports.requestApiData = requestApiData;