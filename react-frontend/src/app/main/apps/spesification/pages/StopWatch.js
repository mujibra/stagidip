/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
import { Component } from 'react';
// import './StopWatch.css';

export default class StopWatch extends Component {
  state = {
    isRunning: false,
    hh: 0,
    mm: 0,
    ss: 0,
    ms: 0,
  };

  timerID = 0;

  clickHandler = () => {
    const { isRunning } = this.state;
    if (isRunning) {
      // Running => Stop
      clearInterval(this.timerID);
    } else {
      // Stop => Running
      let { hh, mm, ss, ms } = this.state;

      this.timerID = setInterval(() => {
        ms++;
        if (ms >= 100) {
          ss++;
          ms = 0;
        }
        if (ss >= 60) {
          mm++;
          ss = 0;
        }
        if (mm >= 60) {
          hh++;
          mm = 0;
        }
        this.setState({ hh, mm, ss, ms });
        // console.log("Dataasx", this.state);
      }, 10);
    }
    this.setState({ isRunning: !isRunning });

    const time_todo = `${this.format(this.state.hh)}:${this.format(this.state.mm)}:${this.format(
      this.state.ss
    )}`;
    localStorage.setItem('time_todo', JSON.stringify(time_todo));
  };

  // 1 => 01
  format(num) {
    return `${num}`.length === 1 ? `0${num}` : `${num}`;
  }

  render() {
    return (
      <div className="stop-watch">
        <div>
          <span>{this.format(this.state.hh)}</span>:<span>{this.format(this.state.mm)}</span>:
          <span>{this.format(this.state.ss)}</span>:<span>{this.format(this.state.ms)}</span>
        </div>
        <button className="control" onClick={this.clickHandler}>
          {this.state.isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
