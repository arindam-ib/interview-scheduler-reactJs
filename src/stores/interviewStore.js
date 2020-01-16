import { observable, action } from "mobx";

class InterviewStore {
  @observable interviews = [];

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
    }).then(response => response.json())
      .then(data => {
        if (data.code === 3000) {
          alert("There is an overlap in date and time");
        } else {
          this.interviews.push(data);
          alert("The Interview is created");
        }
      })
      .catch(error => {
        alert("Error:", error);
      });
  };

  @action deleteInterview = (id) => {
    let url = "http://localhost:3003/interviews/" + id;
    fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    }).then(res => {
        console.log(res.json());
        this.interviews = this.interviews.filter(
          interview => interview.id.toString() !== id.toString()
        );
      })
      .then(res => console.log(res));
  };

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
    }).then(response => response.json())
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
