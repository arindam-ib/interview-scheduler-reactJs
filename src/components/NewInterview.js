import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import { inject, observer } from "mobx-react";

@inject("InterviewStore")
@observer
class NewInterview extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let starttime = e.target.elements.starttime.value;
    let endtime = e.target.elements.endtime.value;
    let participant_ids = e.target.elements.participant_ids.value;
    this.props.InterviewStore.createInterview(title, starttime, endtime, participant_ids.split(","))
    this.props.history.push('/interviews');
  }

  render() {
    return (
      <div className="NewInterview">
          New Interview
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title"/>
            <label htmlFor="starttime">Start Time: </label>
            <input type="datetime" id="starttime" placeholder="2020-01-04T03:40" />
            <label htmlFor="endtime">End Time: </label>
            <input type="datetime" id="endtime" placeholder="2020-01-04T03:40" />
            <label htmlFor="participants">Participants: </label>
            <input type="text" id="participant_ids" />
            <button>Submit</button>
          </form>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(NewInterview);
export default NewInterview;
