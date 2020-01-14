// import axios from 'axios';

const initState = {
  interviews: []
}

const rootReducer = (state=initState, action) => {
  console.log(action);
  if(action.type==='DELETE_INTERVIEW')
  {
    let newInterviews = state.interviews.filter(interview => {
      return action.id.toString() !== interview.id.toString()
    });
    return {
      ...state,
      interviews: newInterviews
    }
  }

  if(action.type==='FETCH')
  {
    return {
      ...state,
      interviews: action.data
    }
  }

  if(action.type==='CREATE_INTERVIEW')
  {
    let interviews = state.interviews;
    interviews.push(action.data);
    console.log(interviews);
    return {
      ...state,
      interviews: interviews
    }
  }

  if(action.type==='EDIT_INTERVIEW')
  {
    let interviews = state.interviews;
    let newInterviews = interviews.filter(interview => {
      return action.data.id.toString() !== interview.id.toString()
    });
    newInterviews.push(action.data);
    return {
      ...state,
      interviews: newInterviews
    }
  }

  return state;
}

export default rootReducer;
