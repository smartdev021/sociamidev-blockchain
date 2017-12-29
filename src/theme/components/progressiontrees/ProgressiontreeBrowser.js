/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/treebrowser.css"

const ProgressiontreeBrowser = (props) => {
  console.log("%cBrowsing Single Tree", "background: purple; color: white;");
  console.dir(props.tree);
 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="content-2-columns-left-title">Progression Tree<ActionLink onClick={()=> props.onCloseSingleTree()}>Close</ActionLink></div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div>{props.tree.name}</div>
        </div>
        <div className="col-lg-10">
          <p>{props.tree.description}</p>
          <div id="tree-skills">
            <div className="weightage-section">
              <b>Weightage 1</b>
              <ul>
                {
                  props.tree.weightage1[0].split(',').map(function(skill, i) {
                    return (<ActionLink href="#" key={i}><li>{skill}</li></ActionLink>);
                  })
                }
              </ul>
            </div>
            <div className="weightage-section">
              <b>Weightage 2</b>
              <ul>
                {
                  props.tree.weightage2[0].split(',').map(function(skill, i) {
                    return (<ActionLink href="#" key={i}><li>{skill}</li></ActionLink>);
                  })
                }
              </ul>
            </div>
            <div className="weightage-section">
              <b>Weightage 3</b>
              <ul>
                {
                  props.tree.weightage3[0].split(',').map(function(skill, i) {
                    return (<ActionLink href="#" key={i}><li>{skill}</li></ActionLink>);
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressiontreeBrowser;