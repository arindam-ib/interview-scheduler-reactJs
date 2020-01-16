export function editInterviewAction(id, title, starttime, endtime, participant_ids) {
  return dispatch => {
    let data = JSON.stringify({
      title: title,
      srarttime: starttime,
      endtime: endtime,
      participant_ids: participant_ids
    });
    let url = "http://localhost:3003/interviews/" + id;
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    }).then(response => response.json())
      .then(data => {
        if (data.code === 3000) {
          alert("There is an overlap in date and time");
        } else {
          dispatch(editInterview(id, data));
          alert("The Interview is updated");
        }
      })
      .catch(error => {
        alert("Error:", error);
      });
  };
}

const editInterview = (id, data) => ({ type: "EDIT_INTERVIEW", id: id, data: data });
