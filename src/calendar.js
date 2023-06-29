import React, { Component } from "react";
import CalendarDays from "./Component/calendar-days";
import "./calendar.css";

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // this.state = JSON.parse(window.localStorage.getItem("state")) || {
    this.state = {
      currentDay: new Date(),
      modal: false,
      name: "",
      time: "",
      email: "",
      mockevents: [],
      showPortal: false,
      portalData: {},
    };
  }

  // setState(state) {
  //   window.localStorage.setItem("state", JSON.stringify(state));
  //   super.setState(state);
  // }

  componentDidMount() {
    const mockevents =
      localStorage.getItem("mockevents") == null
        ? []
        : JSON.parse(localStorage.getItem("mockevents"));

    this.setState({
      mockevents: mockevents,
    });
  }

  changeCurrentDay = (day) => {
    this.setState({
      currentDay: new Date(day.year, day.month, day.number),
      modal: !this.state.modal,
    });
  };

  toggleModalClose = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  togglePortalClose = () => {
    this.setState({
      showPortal: !this.state.showPortal,
    });
  };

  nextDay = () => {
    this.setState({
      currentDay: new Date(
        this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)
      ),
    });
  };

  previousDay = () => {
    this.setState({
      currentDay: new Date(
        this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)
      ),
    });
  };

  onChange = (e) => {
    if (e.target.id === "name") {
      this.setState({
        name: e.target.value,
      });
    } else if (e.target.id === "email") {
      this.setState({
        email: e.target.value,
      });
    } else if (e.target.id === "time") {
      const splittedTime = e.target.value.split(":");
      const AMorPM = splittedTime[0] >= 12 ? "PM" : "AM";
      const hours = splittedTime[0] % 12 || 12;
      const finalTime = hours + ":" + splittedTime[1] + " " + AMorPM;
      this.setState({
        time: e.target.value,
        time12hours: finalTime,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let countEvent = this.state.mockevents.filter(
      (x) => new Date(x.date).toDateString() === this.state.date.toDateString()
    );

    if (countEvent.length < 3) {
      let mockevents = this.state.mockevents;
      mockevents.push({
        date: this.state.date,
        name: this.state.name,
        time: this.state.time12hours,
        email: this.state.email,
        color: this.state.color,
      });

      this.setState({
        modal: !this.state.modal,
        mockevents: mockevents,
        name: "",
        time: "",
        email: "",
      });

      localStorage.setItem("mockevents", JSON.stringify(mockevents));
    } else {
      alert("Event more than 3");
    }
  };

  onAddEvent = (day, date, mockevents, color) => {
    this.setState({
      currentDay: new Date(day.year, day.month, day.number),
      modal: !this.state.modal,
      mockevents: mockevents,
      date: date,
      color: color,
    });
  };

  onShowPortal = (e, ev) => {
    console.log("isi event portaldata", ev);
    e.stopPropagation();
    this.setState({
      showPortal: true,
      portalData: ev,
    });
  };

  handleDelete = () => {
    this.setState({
      mockevents: this.state.mockevents.filter(
        (ev) => ev.name !== this.state.portalData.name
      ),
      showPortal: !this.state.showPortal,
    });
  };

  render() {
    console.log("this.state", this.state);

    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="title">
            <h2>
              {this.months[this.state.currentDay.getMonth()]}{" "}
              {this.state.currentDay.getFullYear()}
            </h2>
          </div>
          {/* <div className="tools">
            <button onClick={this.previousDay}>
              <ion-icon name="arrow-back-circle-outline"></ion-icon>
            </button>
            <p>
              {this.months[this.state.currentDay.getMonth()].substring(0, 3)}{" "}
              {this.state.currentDay.getDate()}
            </p>
            <button onClick={this.nextDay}>
              <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </button>
          </div> */}
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {this.weekdays.map((weekday) => {
              return (
                <div className="weekday">
                  <p>{weekday}</p>
                </div>
              );
            })}
          </div>
          <CalendarDays
            day={this.state.currentDay}
            onAddEvent={this.onAddEvent}
            mockevents={this.state.mockevents}
            onShowPortal={this.onShowPortal}
          />
        </div>

        {this.state.modal && (
          <div className="modal">
            <div onClick={this.toggleModalClose} className="overlay"></div>
            <div className="modal-content">
              <h2>Add Event</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="formInput">
                  <label>Name</label>
                  <input
                    type="text"
                    value={this.state.name}
                    id="name"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Time</label>
                  <input
                    type="time"
                    value={this.state.time}
                    id="time"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="text"
                    value={this.state.email}
                    id="email"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button className="submit" type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        )}

        {this.state.showPortal && (
          <div className="Wrapper">
            <div
              onClick={this.togglePortalClose}
              className="overlay-portal"
            ></div>
            <h2>Name : {this.state.portalData.name}</h2>
            <p>Date : {this.state.portalData.date.toDateString()}</p>
            <p>Time : {this.state.portalData.time}</p>
            <p>Email : {this.state.portalData.email}</p>
            <ion-icon
              name="trash-outline"
              onClick={this.handleDelete}
            ></ion-icon>
            <ion-icon name="close" onClick={this.togglePortalClose}></ion-icon>
          </div>
        )}
      </div>
    );
  }
}
