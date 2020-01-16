export function createInterviewAction(title, starttime, endtime, participant_ids) {
  return dispatch => {
    let data = JSON.stringify({
      title: title,
      starttime: starttime,
      endtime: endtime,
      participant_ids: participant_ids
    });
    let url = "http://localhost:3003/interviews/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 3000) {
        alert("There is an overlap in date and time");
      } else {
        dispatch(newInterview(data));
        alert("The Interview is created");
      }
    })
    .catch(error => {
      alert("Error:", error);
    });
  };
}

const newInterview = (data) => ({ type: "NEW_INTERVIEW", data: data });
