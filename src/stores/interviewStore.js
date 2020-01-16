import { observable, action } from "mobx";

class InterviewStore {
  @observable interviews = [];
  //  fetch all the interviews
  @action fetchInterviews = () => {
    fetch("http://localhost:3003/interviews")
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data);
        this.interviews = data;
      });
  };

  // Create an interview
  @action createInterview = (title, starttime, endtime, participant_ids) => {
    let data = JSON.stringify({
      title: title,
      starttime: starttime,
      endtime: endtime,
      participant_ids: participant_ids
    });
    let url = "http://localhost:3003/interviews";
    fetch(url, {
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
          // actually create interview in store
          this.interviews.push(data);
          alert("The Interview is created");
        }
      })
      .catch(error => {
        alert("Error:", error);
      });
  };
  //   Delete an Interview
  @action deleteInterview = (id) => {
    let url = "http://localhost:3003/interviews/" + id;
    fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        console.log(res.json());
        // actually delete the interview from store
        this.interviews = this.interviews.filter(
          interview => interview.id.toString() !== id.toString()
        );
      }) // OR res.json()
      .then(res => console.log(res));
  };

  //   Edit an interview
  @action editInterview = (id, title, starttime, endtime, participant_ids) => {
    let data = JSON.stringify({
      title: title,
      starttime: starttime,
      endtime: endtime,
      participant_ids: participant_ids
    });
    let url = "http://localhost:3003/interviews/" + id;
    fetch(url, {
      method: "PUT",
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
          this.interviews = this.interviews
                            .filter(interview => interview.id.toString() !== id.toString());
          this.interviews.push(data);
          alert("The Interview is updated");
        }
      });
  };
}

const store = new InterviewStore();
export default store;
