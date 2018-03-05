/*
    author: Alexander Zolotov
*/
import React from 'react';

import StarRatings from 'react-star-ratings';

import ActionLink from '~/src/components/common/ActionLink'

import {Link} from 'react-router-dom'

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
              <Link className="progression-tree-my-text" to={`/progressionTreeBrowser/?id=${roadmap._id}`}>
                {roadmap.name}
              </Link>

              <span className="tree-scaner-star-rating">
                <StarRatings rating={3.5} 
                isSelectable={false} isAggregateRating={true} numOfStars={ 5 } 
                  starWidthAndHeight={'20px'} starSpacing={'2px'}
                  starEmptyColor={"white"}
                  starRatedColor={"rgb(239, 206, 74)"}/>
              </span>

              {props.isExpanded ? <div className="tree-scanner-tree-name">{roadmap.description}</div> : <div className="tree-scanner-tree-name">{(roadmap.description).slice(0,100)} ...</div>}

              <div className="tree-scanner-tree-footer">
                <div className="tree-scanner-tree-icons pull-left">
                  <span className="tree-scanner-tree-icon glyphicon glyphicon-education"></span>
                  <span className="tree-scanner-tree-icon glyphicon glyphicon-bitcoin"></span>
                  <span className="tree-scanner-tree-icon glyphicon glyphicon-dashboard"></span>
                </div>

                {props.isExpanded && <div className="tree-scanner-tree-network">
                  825 others are learning {roadmap.name}
                </div>}
                {
                  roadmap.isLocked && <span className="tree-scanner-tree-locked-icon glyphicon glyphicon-lock"></span>
                }
              </div>
            </li>);
        })
      }
    </ul>
  );
}

export default ProgressiontreesScanner;