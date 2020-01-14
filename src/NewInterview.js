import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import {connect} from 'react-redux';


class NewInterview extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let starttime = e.target.elements.starttime.value;
    let endtime = e.target.elements.endtime.value;
    let participant_ids = e.target.elements.participant_ids.value;
    axios.post('http://localhost:3003/interviews', {'title': title, 'starttime': starttime, 'endtime': endtime, 'participant_ids': participant_ids.split(",")})
    .then((res) => {
      console.log("HO");
      console.log(res);
      console.log(res.data);
      this.props.createInterview(res.data);
      this.props.history.push('/interviews');
    })
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


const mapStateToProps = (state) => {
  return {
    interviews: state.interviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createInterview: (data)=> {
      dispatch({type: 'CREATE_INTERVIEW', data: data})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewInterview);
