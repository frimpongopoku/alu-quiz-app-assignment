import {
  faCheckCircle,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { NumToAlpha } from "../db/keys";
import { ANSWER_TYPES } from "../db/questions-db";
import DisplayMaker from "../factory/DisplayMaker";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionReported: false,
      reportError: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  renderPossibleAnswers() {
    return [2, 3, 5, 6].map((item, index) => {
      return (
        <p className="one-answer multi-chosen-answer" key={index.toString()}>
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

  submitReport() {
    const { messageBody, email } = this.state;
    if (!messageBody || !email) return this.setState({ reportError: true });
    this.setState({ reportError: false, questionReported: true });
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { questionReported, reportError } = this.state;
    return (
      <div className="" style={{ margin: "0px 10%", paddingTop: "6%" }}>
        {/* ---------------------------------------------  CSS TOPIC ---------------------------------------------- */}
        <center>
          <h1>CSS FOUNDATIONS AND OTHER BLUH BLUH</h1>
          <br />
        </center>
        <div className="top-line"></div>
        <br />
        {/* -------------------------------  QUESTION SIDEBAR WITH PROFILE ---------------------------------------- */}
        <div className="row" style={{ marginTop: 15 }}>
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

          {/* -----------------------------------------  MAIN QUESTION AREA ------------------------------------------ */}
          <div className="col-md-7 col-lg-7 col-sm-6 col-xs-12">
            <h1 className="question">
              This is a very deep question that is being asked...? Do you
              understand what I am saying? It is quite deep, please answer?
            </h1>

            {/* {this.renderPossibleAnswers()} */}

            <DisplayMaker
              answers={[3, 4, 5, 6]}
              question={{ key: "kerekjsdf" }}
              type={ANSWER_TYPES.SINGLE}
            />
            <div className="bottom-directions" style={{ marginTop: 20 }}>
              <center>
                <button className="round-btns lift-slightly">
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </button>
                <button className="round-btns lift-slightly">
                  <FontAwesomeIcon icon={faLongArrowAltRight} />
                </button>
              </center>
            </div>
          </div>

          {/* --------------------------------------  CONTACT US SIDEBAR -------------------------------------------- */}
          <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <div className="custom-card contact-us-box lift-slightly">
              <h3>Report A Question</h3>
              {!questionReported && (
                <div>
                  <small style={{ margin: "8px 0px" }}>
                    <b>QUESTION 1</b>
                  </small>
                  <input
                    type="email"
                    className="email-box remove-outline"
                    placeholder="Enter email..."
                    onChange={this.handleOnChange}
                    name="email"
                  />
                  <br />
                  <p
                    style={{ width: "100%", textAlign: "left", color: "grey" }}
                  >
                    What is wrong?
                  </p>
                  <textarea
                    name="messageBody"
                    onChange={this.handleOnChange}
                    className="textarea remove-outline"
                    rows="10"
                  ></textarea>
                </div>
              )}
              {questionReported && (
                <center>
                  <p
                    style={{ fontSize: 14, color: "green", fontWeight: "bold" }}
                  >
                    Your report has been sent to us, you will hear from us in 3
                    business days
                  </p>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ fontSize: 50 }}
                    color="green"
                  />
                </center>
              )}

              {reportError && (
                <p style={{ color: "maroon" }}>
                  Please fill out all appropriate fields
                </p>
              )}
              <button className="send-btn" onClick={() => this.submitReport()}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
