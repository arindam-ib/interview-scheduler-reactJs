import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import { inject, observer } from "mobx-react";

@inject("InterviewStore")
@observer
class Edit extends Component {
  state = {
    title: "",
    starttime: "",
    endtime: "",
    participant_ids: ""
  }

  componentDidMount() {
    let participants = "";
    let id = this.props.match.params.id;
    const interview = this.props.InterviewStore.interviews.find(
      interview => interview.id.toString() === id.toString()
    );
    for(var i=0;i<interview.participants.length;i++) participants+=","+interview.participants[i].email;
    participants = participants.slice(1);
    this.setState({
      title: interview.title,
      starttime: interview.starttime,
      endtime: interview.endtime,
      participant_ids: participants,
    })
  }

  handleChange = (e) => {
    // console.log(e.target.id)
    // console.log(e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let starttime = e.target.elements.starttime.value;
    let endtime = e.target.elements.endtime.value;
    let participant_ids = e.target.elements.participant_ids.value;
    console.log(this.state);
    this.props.InterviewStore.editInterview(this.props.match.params.id.toString(), title, starttime, endtime, participant_ids.split(","));
    this.props.history.push('/interviews');
  }

  render() {
    let id = this.props.match.params.id;
    const interview = this.props.InterviewStore.interviews.find(
      interview => interview.id.toString() === id.toString()
    );
    if(interview==null)
    {
      return (
        <div> Loading... </div>
      )
    }
    else {

      return (
        <div className="Edit">
            New Interview
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title: </label>
              <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
              <label htmlFor="starttime">Start Time: </label>
              <input type="datetime" id="starttime" onChange={this.handleChange} placeholder="2020-01-04T03:40" value={this.state.starttime} />
              <label htmlFor="endtime">End Time: </label>
              <input type="datetime" id="endtime" onChange={this.handleChange} placeholder="2020-01-04T03:40" value={this.state.endtime} />
              <label htmlFor="participants">Participants: </label>
              <input type="text" id="participant_ids" onChange={this.handleChange} value = {this.state.participant_ids} />
              <button>Submit</button>
            </form>
        </div>
      );
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Edit);
export default Edit;
