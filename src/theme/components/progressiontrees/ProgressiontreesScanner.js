/*
    author: Alexander Zolotov
*/
import React from 'react';

import StarRatings from 'react-star-ratings';

import ActionLink from '~/src/components/common/ActionLink'

const ProgressiontreesScanner = (props) => {

  let foundRoadmaps = [];

  const scannerQuery = props.scannerQuery.toLowerCase();
  
  if (scannerQuery != "") {
    foundRoadmaps = props.trees.filter(function(roadmap) {
      return roadmap.name && roadmap.name.toLowerCase().startsWith(scannerQuery);
    });
  }
  else {
    foundRoadmaps = props.trees;
  }

  const openTreeAcceptConfirmationPopup = (treeId, treeName)=>props.openTreeAcceptConfirmationPopup(treeId, treeName);

  return (
    <ul className="list-group">
      {
        foundRoadmaps.map(function(roadmap, i) {
          return (
            <li key={i} className="list-group-item">
              <ActionLink className="tree-scanner-tree-name" href="#" onClick={()=>openTreeAcceptConfirmationPopup(roadmap._id, roadmap.name)}>
                {roadmap.name}
              </ActionLink>

              <span className="star-rating">
                <StarRatings rating={3.5} 
                isSelectable={false} isAggregateRating={true} numOfStars={ 5 } 
                  starWidthAndHeight={20} starSpacing={2}
                  starEmptyColor={"white"}
                  starRatedColor={"rgb(180, 177, 3)"}/>
              </span>

              <div className="deleted tree-scanner-tree-description">{roadmap.description}</div>

              <div className="tree-scanner-tree-icons">
                <span className="tree-scanner-tree-icon glyphicon glyphicon-education"></span>
                <span className="tree-scanner-tree-icon glyphicon glyphicon-bitcoin"></span>
                <span className="tree-scanner-tree-icon glyphicon glyphicon-dashboard"></span>
              </div>
            </li>);
        })
      }
    </ul>
  );
}

export default ProgressiontreesScanner;