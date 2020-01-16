import React, {Component} from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import Interview from './components/Interview.js';
import NewInterview from './components/NewInterview.js';
import Home from './components/Home.js';
import Show from './components/Show.js';
import Edit from './components/Edit.js';
import Navbar from './components/Navbar';

@inject("InterviewStore")
@observer
class App extends Component {

  componentDidMount = () => {
    this.props.InterviewStore.fetchInterviews();
  };

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

export default App;
