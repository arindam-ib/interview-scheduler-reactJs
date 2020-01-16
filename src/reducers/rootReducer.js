// import axios from 'axios';

const initState = {
  interviews: []
}

const rootReducer = (state = initState, action) => {
  if (action.type === "FETCH_INTERVIEWS") {
    return {
      ...state,
      interviews: action.data
    };
  } else if (action.type === "NEW_INTERVIEW") {
    let newInterviews = state.interviews;
    newInterviews.push(action.data);
    return {
      ...state,
      interviews: newInterviews
    };
  } else if (action.type === "EDIT_INTERVIEW") {
    // console.log(action.data);
    let newInterviews = state.interviews;
    newInterviews = newInterviews.filter(
        interview => interview.id.toString() !== action.id.toString()
    );
    newInterviews.push(action.data);
    return {
      ...state,
      interviews: newInterviews
    };
  } else if (action.type === "DELETE_INTERVIEW") {
    let newInterviews = state.interviews;
    newInterviews = newInterviews.filter(
      interview => interview.id.toString() !== action.id.toString()
    );
    return {
      ...state,
      interviews: newInterviews
    };
  }
  return state;
};

export default rootReducer;
