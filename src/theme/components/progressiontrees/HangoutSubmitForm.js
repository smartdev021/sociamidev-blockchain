/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import '~/src/theme/css/treebrowser.css';

class HangoutSubmitForm extends React.Component {
  constructor(props) {
    super(props);

    const oneHourFromNow = moment().add(1, 'hour');

    this.state = {
      isToday: false,
      isLocationVirtual: false,
      location: '',
      IsDeepDiveCreated: 'none',
      IsDisplayForm: 'block',
      dateSelected: oneHourFromNow,

      timeInputValue: oneHourFromNow.format('HH:mm'),
      isSpecificTime: false,
    };

    this.modalDefaultStyles = {};
  }

  componentWillMount() {
    this.modalDefaultStyles = Modal.defaultStyles;

    Modal.defaultStyles.content.border = 'none';
    Modal.defaultStyles.content.background = 'transparent';
    Modal.defaultStyles.content.overflow = 'visible';
    Modal.defaultStyles.content.padding = '0';
    Modal.defaultStyles.content['maxWidth'] = '550px';
    // Modal.defaultStyles.content["minHeight"] = "300px";
    Modal.defaultStyles.content['marginLeft'] = 'auto';
    Modal.defaultStyles.content['marginRight'] = 'auto';
    Modal.defaultStyles.content['left'] = '0px';
    Modal.defaultStyles.content['top'] = '100px';
    Modal.defaultStyles.content['right'] = '0px';
  }

  componentWillUnmount() {
    Modal.defaultStyles = this.modalDefaultStyles;
  }

  handleDateInputChange(e) {
    e.preventDefault();

    const TimeInputSplitted = this.state.timeInputValue.split(':');

    let newInputDate = moment(e.target.value);
    newInputDate.hour(Number(TimeInputSplitted[0]));
    newInputDate.minute(Number(TimeInputSplitted[1]));

    if (newInputDate.isValid()) {
      this.setState({ dateSelected: newInputDate });
    }
  }

  handleTimeInputChange(e) {
    e.preventDefault();

    const TimeInputSplitted = e.target.value.split(':');
    let newDate = moment(this.state.dateSelected);
    newDate.hour(Number(TimeInputSplitted[0]));
    newDate.minute(Number(TimeInputSplitted[1]));
    this.setState({ dateSelected: newDate, timeInputValue: e.target.value });
  }

  handleToggleToday(e) {
    if (!this.state.isToday) {
      let dateNow = moment();
      const TimeInputSplitted = this.state.timeInputValue.split(':');
      dateNow.hour(Number(TimeInputSplitted[0]));
      dateNow.minute(Number(TimeInputSplitted[1]));
      this.setState({ dateSelected: dateNow, isToday: e.target.checked });
    } else {
      this.setState({ isToday: e.target.checked });
    }
  }

  handleOptionChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  handleToggleLocatioVirtual(e) {
    const isChecked = e.target.checked;
    this.setState({ isLocationVirtual: isChecked, location: isChecked ? e.target.value : '' });
  }

  handleStartHangout(e) {
    e.preventDefault();

    this.props.onHandleStartHangout(this.state.dateSelected.toDate());
    this.props.toogleTrenScan();
  }

  handleClick() {
    this.setState({ IsDisplayForm: 'none', IsDeepDiveCreated: 'block' });
    this.props.handleToggle();
  }

  onCreateTaskInSpecificTime() {
    this.props.onHandleStartHangout(this.state.dateSelected.toDate());
    this.props.toogleTrenScan();
    this.setState({ IsDisplayForm: 'none', IsDeepDiveCreated: 'block' });
    this.props.handleToggle();
  }

  onCreateTaskInFlexibleTime() {
    let midnightToday = new Date();
    midnightToday.setHours(0, 0, 0, 0);
    this.props.onHandleStartHangout(midnightToday);
    this.props.toogleTrenScan();
    this.setState({ IsDisplayForm: 'none', IsDeepDiveCreated: 'block' });
    // this.props.handleToggle();
  }

