import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { NumToAlpha } from "../db/keys";

export default class Play extends Component {
  renderPossibleAnswers() {
    return [2, 3, 5, 6].map((item, index) => {
      return (
        <p className="one-answer" key={index.toString()}>
          <b>{NumToAlpha(index)}.</b> The {index + 1} option is this first one,
          what do you think
        </p>
      );
    });
  }
  renderQuestions() {
    return [0, 1, 2, 3, 3, 5].map((item, index) => {
      return (
        <div className="one-question q-completed" key={index.toString()}>
          <p>Question {index + 1}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="" style={{ margin: "0px 10%", paddingTop: "10%" }}>
        <FontAwesomeIcon
          icon={faClock}
          style={{ fontSize: "1.5rem", color: "#e49400" }}
        />
        <div className="timer-progress-bar"></div>
        <br />
        <div className="row">
          <div
            className="col-md-2 col-lg-2 col-sm-6 col-xs-12"
            style={{ padding: 10 }}
          >
            <div className="custom-card lift-slightly">
              <img
                className="user-profile-photo lift-slightly"
                alt="user's profile"
                src="https://i.pravatar.cc/200"
              />

              <p>Frimpong O. Agyemang</p>
            </div>
            <div className="all-questions-content" style={{ marginTop: 10 }}>
              <center>{this.renderQuestions()}</center>
            </div>
          </div>
          <div className="col-md-7 col-lg-7 col-sm-6 col-xs-12">
            <h1 className="question">
              This is a very deep question that is being asked...? Do you
              understand what I am saying? It is quite deep, please answer?
            </h1>

            {this.renderPossibleAnswers()}
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <div className="custom-card contact-us-box lift-slightly">
              <h3>Report A Question</h3>
              <small style={{ margin: "8px 0px" }}>
                <b>QUESTION 1</b>
              </small>
              <input
                type="email"
                className="email-box remove-outline"
                placeholder="Enter email..."
              />
              <br />
              <p style={{ width: "100%", textAlign: "left", color: "grey" }}>
                What is wrong?
              </p>
              <textarea
                className="textarea remove-outline"
                rows="10"
              ></textarea>
              <button className="send-btn">SEND</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
