import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import {Link} from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject("InterviewStore")
@observer
class Interview extends Component {

  onDeleteClick = (id) => {
    this.props.InterviewStore.deleteInterview(id.toString());
    this.props.history.push('/interviews');
  }

  render() {
    const {interviews} = this.props.InterviewStore;
    const interviewList = interviews.length ? (
      Object.keys(interviews).map((key) => {
        const participantList = interviews[key].participants.length ? (
          interviews[key].participants.map(participant => {
            return(
              <div key={interviews[key].id + "-" + participant.id}>
                <p>{participant.email}</p>
              </div>
            )
          })
        ):(
          <div>
            <p> No participants yet! </p>
          </div>
        )
        return (
          <div className="post card" key={interviews[key].id}>
            <div className="card-content">
              <p className="card-title">{interviews[key].id}, {interviews[key].title} , {interviews[key].starttime} ,
              {interviews[key].endtime}</p>
              <p> Participant List: </p>
              {participantList}
              <Link to={"/interview/"+interviews[key].id.toString()}>Show</Link> | <Link to={"/interview/"+interviews[key].id.toString()+"/edit"}>Edit</Link> | <button onClick={() => this.onDeleteClick(interviews[key].id)}>Delete</button>
              <br />
            </div>
          </div>
        )
      })
    ):(
      <div className="center"> No posts yet! </div>
    )
    return (
      <div className="Interview">
          {interviewList}
      </div>
    );
  }
}

export default Interview;