  renderForm() {
    return (
      <form action="#" onSubmit={e => this.handleStartHangout(e)}>
        <label className="radio-inline">When</label>
        <label className="radio-inline">
          <input
            type="checkBox"
            checked={this.state.isToday}
            className="hangout-form-input today"
            name="optradio"
            value="today"
            onChange={e => this.handleToggleToday(e)}
          />Today
          <input
            type="date"
            className="validate-field required"
            data-validation-type="string"
            id="date"
            name="date"
            autoComplete="off"
            placeholder="Date"
            value={moment(this.state.dateSelected).format('YYYY-MM-DD')}
            onChange={e => this.handleDateInputChange(e)}
            disabled={this.state.isToday}
          />
        </label>
        <label className="radio-inline">Time</label>
        <input
          type="time"
          className="validate-field required input-time"
          data-validation-type="string"
          id="time"
          name="date"
          autoComplete="off"
          placeholder="00-00 "
          value={this.state.timeInputValue}
          onChange={e => this.handleTimeInputChange(e)}
        />
        <div className="hangout-bottom-line-wrap">
          <label className="radio-inline">Location</label>
          <label className="radio-inline">
            <input
              type="checkBox"
              className="hangout-form-input"
              name="location"
              value="Virtual"
              onChange={e => this.handleToggleLocatioVirtual(e)}
            />Virtual
          </label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Location"
            onChange={e => this.handleOptionChangeLocation(e)}
            disabled={this.state.isLocationVirtual}
          />
        </div>
        <button
          type="submit"
          onClick={() => this.handleClick()}
          className="btn-md btn-outline-inverse pull-right hangout-btn-go"
        >
          Go
        </button>
      </form>
    );
  }

  render() {
    return !this.state.isSpecificTime ? (
      <Modal
        contentLabel="DeepDive"
        isOpen={this.props.isHangoutFormVisible}
        onRequestClose={() => {
          this.props.onCloseModal();
        }}
      >
        <ActionLink
          href="#"
          className="glyphicon glyphicon-remove modal-close-button"
          onClick={() => {
            this.onCreateTaskInFlexibleTime();
            this.props.onCloseModal();
          }}
        />
        <div className="modal-popup">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="glyphicon glyphicon-ok-sign modal-ok-sign" />
                <p>Your Task has been started (flexiable)</p>
                <br />
                <a href="javascript:" onClick={() => this.setState({ isSpecificTime: true })}>
                  Set a specific time >
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    ) : (
      <Modal
        contentLabel="DeepDive"
        isOpen={this.props.isHangoutFormVisible}
        onRequestClose={() => this.props.onCloseModal()}
      >
        <ActionLink
          href="#"
          className="glyphicon glyphicon-remove modal-close-button"
          onClick={() => this.props.onCloseModal()}
        />

        <div className="modal-popup">
          <div id="DefaultModal" style={{ display: this.state.IsDisplayForm }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <h3>PROPOSE A TIME</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <p>A task will be created for your friend to match you.</p>
                </div>
              </div>
              <div className="row">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="txtDate">Date</label>
                    <input
                      type="date"
                      className="form-control validate-field required"
                      data-validation-type="string"
                      id="txtDate"
                      name="date"
                      autoComplete="off"
                      placeholder="Date"
                      value={moment(this.state.dateSelected).format('YYYY-MM-DD')}
                      onChange={e => this.handleDateInputChange(e)}
                      disabled={this.state.isToday}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="txtTime">Time</label>
                    <input
                      type="time"
                      className=" form-control validate-field required"
                      data-validation-type="string"
                      id="txtTime"
                      name="date"
                      autoComplete="off"
                      placeholder="00-00 "
                      value={this.state.timeInputValue}
                      onChange={e => this.handleTimeInputChange(e)}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-12">
                    {this.renderForm()}
                  </div> */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    className="btn-md btn-outline-inverse pull-right hangout-btn-ok"
                    onClick={() => this.onCreateTaskInSpecificTime()}
                  >
                    OK
                  </button>
                  <button
                    className="btn-md btn-outline-inverse pull-right hangout-btn-cancel"
                    onClick={() => {
                      this.props.onCloseModal();
                      this.setState({ isSpecificTime: false });
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="afterClickModal" style={{ display: this.state.IsDeepDiveCreated }}>
            <p>
              Your DeepDive has been created! Let's wait for a match!<br />Find out more about what's
              happening around this topic below.
            </p>
            <Link to="/tasks">
              <button type="submit" className="btn-md btn-outline-inverse goto-task-manager-btn">
                Goto Task Manager Instead
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    );
  }
}

export default HangoutSubmitForm;
