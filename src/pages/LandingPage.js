import React, { Component } from "react";
import "./../App.css";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="c-container">
        <div className="up-div">
          <h1>WELCOME TO PURPLE GAMES</h1>
          <h3>
            Think you are a CSS champion? <br /> Lets Find Out!
          </h3>
        </div>

        {/* <div className="circle lift"></div> */}
        <div className="name-area lift">
          <h3>TYPE YOUR FULL NAME IN THE BOX BELOW</h3>
          <input className="name-box" placeholder="Enter name..." />
          <button className="go-btn">Go</button>
        </div>
        <div className="down-div"></div>
      </div>
    );
  }
}
