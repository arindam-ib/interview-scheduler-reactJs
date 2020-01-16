export function deleteInterviewAction(id) {
  return dispatch => {
    let url = "http://localhost:3003/interviews/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
    .then(res => {
      if (res.json()) {
        dispatch(delete_interview(id));
      }
    }) // OR res.json()
    .then(res => console.log(res));
  };
}

const delete_interview = (id) => ({ type: "DELETE_INTERVIEW", id: id });
