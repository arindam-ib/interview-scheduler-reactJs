import React, {Component} from 'react';
// import logo from './logo.svg';
import {connect} from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Interview from './components/Interview.js';
import NewInterview from './components/NewInterview.js';
import Home from './components/Home.js';
import Show from './components/Show.js';
import Edit from './components/Edit.js';
import Navbar from './components/Navbar';
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
