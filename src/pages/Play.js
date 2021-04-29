import {
  faCheckCircle,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { questions } from "../db/questions-db";
import DisplayMaker from "../factory/DisplayMaker";
import CompletionPage from "./CompletionPage";
import Validator from "./../factory/Validator";
const FORWARD = "FORWARD";
const BACK = "BACK";
export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: questions[0],
      currentQuestionIndex: 0,
      questionReported: false,
      reportError: false,
      complete: false,
      points: 0, // player's points earned over the entire quiz
      playerSheet: [],
      reviewMode: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.moveToQuestion = this.moveToQuestion.bind(this);
    this.onAnswered = this.onAnswered.bind(this);
    this.toggleReviewMode = this.toggleReviewMode.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(val) {
    this.setState({ complete: val });
  }
  getQuestionButtonClasses(key) {
    const { currentQuestion } = this.state;
    var classes = "";
    if (currentQuestion.key === key) classes += " q-in-motion";
    // const foundInAnswered = playerSheet.filter(
    //   (obj) => obj.question.key === key
    // );
    // if (foundInAnswered && foundInAnswered.length > 0)
    //   classes += " q-compeleted";
    return classes;
  }
  renderQuestions() {
    const { questions } = this.state;
    return questions.map((Q, index) => {
      return (
        <div
          className={`q-default one-question  ${this.getQuestionButtonClasses(
            Q.key
          )}`}
          key={index.toString()}
          onClick={() => this.moveToQuestion(index, null)}
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

  showFootItems() {
    const { playerSheet, questions, reviewMode, currentQuestion } = this.state;

    if (reviewMode) {
      const queInView = this.getPlayersChosenAnswersForQuestion();
      return (
        <>
          <center>
            <h4>
              <b>
                {Number(queInView.pointsEarned)} /{" "}
                {Number(queInView.question.points)}
              </b>
            </h4>
          </center>
          <h4
            style={{
              fontWeight: "bold",
              color: "green",
              textDecoration: "underline",
            }}
          >
            FEEDBACK
          </h4>
          <p className="feedback">{currentQuestion.possibleAnswers.feedback}</p>
        </>
      );
    }
    if (playerSheet.length === questions.length) {
      return (
        <button
          className="finish-btn"
          onClick={() => this.setState({ complete: true })}
        >
          Finsh, See My Result
        </button>
      );
    }

    return (
      <center>
        <button
          className="round-btns lift-slightly"
          onClick={() => this.moveToQuestion(null, BACK)}
        >
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
        <button
          className="round-btns lift-slightly"
          onClick={() => this.moveToQuestion(null, FORWARD)}
        >
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </button>
      </center>
    );
  }

  setNewQuestion(index, question) {
    this.setState({ currentQuestion: question, currentQuestionIndex: index });
  }
  moveToQuestion(index, direction) {
    const { currentQuestionIndex } = this.state;
    if (!direction)
      return this.setNewQuestion(index, this.state.questions[index]);
    var ind;
    if (direction === FORWARD) {
      ind = currentQuestionIndex + 1;
      if (ind < this.state.questions.length)
        this.setNewQuestion(ind, this.state.questions[ind]);
    } else if (direction === BACK) {
      ind = currentQuestionIndex - 1;
      if (currentQuestionIndex > 0)
        this.setNewQuestion(ind, this.state.questions[ind]);
    }
  }

  onAnswered(data) {
    if (!data) return;
    const { currentQuestion } = this.state;

    var points = this.state.points;
    const validator = new Validator(currentQuestion, data);
    const answerState = validator.answerIsCorrect();
    // if (currentQuestion.type === ANSWER_TYPES.TEXT_ENTRY){
    //   this.handleEntryValidation(data, answerState);
    //   return;
    // }

    const playerAnswerObj = {
      // create object that is going to contain the player's answer , the question, whether they were right or wrong, and how many points they earned from the validator
      wasRight: answerState.status,
      question: currentQuestion,
      questionKey: currentQuestion.key,
      answer: data,
      pointsEarned: answerState.points,
      wrong: answerState.wrong,
      correct: answerState.correct,
    };
    var alreadyAnsweredQuestions = this.state.playerSheet || [];
    var currentQuestionHasBeenAnsweredBefore = alreadyAnsweredQuestions.filter(
      (ansObj) => ansObj.questionKey === currentQuestion.key
    );
    if (
      currentQuestionHasBeenAnsweredBefore &&
      currentQuestionHasBeenAnsweredBefore.length > 0
    ) {
      points -= currentQuestionHasBeenAnsweredBefore.points;
      const rem = alreadyAnsweredQuestions.filter(
        (ansObj) => ansObj.questionKey !== currentQuestion.key
      );
      this.setState({ points, playerSheet: [...rem, playerAnswerObj] });
      return;
    }
    if (answerState.status === true) points += points;
    this.setState({
      points,
      playerSheet: [...alreadyAnsweredQuestions, playerAnswerObj],
    });
  }

  getPlayersChosenAnswersForQuestion() {
    const { currentQuestion, playerSheet } = this.state;
    const found = playerSheet.filter(
      (recordedAnswers) => recordedAnswers.questionKey === currentQuestion.key
    );
    return found[0] || {};
  }
  toggleReviewMode(val) {
    this.setState({ reviewMode: val });
  }
  render() {
    const {
      questionReported,
      reportError,
      complete,
      currentQuestion,
    } = this.state;

    return (
      <div>
        {complete && (
          <CompletionPage
            sheet={this.state.playerSheet}
            toggleReviewMode={this.toggleReviewMode}
            toggleModal={this.toggleModal}
          />
        )}
        <div className="" style={{ margin: "0px 10%", paddingTop: "6%" }}>
          {/* ---------------------------------------------  CSS TOPIC ---------------------------------------------- */}
          <center>
            <h1>{currentQuestion && currentQuestion.topic.title}</h1>
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
                <center>
                  {this.renderQuestions()}
                  {this.state.reviewMode && (
                    <button
                      style={{ width: "100%" }}
                      className="review-work-btn"
                      onClick={() => this.setState({ complete: true })}
                    >
                      SEE SCORE
                    </button>
                  )}
                </center>
              </div>
            </div>

            {/* -----------------------------------------  MAIN QUESTION AREA ------------------------------------------ */}
            <div className="col-md-7 col-lg-7 col-sm-6 col-xs-12">
              {this.renderQuestionTitle()}
              {/* {this.renderPossibleAnswers()} */}

              <DisplayMaker
                answers={
                  currentQuestion && currentQuestion.possibleAnswers.options
                }
                question={currentQuestion}
                type={currentQuestion.type}
                onAnswered={this.onAnswered}
                chosenAnswer={this.getPlayersChosenAnswersForQuestion().answer}
                reviewMode={this.state.reviewMode}
              />

              <div className="bottom-directions" style={{ marginTop: 20 }}>
                {this.showFootItems()}
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
