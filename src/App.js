import React, {Component} from 'react';
// import logo from './logo.svg';
import Interview from './Interview.js';
import NewInterview from './NewInterview.js';
import Home from './Home.js';
import Show from './Show.js';
import Edit from './Edit.js';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
//import './App.css';


class App extends Component {

  componentDidMount() {
    axios.get('http://localhost:3003/interviews')
    .then(res => {
      console.log(res.data)
      this.props.fetchAllData(res.data);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/interviews" component={Interview} />
          <Route exact path="/new_interview" component={NewInterview} />
          <Route exact path="/interview/:id" component={Show} />
          <Route exact path="/interview/:id/edit" component={Edit} />

        </div>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllData: (data)=> {
      dispatch({type: 'FETCH', data: data})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
