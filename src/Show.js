import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
// import axios from 'axios';
import {connect} from 'react-redux';

class Show extends Component {

  // state = {
  //   interview: null
  // }
  //
  // componentDidMount() {
  //   let id = this.props.match.params.id;
  //   axios.get('http://localhost:3003/interviews/'+id.toString())
  //   .then(res => {
  //     console.log(res.data)
  //     this.setState({
  //       interview: res.data
  //     })
  //   })
  // }

  render() {
    if(this.props.interview != null)
    {
      const interview = this.props.interview;
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

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    interview: state.interviews.find(interview => interview.id.toString() === id.toString())
  }
}

export default connect(mapStateToProps)(Show);
