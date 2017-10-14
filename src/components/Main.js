/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class Main extends React.Component {
  render() {
    return (
      <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
      </Switch>
    </main>
    );
  }

}

export default Main;