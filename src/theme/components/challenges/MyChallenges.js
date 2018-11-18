import React from 'react';
import { message, Table, Button, Icon, Upload} from 'antd';
import Img from 'react-image';

import ConfigMain from '~/configs/main';
import Textarea from 'react-textarea-autosize';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploaded: false,
    };

    this.onHandleUploadChallengeImg = this.onHandleUploadChallengeImg.bind(this);
    this.setSelectedChallenge = this.setSelectedChallenge.bind(this);
    this.handleChallengeInputClick = this.handleChallengeInputClick.bind(this);
    this.handleChallengeDataChange = this.handleChallengeDataChange.bind(this);
    this.getStories = this.getStories.bind(this);
    this.getAchievements = this.getAchievements.bind(this);
  }

  onHandleUploadChallengeImg(info){ 
    message.loading('Upload image in progress..', 0.1);
   
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
     
      this.setState({isUploaded: true}); //re-render image
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.error}`);
    }
  }

  /* Handle checkbox click for challenges */
  setSelectedChallenge(e){
    e.stopPropagation();
    var ids = this.props.selectedChallengeKeys;
    var index = ids.indexOf(e.currentTarget.dataset.key);
    if(index > -1){
      ids.splice(index, 1);
    } else {
      ids.push(e.currentTarget.dataset.key);
    }
    return this.props.handleSelectdChallengeKeysSet(ids);
  }

  /* Prevent child element click to update state */
  handleChallengeInputClick(e){
    e.stopPropagation();
  }

  /* Update new value in state after editing */
  handleChallengeDataChange(e){
    const that = this;
    let challengeParent = e.currentTarget.dataset.indexparent;
    let index = that.props.editableChallengeIndex;
    let challengesCopy = JSON.parse(JSON.stringify(this.props.challenges));
    challengesCopy[index][challengeParent] = e.currentTarget.value;
    return that.props.handleChallengeCopyChange(challengesCopy);
  }

  getStories(selectedValue){
    return this.props.storiesList
      .filter(item => item.name)
      .map((item,i) => <option value={item.name} key={i} selected={selectedValue === item.name}>{item.name}</option>)
  }

  getAchievements(selectedValue){
    return this.props.challengeAchievements
      .filter(item => item.name)
      .map((item,i) => <option value={item.name} key={i} selected={selectedValue === item.name}>{item.name}</option>)
  }

  render(){
    return (
      <div className="col-box-wp p-0">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Success</th>
                <th>Validation</th>
                <th>Reward</th>
                <th>Submitted</th>
                <th>Company</th>
                <th>Refresh</th>
                <th>Image</th>
                <th>Quota</th>
                <th>Public/Private</th>
                <th>Type</th>
                <th>Type Detail</th>
                <th>Requirement</th>
                <th>Requirement Value</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
            {
              _.map(this.props.challenges,(que, index)=>{
                if(this.props.editableChallengeKey === que._id) {
                  return(
                    <tr key={que._id} data-key={que._id} data-index={index} onClick={(e)=>this.props.onClickChallengeEditable(e)} >
                      <td/>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="name" value={que.name} />
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="description" value={que.description} />
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="success" value={que.success} />
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="validation"
                        >
                          <option value="3rd party basic" selected={que.validation === '3rd party basic'}>3rd party basic</option>
                          <option value="3rd party intermediate" selected={que.validation === '3rd party intermediate'}>3rd party intermediate</option>
                          <option value="Admin" selected={que.validation === 'Admin'}>Admin</option>
                          <option value="Maker" selected={que.validation === 'Maker'}>Maker</option>
                        </select>
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="reward"
                        >
                          <option value="Token" selected={que.reward === 'Token'}>Token</option>
                          <option value="Achievement" selected={que.reward === 'Achievement'}>Achievement</option>
                          <option value="Cash" selected={que.reward === 'Cash'}>Cash</option>
                        </select>
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="rewardValue" value={que.rewardValue} />
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="company"
                        >
                          <option value="Soqqle1" selected={que.company === 'Soqqle1'}>Soqqle1</option>
                          <option value="Soqqle" selected={que.company === 'Soqqle'}>Soqqle</option>
                          <option value="Soqqle2" selected={que.company === 'Soqqle2'}>Soqqle2</option>
                        </select>
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="refresh"
                        >
                          <option value="Daily" selected={que.refresh === 'Daily'}>Daily</option>
                          <option value="Weekly" selected={que.refresh === 'Weekly'}>Weekly</option>
                          <option value="Monthly" selected={que.refresh === 'Monthly'}>Monthly</option>
                        </select>
                      </td>
                      <td><Img key={`${new Date()}${que._id}`}
                               src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/challengeImages/${que._id}`}
                               style={{maxWidth: 90, maxHeight: 90}}
                      />
                        <Upload
                          name="image"
                          listType="picture"
                          action={`${ConfigMain.getBackendURL()}/challenges/${que._id}/upload-image`}
                          onChange= {this.onHandleUploadChallengeImg}
                          showUploadList={false}
                          key={`upload${que._id}`}
                        >
                          <Button data-imagebutton="true" key={`btn${que._id}`}>
                            <Icon type="upload" key={`icon${que._id}`}/>Upload
                          </Button>
                        </Upload>
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="quota" value={que.quota} />
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="access"
                        >
                          <option value="private" selected={que.access === 'private'}>private</option>
                          <option value="public" selected={que.access === 'public'}>public</option>
                        </select>
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="type" value={que.type} />
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="typeDetail" value={que.typeDetail} />
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="requirement"
                        >
                          <option/>
                          <option value="Achievement" selected={que.requirement === 'Achievement'}>Achievement</option>
                          <option value="Story" selected={que.requirement === 'Story'}>Story</option>
                        </select>
                      </td>
                      <td className="black-text">
                        <select
                          onClick={this.handleChallengeInputClick}
                          onChange={this.handleChallengeDataChange}
                          data-indexParent="requirementValue"
                        >
                          {que.requirement === 'Achievement' ? this.getAchievements(que.requirementValue) : this.getStories(que.requirementValue)}
                        </select>
                      </td>
                      <td className="black-text">
                        <Textarea onClick={this.handleChallengeInputClick} onChange={this.handleChallengeDataChange} data-indexParent="group" value={que.group} />
                      </td>
                    </tr>
                  )
                }
                return(
                  <tr key={que._id} data-key={que._id} data-index={index} onClick={(e)=>this.props.onClickChallengeEditable(e)} >
                    <td><input type="checkbox" style={{cursor: "pointer"}} data-key={que._id} onClick={this.setSelectedChallenge} /></td>
                    <td className="hover-pencil">{que.name}</td>
                    <td className="gray-text hover-pencil">{que.description}</td>
                    <td className="yellow-text hover-pencil">{que.success ? que.success : ''}</td>
                    <td className="hover-pencil">{que.validation ? que.validation : ''}</td>
                    <td className="hover-pencil">{que.reward ? que.reward : ''}</td>
                    <td className="hover-pencil">{que.rewardValue ? que.rewardValue : ''}</td>
                    <td className="hover-pencil">{que.company ? que.company : ''}</td>
                    <td className="hover-pencil">{que.refresh ? que.refresh : ''}</td>
                    <td><Img key={`${new Date()}${que._id}`}
                        src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/challengeImages/${que._id}`}
                        style={{maxWidth: 90, maxHeight: 90}}
                      />
                      <Upload
                        name="image"
                        listType="picture"
                        action={`${ConfigMain.getBackendURL()}/challenges/${que._id}/upload-image`}
                        onChange= {this.onHandleUploadChallengeImg}
                        showUploadList={false}
                        key={`upload${que._id}`}
                      >
                        <Button data-imagebutton="true" key={`btn${que._id}`}>
                          <Icon type="upload" key={`icon${que._id}`}/>Upload
                        </Button>
                      </Upload>
                    </td>
                    <td className="hover-pencil">{que.quota ? que.quota : ''}</td>
                    <td className="hover-pencil">{que.access ? que.access : ''}</td>
                    <td className="hover-pencil">{que.type ? que.type : ''}</td>
                    <td className="hover-pencil">{que.typeDetail ? que.typeDetail : ''}</td>
                    <td className="hover-pencil">{que.requirement ? que.requirement : ''}</td>
                    <td className="hover-pencil">{que.requirementValue ? que.requirementValue : ''}</td>
                    <td className="hover-pencil">{que.group ? que.group : ''}</td>
                  </tr>
                )
            })
          }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Challenges;
