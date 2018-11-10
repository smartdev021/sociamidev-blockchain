import React from 'react';
import { message, Table, Button, Icon, Upload} from 'antd';
import Img from 'react-image';

import ConfigMain from '~/configs/main';

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploaded: false,
    }

    this.onHandleUploadChallengeImg = this.onHandleUploadChallengeImg.bind(this);
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

  render(){
    return (
      <div className="col-box-wp p-0">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
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
                return(
                <tr key={que._id}>
                <td>{que.name}</td>
                <td className="gray-text">{que.description}</td>
                <td className="yellow-text">{que.success ? que.success : ''}</td>
                <td>{que.validation ? que.validation : ''}</td>
                <td>{que.reward ? que.reward : ''}</td>
                <td>{que.rewardValue ? que.rewardValue : ''}</td>
                <td>{que.company ? que.company : ''}</td>
                <td>{que.refresh ? que.refresh : ''}</td>
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
                <td>{que.quota ? que.quota : ''}</td>
                <td>{que.access ? que.access : ''}</td>
                <td>{que.type ? que.type : ''}</td>
                <td>{que.typeDetail ? que.typeDetail : ''}</td>
                <td>{que.requirement ? que.requirement : ''}</td>
                <td>{que.requirementValue ? que.requirementValue : ''}</td>
                <td>{que.group ? que.group : ''}</td>
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
