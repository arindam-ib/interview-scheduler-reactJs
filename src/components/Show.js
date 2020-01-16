import React, {Component} from 'react';
import { inject, observer } from "mobx-react";

@inject("InterviewStore")
@observer
class Show extends Component {

  render() {
    let id = this.props.match.params.id;
    const interview = this.props.InterviewStore.interviews.find(
      interview => interview.id.toString() === id.toString()
    );
    if(interview != null)
    {
      const participantList = interview.participants.length ? (
        interview.participants.map(participant => {
          return(
            <div key={interview.id + "-" + participant.id}>
              {participant.email}
            </div>
          )
        })
      ):(
        <div>
          <p> No participants yet! </p>
        </div>
      )
      return (
        <div className="Interview">
         <p>Id: {interview.id}</p>
         <p>Title: {interview.title}</p>
         <p>Start time: {interview.starttime}</p>
         <p>End time: {interview.endtime}</p>
         <p>Participants : </p>{participantList}
        </div>
      );
    }
    else {
      return (
        <div> Loading... </div>
      )
    }
  }
}

export default Show;
