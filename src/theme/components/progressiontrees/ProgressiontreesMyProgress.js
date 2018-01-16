/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

const ProgressiontreesMyProgress = (props) => {
  return (
    <div id="my-progress-list">
          {
            props.trees.map(function(roadmap, i) {
            return (
              <div key={i}>
                <ActionLink className="progression-tree-my-text" onClick={()=> props.openSingleTree(roadmap._id)}>
                  {roadmap.name}
                </ActionLink>
                <ActionLink className="progression-tree-my-text" onClick={()=> props.stopProgressionTree(roadmap._id)}>
                  <span className="glyphicon glyphicon-remove"></span>
                </ActionLink>
              </div>
            );
          })}
    </div>
  );
}

export default ProgressiontreesMyProgress;