export function fetchInterviewsAction() {
    return dispatch => {
        return fetch('http://localhost:3003/interviews')
        .then(results => {
          return results.json();
        }).then(data => {
            dispatch(fetchInterviews(data))
        })
    }
}
const fetchInterviews = (data) => ({type : "FETCH_INTERVIEWS", data: data})
