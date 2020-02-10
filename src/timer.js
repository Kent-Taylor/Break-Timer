import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds
export default class Timer extends Component {
  state = {
    seconds: 0,
    pause: true
  };
  componentDidMount() {
    this.setState({
      //Setting the value of the date time
      date: hours + ":" + min
    });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  changeTimeHour = () => {
    this.setState({
      date: hours + 1 + ":" + min,
      seconds: 3600,
      pause: false
    });
  };

  changeTimeMinute = () => {
    this.setState({
      date: hours + ":" + (min + 15),
      seconds: 900,
      pause: false
    });
  };

  pauseIt = () => {
    this.setState({
      pause: true
    });
  };

  UnpauseIt = () => {
    this.setState({
      pause: false
    });
  };

  reset = () => {
    this.setState({
      seconds: 0,
      pause: true
    });
  };

  breakOver = () => {
    alert("Break's over!");
  };

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="page-container">
        <div className="animation-container">
          <ReactCountdownClock
            seconds={this.state.seconds}
            color="#FF9F1C"
            alpha={0.9}
            size={200}
            weight={10}
            paused={this.state.pause}
            onComplete={this.breakOver}
          />
        </div>
        {minutes === 0 && seconds === 0 ? (
          <h1>Busted!</h1>
        ) : (
          <p>Be back at: {`${this.state.date}`}</p>
        )}
        <div className="button-container">
          <button type="submit" onClick={this.changeTimeHour}>
            1 Hour
          </button>
          <button type="submit" onClick={this.changeTimeMinute}>
            15 min
          </button>
        </div>
        <div className="control-panel">
          <button className="pause" type="submit" onClick={this.pauseIt}>
            ||
          </button>
          <div className="controls">
            <button className="resume" type="submit" onClick={this.UnpauseIt}>
              Resume
            </button>
            <button className="reset" type="submit" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
