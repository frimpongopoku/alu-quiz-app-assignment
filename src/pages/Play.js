import {
  faCheckCircle,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
// import Confetti from "react-confetti";
import { NumToAlpha } from "../db/keys";
import { ANSWER_TYPES, questions } from "../db/questions-db";
import DisplayMaker from "../factory/DisplayMaker";
import CompletionPage from "./CompletionPage";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: questions[0],
      questionReported: false,
      reportError: false,
      complete: false,
      points:0, // player's points earned over the entire quiz
      playerSheet:[]
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  renderPossibleAnswers() {
    const { currentQuestion } = this.state;
    return currentQuestion.possibleAnswers.options.map((ans, index) => {
      return (
        <p className="one-answer multi-chosen-answer" key={index.toString()}>
          <b>{NumToAlpha(index)}.</b> {ans.text}
        </p>
      );
    });
  }
  getQuestionButtonClasses(key) {
    const { currentQuestion, playerSheet } = this.state;
    var classes = "";
    if (currentQuestion.key === key) classes += " q-in-motion";
    const foundInAnswered = playerSheet.filter(obj => obj.question.key === key); 
    if(foundInAnswered && foundInAnswered.length >0) classes +=" q-compeleted"
    return classes;
  }
  renderQuestions() {
    const { questions } = this.state;
    return questions.map((Q, index) => {
      return (
        <div
          className={`q-default one-question ${this.getQuestionButtonClasses(
            Q.key
          )}`}
          key={index.toString()}
        >
          <p>Question {index + 1}</p>
        </div>
      );
    });
  }

  renderQuestionTitle() {
    const question = this.state.currentQuestion;
    if (!question) return <span>...</span>;

    if (question.settings.hasHTML)
      return (
        <h1
          className="question"
          dangerouslySetInnerHTML={{ __html: question.title }}
        ></h1>
      );

    return <h1 className="question">{question.title}</h1>;
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
    const { questionReported, reportError, complete } = this.state;

    return (
      <div>
        {complete && <CompletionPage />}
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
              {this.renderQuestionTitle()}

              {/* {this.renderPossibleAnswers()} */}

              <DisplayMaker
                answers={
                  this.state.currentQuestion &&
                  this.state.currentQuestion.possibleAnswers.options
                }
                question={this.state.currentQuestion}
                type={ANSWER_TYPES.MULTIPLE}
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
                      style={{
                        width: "100%",
                        textAlign: "left",
                        color: "grey",
                      }}
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
                      style={{
                        fontSize: 14,
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Your report has been sent to us, you will hear from us in
                      3 business days
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
                <button
                  className="send-btn"
                  onClick={() => this.submitReport()}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
