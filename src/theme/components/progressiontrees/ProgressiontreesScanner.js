/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

const ProgressiontreesScanner = (props) => {
  const DummyTrees = [
    {name: "AI for Beginners", secondaryInfo: {
      image_1: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/matthewicon.png", 
      image_2: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/Mathildaicon.png"
      , text: "and 1282 others"}
    }, 
    {name: "AI for Intermediates", secondaryInfo: {image_1: null, image_2: null, text: "256 learners"}}, 
    {name: "AI for advanced learners", secondaryInfo: {image_1: null, image_2: null, text: "32 learners"}}, 
    {name: "AI for corporations", secondaryInfo: {
      image_1: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/johnicon.png", 
      image_2: null, text: "and 10 others"}
    }, 
  ];

  let foundRoadmaps = [];

  const scannerQuery = props.scannerQuery.toLowerCase();
  
  if (scannerQuery != "") {
    foundRoadmaps = props.roadmapsAdmin.data.filter(function(roadmap) {
      return roadmap.name && roadmap.name.toLowerCase().startsWith(scannerQuery);
    });
  }
  else {
    foundRoadmaps = props.roadmapsAdmin.data;
  }

  const openTreeAcceptConfirmationPopup = (treeId, treeName)=>props.openTreeAcceptConfirmationPopup(treeId, treeName);

  return (
    <ul id="trees-scanner-list-trees">
      {
        foundRoadmaps.map(function(roadmap, i) {
          let tree = DummyTrees[Math.floor(Math.random() * (DummyTrees.length - 0)) + 0];
          return (<li key={i}>
          <div className="tree-list-item">
            <ActionLink href="#" onClick={()=>openTreeAcceptConfirmationPopup(roadmap._id, roadmap.name)}>{roadmap.name}</ActionLink>
            {tree.secondaryInfo ? 
            <div className="pull-right">
              <span>
                <span>{tree.secondaryInfo.image_1 ? <img src={tree.secondaryInfo.image_1}/> : null}</span>
                <span>{tree.secondaryInfo.image_2 ? <img src={tree.secondaryInfo.image_2}/> : null}</span>
              </span>
              {tree.secondaryInfo.text ? <div id="tree-list-item-secondary-text">{tree.secondaryInfo.text}</div> : null}
            </div> : null}
          </div>
        </li>);
        })
      }
    </ul>
  );
}

export default ProgressiontreesScanner;