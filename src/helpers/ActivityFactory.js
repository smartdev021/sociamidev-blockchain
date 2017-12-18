const Hash = require('object-hash');

import ActivityTypes from "~/src/common/ActivityTypes"

const createActivityFriendNewProject = (project, userId)=> {
    let activityBody = {
      type: ActivityTypes.FRIEND_NEW_PROJECT_CREATED, 
      metadata: {
          projectID: project._id,
          projectName: project.name,
        }
    }

    activityBody._id = Hash(activityBody);

    const activityNewProject = {
      userID: userId,
      activity: activityBody,
    };

    return activityNewProject;
}

const createActivityProgressionTreeStarted = (progressionTree, userId)=> {
    let activityBody = {
      type: ActivityTypes.FRIEND_PROGRESSIONTREE_STARTED, 
      metadata: {
          treeId: progressionTree._id,
          treeName: progressionTree.name,
        }
    }

    activityBody._id = Hash(activityBody);

    const activityProgressiontreeStarted = {
      userID: this.props.userProfile._id,
      activity: activityBody,
    };

    return activityProgressiontreeStarted;
  }

const createActivityFriendHasAddedNewFriend = (friendAdded, userId)=> {
    let activityBody = {
      type: ActivityTypes.FRIEND_NEW_FRIEND_ADDED, 
      metadata: {
          friend: friendAdded,
        }
    }

    activityBody._id = Hash(activityBody);

    const activityNewFriendAdded = {
      userID: this.props.userProfile._id,
      activity: activityBody,
    };

    return activityNewFriendAdded;
}

const ActivityFactory = {
    createActivity: function(activityType, data) {
        switch (activityType) {
            case ActivityTypes.FRIEND_NEW_PROJECT_CREATED: {
                return createActivityFriendNewProject(data.project, data.userID);
            }
            case ActivityTypes.FRIEND_PROGRESSIONTREE_STARTED: {
                return createActivityProgressionTreeStarted(data.progressionTree, data.userID);
            }
            case ActivityTypes.FRIEND_NEW_FRIEND_ADDED: {
                return createActivityFriendHasAddedNewFriend(data.progressionTree, data.userID);
            }
            default:
              break;
        }
    }
}

export default ActivityFactory;