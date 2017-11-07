/*
    author: Alexander Zolotov
*/
import React from 'react';
import {Icon} from 'react-fa'

function About(props) {
  return (<div>
    <h1 className="pull-right">About Us</h1>
  <p className="pull-right">Powered by Artificial intelligence and Blockchain, Soqqle is a Social Network built as an economy to let users monetize an underutilized asset - Knowledge and Experience.</p>
  
    <p className="pull-right"><Icon name="users" className="fa-huge-icon pull-right"/></p>
    <h3 className="pull-right">The Social Economy</h3>
  <p className="pull-right">Social networks have not changed in the last 10 years, with big-data overloading masses with content without showing where to get more depth. The solution consists of 3 modules - data-driven personalized roadmaps, meaningful social network and tokenized learning.</p>
   
  <p className="pull-right">As the world moves into the upcoming 4th industrial revolution, with people expected to not just be unemployed but unemployable, Soqqle sets out with the vision to produce a network of motivated and connected Soqqlers placed at the forefront of humankind to drive the future economy. 
</p></div>);
}

export default About;