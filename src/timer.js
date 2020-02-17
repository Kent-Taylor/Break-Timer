import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import Sound from "react-sound";
import moment from "moment";

var inAnHour = moment().add(1, "hours");
var inFifteen = moment().add(15, "minutes");

// https://rails.devcamp.com/12/guide/1535 this will fix my Be back at bug

export default class Timer extends Component {
  state = {
    seconds: 0,
    pause: true,
    pauseTxt: "",
    time: "Current Time",
    backAt: "",
    break: "",
    selection: "Select Time"
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    const dateElement = document.getElementById("dateComponent");
    const dateBtn = document.getElementById("dateBtn");
    const dateBtn2 = document.getElementById("dateBtn2");

    if (dateBtn) {
      dateBtn.addEventListener("click", event => {
        dateElement.innerHTML = `Be back at ${moment()
          .add(15, "minutes")
          .format("LTS")}`;
        this.changeTimeMinute();
      });
    }
    if (dateBtn2) {
      dateBtn2.addEventListener("click", event => {
        dateElement.innerHTML = `Be back at ${moment()
          .add(1, "hours")
          .format("LTS")}`;
        this.changeTimeHour();
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new moment().format("LTS")
    });
  }

  changeTimeHour = () => {
    this.setState({
      seconds: 3600 + 1,
      backAt: `Be back at ${inAnHour.format("h:mm A")}`,
      break: "",
      pauseTxt: "Press Start",
      selection: "1 hour"
    });
  };

  changeTimeMinute = () => {
    this.setState({
      seconds: 900 + 1,
      break: "",
      pauseTxt: "Press Start",
      selection: "15 minutes"
    });
  };

  pauseIt = () => {
    this.setState({
      pause: true,
      pauseTxt: "||"
    });
  };

  unpauseIt = () => {
    this.setState({
      pause: false
    });
  };

  reset = () => {
    window.location.reload();
  };

  breakOver = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
    this.setState({
      time: "",
      break: "Break's Over!",
      selection: ""
    });
    console.log("sound played");

    return (
      <Sound
        url="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.play}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
  };

  render() {
    return (
      <div className="page-container">
        <p className="current-time">{this.state.time}</p>
        <div className="animation-container">
          <ReactCountdownClock
            seconds={this.state.seconds}
            color="#FF9F1C"
            alpha={0.9}
            size={200}
            weight={10}
            paused={this.state.pause}
            onComplete={this.breakOver}
            pausedText={this.state.pauseTxt}
            showMilliseconds={false}
          />
        </div>
        <div className="all-buttons">
          <div className="top-buttons">
            <p className="selection">{this.state.selection}</p>
            <div id="dateComponent" className="be-back" />
            <p className="break-over">{this.state.break}</p>
            <div className="button-container">
              <button id="dateBtn2">1 hour</button>

              <button id="dateBtn">15 min</button>
            </div>
            <button className="start" type="submit" onClick={this.unpauseIt}>
              start
            </button>
          </div>
          <div className="control-panel">
            <button className="pause" type="submit" onClick={this.pauseIt}>
              ||
            </button>
            <div className="controls">
              <button className="resume" type="submit" onClick={this.unpauseIt}>
                Resume
              </button>
              <button className="reset" type="submit" onClick={this.reset}>
                Reset
              </button>
              <audio className="audio-element">
                <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3" />
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
