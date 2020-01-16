import React, {Component} from 'react';
// import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { deleteInterviewAction } from '../actions/deleteInterviewAction.js';

class Interview extends Component {

  // state = {
  //   interviews: [ ]
  // }
  //
  // componentDidMount() {
  //   axios.get('http://localhost:3003/interviews')
  //   .then(res => {
  //     console.log(res.data)
  //     this.setState({
  //       interviews: res.data //[{'id': 2, 'title': 'abc', 'starttime': 'asd', 'endtime': 'erg', 'participants': 'asdsdfdsf'}]
  //     })
  //   })
  // }

  onDeleteClick = (id) => {
    // axios.delete('http://localhost:3003/interviews/'+id.toString())
    // .then(res => {
    //   axios.get('http://localhost:3003/interviews')
    //   .then(res => {
    //     //console.log(res.data)
    //     this.props.deleteInterview(id);
    //     this.props.history.push('/interviews');
    //   })
    // })
    this.props.dispatch(deleteInterviewAction(id.toString()));
    this.props.history.push('/interviews');
  }

  render() {
    const {interviews} = this.props;
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

const mapStateToProps = (state) => {
  return {
    interviews: state.interviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteInterview: (id)=> {
    //   dispatch({type: 'DELETE_INTERVIEW', id: id})
    // }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Interview);
export default connect(mapStateToProps)(Interview);
