/*
  author: Akshay Menon
*/

import React, { Component } from 'react';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';

import '~/src/theme/css/levels.css';

class Levels extends Component {
    constructor(props) {
        super(props);
    }

    renderProgressionLevels(UserProgressionTreeLevels){
        let listItems = UserProgressionTreeLevels.map((ProgTreeLevel, i) => {
            let widthPercent = Math.round((ProgTreeLevel.currentLevelXP / ProgTreeLevel.totalXP) * 100);
            return(
                <div className="col-md-4 experience-container" key={i}>
                    <div className="experience-box">
                        <div className="main-comment-box">
                            <div className="prog-tree-level-name">{ProgTreeLevel.name}</div>
                            <div className="prog-tree-level">
                                <div className="prog-tree-level-btn">LEVEL {ProgTreeLevel.level}</div>
                            </div>
                            <div className="prog-tree-level-progress">
                                <div className="prog-tree-level-percentage">{widthPercent} %</div>
                                <div className="prog-tree-level-bar"
                                style={{ width: `${widthPercent}%` }}></div>
                            </div>
                            <div className="prog-tree-total-xp">
                                <div className="prog-tree-total-xp-value">
                                TOTAL XP {ProgTreeLevel.totalXP}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return listItems
    }

    render() {
        const UserProgressionTreeLevels = this.props.userProfile.progressionTreeLevels
        return (
            <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper settings-wrapper main-bg`}>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="row">
                                
                                <LeftNav 
                                accounting={this.props.accounting}
                                userProfile={this.props.userProfile} 
                                profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} 
                                />

                                <RightSection />

                                <div className="col-middle ml-fixed">

                                    <div className="experience-h4">Experience</div>
                                    
                                    {this.renderProgressionLevels(UserProgressionTreeLevels)}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Levels;
