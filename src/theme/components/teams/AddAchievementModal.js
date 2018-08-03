import React, { Component } from 'react';
import Modal from 'react-modal';
import { Icon } from 'react-fa';

import { getPopupParentElement } from '~/src/common/PopupUtils.js';

function SelectField(props) {
  return (
    <div>
      <span style={{ color: 'white' }} className="col-lg-6">{props.label}:</span>
      <select className="col-lg-6" style={{
        borderRadius: 0,
        background: 'white',
        marginBottom: '5px',
        fontFamily: 'Berlin-Sans-FB-Regular, sans-serif',
        height: 'auto',
        border: 'none',
        padding: '0',
        fontSize: 'initial'
      }}>
        {props.data.map((item) => (<option key={item}>{item}</option>))}
      </select>
    </div>
  )
}

function InputField(props) {
  return (
    <div>
      <span style={{ color: 'white' }} className="col-lg-6">{props.label}:</span>
      <input className="col-lg-6" type="text" style={{ color: 'white', border: 'none', marginBottom: '5px' }} />
    </div>
  )
}
function DetailsForm(props) {
  return (
    <div>
      <h3 style={{
        textAlign: 'left',
        color: '#ffc225',
        fontSize: '16px',
        margin: '5px',
        padding: '10px'
      }}>Details</h3>
      <InputField label="Type" />
      <InputField label="Result Type" />
      <InputField label="Result Value" />
      <SelectField label="Generic" data={["Yes", "No"]} />
      <InputField label="Images" />
    </div>
  );
}

function AddConditionsForm(props) {
  return (
    <div>
      <h3 style={{
        textAlign: 'left',
        color: '#ffc225',
        fontSize: '16px',
        margin: '5px',
        padding: '10px'
      }}>Add Conditions</h3>
      <SelectField label="Type" data={["Progression", "Task", "Task and Progression", "Achievements", "Action", "Level", "Story"]} />
      <SelectField label="Detail" data={["Dataseeker"]} />
      <SelectField label="Detail #2" data={["Roadmap"]} />
      <button style={{
        background: '#ffc225',
        fontSize: '16px',
        margin: '15px',
        border: 'transparent'
      }}>Add</button>
    </div>
  );
}

function ConditionTable(props) {
  return (
    <div>
      <h3 style={{
        textAlign: 'left',
        color: '#ffc225',
        fontSize: '16px',
        margin: '5px',
        padding: '10px'
      }}>Conditions</h3>
      <table style={{
        color: 'white',
        width: '100%',
        margin: '15px'
      }}>
        <thead style={{ color: 'grey' }}>
          <tr>
            <th style={{ width: '20%'}}>#</th>
            <th style={{ width: '30%'}}>Type</th>
            <th style={{ width: '30%'}}>Detail</th>
            <th>Count</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>1</th>
            <th>Task</th>
            <th>Deepdive</th>
            <th>3</th>
            <th><Icon style={{color: '#ffc225'}} name="minus-circle" /></th>
          </tr>
          <tr>
            <th>2</th>
            <th>Progression</th>
            <th>Dataseeker</th>
            <th>3</th>
            <th><Icon style={{color: '#ffc225'}} name="minus-circle" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

class AddAchievementModal extends Component {

  constructor() {
    super();
    this.modalDefaultStyles = {};
  }

  componentWillMount() {
    this.modalDefaultStyles = Modal.defaultStyles;

    Modal.defaultStyles.content.border = '1px solid rgb(6, 144, 247)';
    Modal.defaultStyles.content['boxShadow'] = '0px 0px 5.53px 1.47px rgba(73, 177, 255, 0.53)';
    Modal.defaultStyles.content.color = 'initial';
    Modal.defaultStyles.content.overflow = 'auto';
    Modal.defaultStyles.content.padding = '0';
    Modal.defaultStyles.content['minWidth'] = '260px';
    Modal.defaultStyles.content['maxWidth'] = '800px';
    Modal.defaultStyles.content['height'] = 'initial';
    Modal.defaultStyles.content['minHeight'] = '500px';
    Modal.defaultStyles.content['marginLeft'] = 'auto';
    Modal.defaultStyles.content['marginRight'] = 'auto';
    Modal.defaultStyles.content['left'] = '50%';
    Modal.defaultStyles.content['width'] = '700px';
  }

  renderHeader() {
    return (
      <div style={{ padding: '10px' }}>
        <table style={{width: '100%',
          borderCollapse: 'inherit',
          borderSpacing: '30px'}}>
          <tbody>
            <tr>
              <td style={{
                width: '50%',
                padding: '10px 25px',
                border: '1px solid gray'
              }}><DetailsForm /></td>
              <td style={{
                width: '50%',
                padding: '10px 25px',
                border: '1px solid gray'
              }}><AddConditionsForm /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{
                padding: '10px 25px',
                border: '1px solid gray'
              }}><ConditionTable /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    return (
      <Modal
        contentLabel={'Add Team Achievement'}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        parentSelector={getPopupParentElement}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)'
          },
          content: {
            background: 'black',
            width: '760px'
          }
        }}>
        {this.renderHeader()}
      </Modal>);
  }
}

export default require('react-click-outside')(AddAchievementModal);