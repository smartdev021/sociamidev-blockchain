import React, { Component } from 'react';
import SearchHeader from './components/SearchHeader';
import Jobs from './components/Jobs';

//Finish me!

export default class App extends Component {
  render() {
    return (
      <div>
      <h1>Indeed Jobs List.</h1>
      <SearchHeader/>
      <Jobs/>
      </div>
    );
  }
}
