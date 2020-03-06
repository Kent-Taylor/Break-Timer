// ==== 1.0
// import dependencies
import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import moment from "moment";
import Whistle from "./sounds/Aztec-Death-Whistle.wav";
import Train from "./sounds/train-crossing.mp3";
import R2 from "./sounds/r2.mp3";
// ==== 1.0

// ==== 2.0
// create a class and export it

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ==== 6.2
      // set it to 0 to start
      seconds: 0,
      // ==== 6.2

      // ==== 6.4
      pause: true,
      // ==== 6.4

      // ==== 6.6
      pauseTxt: "",
      // ==== 6.6

      // ==== 4.1
      // this will render while the clock is loading
      time: "Current Time",
      // ==== 4.1

      break: "",

      // ==== 8.3
      selection: "Select Time",

      ring: "https://www.thesoundarchive.com/email/Game-Show-Buzzer.wav"
    };
  }
  audio = new Audio(this.props.url);

  // ==== 3.1
  componentDidMount() {
    // ==== 4.2
    // create set interval to have it update every 1 second
    this.intervalID = setInterval(() => this.tick(), 1000);
    // ==== 4.2
    const dateElement = document.getElementById("dateComponent");

    // ==== 7.3
    // define button and get the elements by their id's
    const fifteenBtn = document.getElementById("fifteenBtn");
    const oneHourBtn = document.getElementById("oneHourBtn");
    // ==== 7.3

    // ==== 7.4
    // if fifteenBtn is pressed add event listener that creates
    if (fifteenBtn) {
      // ==== 7.5
      // add event listener that creates HTML of the moment + 15 minutes
      fifteenBtn.addEventListener("click", event => {
        dateElement.innerHTML = `Be back at ${moment()
          .add(15, "minutes")
          .format("LTS")}`;
        // ==== 7.6
        // create and call changeTimeMinute()
        this.changeFifteenMinute();
        // ==== 7.6

        // ==== 7.8
        // set state pause to false so that the timer can start after being changed to 15 mintes.
        this.setState({
          pause: false
        });
        // ==== 7.8
      });
    }

    // ==== 7.9
    // copy and paste and do the same thing for oneHourBtn
    if (oneHourBtn) {
      oneHourBtn.addEventListener("click", event => {
        dateElement.innerHTML = `Be back at ${moment()
          .add(1, "hours")
          .format("LTS")}`;
        // ==== 7.10
        // define and call changeTimeHour
        this.changeTimeHour();
        this.setState({
          pause: false
        });
      });
    }
  }

  // ==== 5.0
  // create componentWillUnmount which cleans up the DOM (deletion of component timer)
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  // ==== 5.0

  // ==== 4.2
  // create a tick function and set state with format.
  tick() {
    this.setState({
      time: new moment().format("LTS")
    });
  }
  // ==== 4.2

  // 7.11
  changeTimeHour = () => {
    this.setState({
      // google how many seconds are in 1 hour.
      seconds: 3600 + 1,
      // set break to blank since break is not over.
      break: "",
      // set to starting for while the timer is loading
      pauseTxt: "Starting",

      // ==== 8.1
      selection: "1 hour"
      // ==== 8.1
    });
  };

  // ==== 7.7
  changeFifteenMinute = () => {
    this.setState({
      // google how many seconds are in 15 mintes.
      seconds: 900 + 1,
      // set break to blank since break is not over.
      break: "",
      // set to starting for while the timer is loading
      pauseTxt: "Starting",

      // ==== 8.2
      selection: "15 minutes"
      // ==== 8.2
    });
  };
  // ==== 7.7

  // ==== 9.2
  // create and set state
  pauseIt = () => {
    this.setState({
      // set pause to true
      pause: true,
      // the reactCountDownTimer lets you set pauseTxt
      pauseTxt: "||"
    });
  };

  // ==== 9.5
  // create and set state pause to false to resume the timer
  unpauseIt = () => {
    this.setState({
      pause: false
    });
  };

  // ==== 11.0
  // You can have the program auto reset after breakOver has been trigered.
  reloader = () => {
    // set a timeout function and set the time at the end of it.
    setTimeout(function() {
      window.location.reload(true);
    }, 10000);
  };

  // ==== 9.7
  // you can just set all the states to it's start state, but you can just have it
  // refresh the page instead.
  reset = () => {
    window.location.reload();
  };

  // ==== 6.8
  // define the function breakOver
  breakOver = () => {
    // ==== 10.1
    // select the element by the class name audio-element
    // grab the first element of it which is [0]
    const sound = document.getElementsByClassName("audio-element")[0];
    // set the volume out of 1.0
    sound.volume = 0.3;
    // then use the play function for sound.
    sound.play();
    // ==== 6.9
    // set state
    this.setState({
      // ==== 6.10
      // set time to 0
      // render break's over
      time: "",
      break: "Break's Over!",
      // ==== 6.10

      selection: ""
    });
    // ==== 6.9

    // ==== 11.1
    // call reloader
    this.reloader();
  };

  onChange = event => {
    // TODO
    // try just setting the state to the path of the mp3 and wav files
    // this.setState({
    //   ring: event.target.value
    // });
    const sound = document.getElementsByClassName("audio-element")[0];

    // if (event.target.value) {
    //   console.log("They match! Whoot", event.target.label);
    // } else {
    //   console.log("Not found.");
    // }

    if (event.target.value === "whistle") {
      this.setState({ ring: Whistle }, function() {
        sound.pause();
        sound.load();
      });
    } else if (event.target.value === "monty-python") {
      this.setState(
        {
          ring: "https://www.thesoundarchive.com/montypython/Newt.wav"
        },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "r2") {
      this.setState(
        {
          ring: R2
        },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "final-countdown") {
      this.setState(
        {
          ring:
            "https://www.thesoundarchive.com/ringtones/AD-FinalCountdown_pt2.wav"
        },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "buzzer") {
      this.setState(
        {
          ring: "https://www.thesoundarchive.com/email/Game-Show-Buzzer.wav"
        },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "train") {
      this.setState({ ring: Train }, function() {
        sound.pause();
        sound.load();
      });
    } else if (event.target.value === "piano") {
      this.setState(
        { ring: "https://www.kozco.com/tech/piano2.wav" },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "tina") {
      this.setState(
        { ring: "https://www.thesoundarchive.com/nd/nap-eeatthefood.wav" },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else if (event.target.value === "austin-powers") {
      this.setState(
        { ring: "https://www.thesoundarchive.com/austinpowers/yababy.wav" },
        function() {
          sound.pause();
          sound.load();
        }
      );
    } else {
      console.log("not found");
    }
  };

  // ==== 3.0
  // create a render function with return
  render() {
    return (
      // ==== 4.0
      // create page-container and current time
      <div className="page-container">
        <p className="current-time">{this.state.time}</p>
        {/* ==== 4.0 */}

        {/* ===== 6 */}
        {/* import your reactCountdwnClock inside of container */}
        {/* Documentation: https://www.npmjs.com/package/react-countdown-clock */}
        <div className="animation-container">
          <ReactCountdownClock
            // ==== 6.1
            // set state for seconds
            seconds={this.state.seconds}
            // ==== 6.1

            // ==== 6.3
            // set state for boolean. see documentation: https://www.npmjs.com/package/react-countdown-clock
            paused={this.state.pause}
            // ==== 6.3

            // ==== 6.5
            // create state for pauseTxt
            pausedText={this.state.pauseTxt}
            // ==== 6.5

            // ==== 6.7
            // create a function for when timer hits onComplete called breakOver
            onComplete={this.breakOver}
            // ==== 6.7

            // ==== 6.12
            // set the styles for component
            color="#FF9F1C"
            alpha={0.9}
            size={200}
            weight={5}
            // ==== 6.13
            // set whether timer has milisoconds when down to 10 seconds and lower
            showMilliseconds={false}
          />
        </div>
        {/* ===== 6.0 */}

        {/* 7.0 */}
        {/* create container all-buttons */}
        <div className="all-buttons">
          {/* 7.1 */}
          {/* create container top-buttons */}
          <div className="top-buttons">
            {/* ==== 8.0 */}
            {/* create selection and set the state in changeTime functions */}
            <p className="selection">{this.state.selection}</p>
            {/* ==== 8.0 */}
            {/* ==== 6.11 */}
            <div id="dateComponent" className="be-back" />
            <p className="break-over">{this.state.break}</p>
            {/* ==== 6.11 */}
            {/* 7.2 */}
            {/* create container button-container */}
            <div className="button-container">
              <button id="oneHourBtn">1 hour</button>

              <button id="fifteenBtn">15 min</button>
            </div>
            <select onChange={this.onChange}>
              <option value="buzzer">Buzzer</option>
              <option value="austin-powers">Austin Powers</option>
              <option value="whistle">Death Whistle</option>
              <option value="final-countdown">Final Countdown</option>
              <option value="monty-python">Monty Python</option>
              <option value="piano">Piano</option>
              <option value="r2">R2-D2</option>
              <option value="train">Train Crossing</option>
              <option value="tina">Tina</option>
            </select>
            <audio className="audio-element">
              <source src={this.state.ring} />
            </audio>

            {/* <select id="custom">{this.customizeIt}</select> */}
            {/* 7.2 */}
          </div>
          {/* 9.0 */}
          {/* create a container controll-panel */}
          <div className="control-panel">
            {/* 9.1 */}
            {/* create pause button for the left side of the panel*/}
            {/* create an onClick and create a pauseIt function */}
            <button className="pause" type="submit" onClick={this.pauseIt}>
              ||
            </button>
            {/* 9.3 */}
            {/* create container controls for the right side*/}
            <div className="controls">
              {/* 9.4 */}
              {/* create a resume button and onClick with function unpauseIt */}
              <button className="resume" type="submit" onClick={this.unpauseIt}>
                Resume
              </button>
              {/* 9.6 */}
              {/* create a reset button and onClick with function reset */}
              <button className="reset" type="submit" onClick={this.reset}>
                Reset
              </button>
              {/* 10.0 */}
              {/* Now we can set our audio for when the timer hits onComplete. */}
              {/* it doesn't matter too much where you put this audio because you can't see it */}

              {/* 10.0*/}
              {/* 9.0 */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
