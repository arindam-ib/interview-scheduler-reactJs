import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { editInterviewAction } from '../actions/editInterviewAction.js';


class Edit extends Component {
  state = {
    title: "",
    starttime: "",
    endtime: "",
    participant_ids: ""
  }

  // componentDidMount() {
  //   let id = this.props.match.params.id;
  //   axios.get('http://localhost:3003/interviews/'+id.toString())
  //   .then(res => {
  //     console.log(res.data)
  //     let participants = "";
  //     for(var i=0;i<res.data.participants.length;i++) participants+=","+res.data.participants[i].email;
  //     participants = participants.slice(1);
  //     this.setState({
  //       title: res.data.title,
  //       starttime: res.data.starttime,
  //       endtime: res.data.endtime,
  //       participant_ids: participants
  //     })
  //   })
  // }
  componentDidMount() {
    let participants = "";
    for(var i=0;i<this.props.interview.participants.length;i++) participants+=","+this.props.interview.participants[i].email;
    participants = participants.slice(1);
    this.setState({
      title: this.props.interview.title,
      starttime: this.props.interview.starttime,
      endtime: this.props.interview.endtime,
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
    this.props.dispatch(
      editInterviewAction(this.props.match.params.id.toString(), title, starttime, endtime, participant_ids.split(","))
    );
    this.props.history.push('/interviews');
    // axios.put('http://localhost:3003/interviews/'+this.props.match.params.id.toString(), {'title': title, 'starttime': starttime, 'endtime': endtime, 'participant_ids': participant_ids.split(",")})
    // .then(res => {
    //   console.log(res.data);
    //   this.props.editInterview(res.data);
    //   this.props.history.push('/interviews');
    // })
  }

  render() {
    const interview = this.props.interview;
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

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    interview: state.interviews.find(interview => interview.id.toString() === id.toString())
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // editInterview: (data)=> {
    //   dispatch({type: 'EDIT_INTERVIEW', data: data})
    // }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Edit);
export default connect(mapStateToProps)(Edit);
