import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import ConfigMain from '~/configs/main';
import Pagination from 'react-js-pagination';
import {Button, Icon, message, Upload} from 'antd';
import Textarea from 'react-textarea-autosize';
import Img from 'react-image';
import {addUserGuide, fetchUserGuides, updateUserGuide, deleteUserGuides} from '~/src/redux/actions/admin';
import nl2br from "nl2br";

class UserGuides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGuides: [],
      editingId: null,
      activePage: 1,
      total: 0,
    }
    this.onChange = this.onChange.bind(this);
    this.addNewStep = this.addNewStep.bind(this);
    this.removeSteps = this.removeSteps.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onClickEditable = this.onClickEditable.bind(this);
    this.onHandleUploadImage = this.onHandleUploadImage.bind(this);
  }

  onChange(id, field, e) {
    const {userGuides} = this.state;
    this.setState({
      userGuides: userGuides.map(item => item._id === id ? {
        ...item,
        [field]: field === 'selected' ? e.target.checked : e.target.value,
        hasChanged: true,
      } : item)
    })
  }

  addNewStep() {
    const {addUserGuide} = this.props;
    addUserGuide();
  }

  removeSteps() {
    const {userGuides} = this.state;
    const {deleteUserGuides} = this.props;
    const selectedIds = userGuides.filter(step => step.selected).map(step => step._id)
    if (selectedIds.length) {
      deleteUserGuides({ids: selectedIds})
      message.success(`${selectedIds.length} item(s) was removed successfully`, 0.5);
    } else {
      message.error(`Please select item(s) to remove`, 0.5);
    }
  }

  onChangePage(activePage) {
    const {fetchUserGuides} = this.props;
    this.setState({activePage}, () => {
      fetchUserGuides({activePage})
    })
  }

  onHandleUploadImage(info, id) {
    const {userGuides} = this.state;
    message.loading('Upload image in progress..', 0.1);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`, 0.5);
      this.setState({userGuides: userGuides.map(step => step._id === id?{...step, timestamp: new Date().getMilliseconds()}:step)})
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.error}`, 0.5);
    }
  }

  async onClickEditable(id) {
    const {editingId, userGuides} = this.state;
    if (editingId) {
      const editingData = userGuides.find(step => step._id === editingId)
      if (editingData.hasChanged) {
        await this.props.updateUserGuide(editingData);
        message.success(`Data edited successfully.`);
      }
      this.setState({editingId: null})
    } else {
      this.setState({editingId: id})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {userGuides} = nextProps;
    if (userGuides && userGuides.data) {
      this.setState({userGuides: userGuides.data, total: userGuides.total})
    }
  }

  onClickInput(e) {
    e.stopPropagation();
  }

  componentDidMount() {
    const {fetchUserGuides} = this.props;
    const {activePage} = this.state;
    fetchUserGuides({activePage});
    this.props.onRef(this)
  }

  render() {
    const {userGuides, editingId, activePage, total} = this.state;
    return <div className="questions company-middle-wrapper">
      <p dangerouslySetInnerHTML={{__html: nl2br(message ? message : '')}}/>
      <div id="stories" className="theme-box-right">
        <div className="box" style={{padding: '1px'}}>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
              <tr>
                <th></th>
                <th>Step</th>
                <th>Description</th>
                <th>X</th>
                <th>Y</th>
                <th>Component</th>
                <th>Page</th>
                <th>Image</th>
                <th>Video</th>
                <th>Trigger</th>
                <th>Trigger Details</th>
              </tr>
              </thead>
              <tbody>
              {
                _.map(userGuides, (step, index) => {
                  if (editingId === step._id) {
                    return (
                      <tr key={step._id} data-key={step._id} data-index={index}  onClick={() => this.onClickEditable(step._id)}>
                        <td></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'step', e)} data-indexParent="name"
                                      value={step.step}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'description', e)}
                                      value={step.description}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'x', e)} value={step.x}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'y', e)} value={step.y}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'component', e)} value={step.component}/>
                        </td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'page', e)} value={step.page}/></td>
                        <td style={{display: 'flex', flexDirection: 'column'}}><Img
                                 src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/userGuideImages/${step._id}?t=${step.timestamp?step.timestamp:''}`}
                                 style={{maxWidth: 90, maxHeight: 90}}
                        />
                          <Upload
                            name="image"
                            listType="picture"
                            action={`${ConfigMain.getBackendURL()}/user-guide/${step._id}/upload-image`}
                            onChange={info => this.onHandleUploadImage(info, step._id)}
                            showUploadList={false}
                            key={`upload${step._id}`}
                          >
                            <Button key={`btn${step._id}`}>
                              <Icon type="upload" key={`icon${step._id}`}/>Upload
                            </Button>
                          </Upload></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'video', e)} value={step.video}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'trigger', e)} value={step.trigger}/></td>
                        <td><Textarea onClick={this.onClickInput} onChange={e => this.onChange(step._id, 'triggerDetails', e)}
                                      value={step.triggerDetails}/></td>
                      </tr>
                    )
                  } else {
                    return (
                      <tr key={step._id} data-key={step._id} data-index={index}
                          onClick={() => this.onClickEditable(step._id)}>
                        <td onClick={e =>  e.stopPropagation()}><input checked={!!step.selected} type="checkbox" style={{cursor: "pointer"}}
                                   data-key={step._id}
                                   onChange={e => this.onChange(step._id, 'selected', e)}/></td>
                        <td className="hover-pencil">{step.step}</td>
                        <td className="hover-pencil">{step.description}</td>
                        <td className="hover-pencil">{step.x}</td>
                        <td className="hover-pencil">{step.y}</td>
                        <td className="hover-pencil">{step.component}</td>
                        <td className="hover-pencil">{step.page}</td>
                        <td style={{display: 'flex', flexDirection: 'column'}}><Img
                                 src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/userGuideImages/${step._id}?t=${step.timestamp?step.timestamp:''}`}
                                 style={{maxWidth: 90, maxHeight: 90}}
                        />
                          <Upload
                            name="image"
                            listType="picture"
                            action={`${ConfigMain.getBackendURL()}/user-guide/${step._id}/upload-image`}
                            onChange={info => this.onHandleUploadImage(info, step._id)}
                            showUploadList={false}
                            key={`upload${step._id}`}
                          >
                            <Button key={`btn${step._id}`}>
                              <Icon type="upload" key={`icon${step._id}`}/>Upload
                            </Button>
                          </Upload></td>
                        <td className="hover-pencil">{step.video}</td>
                        <td className="hover-pencil">{step.trigger || ''}</td>
                        <td className="hover-pencil">{step.triggerDetails || ''}</td>
                      </tr>
                    )
                  }
                })
              }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          key={'pagingUserGuides'}
          hideNavigation
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={total}
          pageRangeDisplayed={20}
          onChange={this.onChangePage}
        />
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  userGuides: state.admin.userGuides
});

const mapDispatchToProps = dispatch => ({
  fetchUserGuides: bindActionCreators(fetchUserGuides, dispatch),
  updateUserGuide: bindActionCreators(updateUserGuide, dispatch),
  addUserGuide: bindActionCreators(addUserGuide, dispatch),
  deleteUserGuides: bindActionCreators(deleteUserGuides, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuides);
