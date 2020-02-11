import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import Sound from "react-sound";
import moment from "moment";

var inAnHour = moment().add(1, "hours");
var inFifteen = moment().add(15, "minutes");
var currentTime = moment().format("h:mm");

export default class Timer extends Component {
  state = {
    seconds: 0,
    pause: true,
    time: "",
    currentTime: `${currentTime}`,
    break: ""
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  changeTimeHour = () => {
    this.setState({
      state: this.state,
      seconds: 3600,
      time: `Be back at ${inAnHour.format("h:mm")}`,
      break: ""
    });
  };

  changeTimeMinute = () => {
    this.setState({
      state: this.state,
      seconds: 5,
      time: `Be back at ${inFifteen.format("h:mm")}`,
      break: ""
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
      pause: true,
      time: "",
      break: ""
    });
  };

  breakOver = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
    this.setState({
      time: "",
      break: "Break's Over!"
    });

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
        <p className="be-back">{this.state.time}</p>
        <p className="break-over">{this.state.break}</p>
        <div className="button-container">
          <button type="submit" onClick={this.changeTimeHour}>
            1 Hour
          </button>
          <button type="submit" onClick={this.changeTimeMinute}>
            15 min
          </button>
        </div>
        <button className="start" type="submit" onClick={this.UnpauseIt}>
          start
        </button>
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
            <audio className="audio-element">
              <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3" />
            </audio>
          </div>
        </div>
      </div>
    );
  }
}
