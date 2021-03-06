import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { withRouter } from "react-router";
import "./../App.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCircle: true,
      start: false,
      name: "",
    };
  }

  handleTextBox = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value.trim() });
  };

  readyUpAndStart = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) {
      alert("Please provide a valid name in order to start the game");
      return;
    }
    this.props.history.push({
      pathname: "/play",
      data: { userName: this.state.name },
    });
  };
  render() {
    const { showCircle, start } = this.state;
    return (
      <div className="c-container">
        <div className="up-div">
          <h1>WELCOME TO ORANGE-GAMES</h1>
          <h3>
            Think you are a CSS champion? <br /> Lets Find Out!
          </h3>
        </div>

        {showCircle && (
          <div
            className="circle lift"
            onClick={() => this.setState({ showCircle: false, start: true })}
          ></div>
        )}
        {start && (
          <div className="name-area lift">
            <h3>TYPE YOUR FULL NAME IN THE BOX BELOW</h3>
            <input
              className="name-box"
              placeholder="Enter name..."
              onChange={this.handleTextBox}
            />
            <button className="go-btn" onClick={(e) => this.readyUpAndStart(e)}>
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
          </div>
        )}
        <div className="down-div">
          <div className="content">
            <center>
              <p>
                Orange-Games is a platform that allows you to build on your CSS
                knowledge by answering core css questions that address the
                shortcomings and misunderstandings of Css application in our
                daily lives . Whether you are a beginner or experienced with CSS
                already, there is space for everyone! <br />
                Tap on the START button to get started right away!
              </p>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
