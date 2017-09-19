import React, { Component } from 'react';

class SearchHeader extends React.Component {

  constructor(props) {
    super(props);
    this.countrys = {Singapore:"sg", USA:"us", China:"cn"};
    this.state = {country: this.countrys.Singapore, items: [], jobTitle : "programmer"};
    this.handleChange = this.handleChange.bind(this);
    this.dataUpdated = this.dataUpdated.bind(this);
  }

  handleChange(event) {
    console.log(event.target);
    if (event.target.id === "country_select") {
      this.setState({country: event.target.value});
    }

    if (event.target.id === "job_title") {
      this.setState({jobTitle: event.target.value});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items > prevState.items) {
      console.log(this.state.items);
    }
    if (this.state.country > prevState.country) {
      console.log(this.state.country);
      this.refreshData();
    }if (this.state.jobTitle > prevState.jobTitle) {
      console.log(this.state.jobTitle);
      this.refreshData();
    }
  }

  componentDidMount() {
    console.log(this.state.country);
  }

  dataUpdated(data) {
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(data, "text/xml");
    // print the name of the root element or error message

    var jobItems = [];

    var results = oDOM.getElementsByTagName("results")[0].childNodes;

    for (var i = 0; i < results.length; ++i)
    {
      var jobItem = {};
      for (var j = 0; i < results[i].childNodes.length; ++j)
      {
        var resultChildNode = results[i].childNodes[j];
        if (resultChildNode === results[i].lastChild) {
          break;
        }
        jobItem[resultChildNode.nodeName] = resultChildNode.textContent;
        jobItems.push(jobItem);
      }
    }

    this.state.items = [];

    var copy = Object.assign({}, this.state, {items: []});
    this.setState(copy);

    var copy = Object.assign({}, this.state, {items: jobItems});
    this.setState(copy);
  }

  refreshData() {
    var self = this;


    const PUBLISHER_ID = "4201738803816157";

    var xhr = new XMLHttpRequest();
    var url = "https://devfortest.000webhostapp.com/indeed_api/index.php?publisher=" + PUBLISHER_ID + "&query=" + this.state.jobTitle + "&country=" + this.state.country;
    console.log(url);
   xhr.open("GET", url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xhr.responseText, "text/xml");
          // print the name of the root element or error message
          self.dataUpdated(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }

  componentDidMount() {
    this.refreshData();
}   

  render() {
        

    var countryOptions = [];

    for (var country in this.countrys) {
      if (this.countrys.hasOwnProperty(country)) {
          //var selected = (this.countrys[country] === "sg") ?  selected="selected" : "";
          countryOptions.push(<option value={this.countrys[country]} key={this.countrys[country]}>{country}</option>);
      }
    }

    var itemsOutput = "";

    if (this.state.items.length > 0) {
      for (var i = 0; i < this.state.items.length; ++i) {
        var item = this.state.items[i];
        var toStringItem = JSON.stringify(item);

        toStringItem = toStringItem.replace('{', "");
        toStringItem = toStringItem.replace('}', "");

        itemsOutput += toStringItem;
      }
    }
    var itemsFinalOutput = <div>{itemsOutput}</div>;

    return (
      <div>
       <p>Search parameters:</p>
       <form action="">
         <input type="text" placeholder="job name" id="job_title" onChange={this.handleChange}/>
         <select name="country" value={this.state.value} onChange={this.handleChange} id="country_select">
           {countryOptions}
           </select>
        </form>
        {itemsFinalOutput}
      </div>
    );
  }

}

export default SearchHeader;