import React, { Component } from "react";
import { NumToAlpha } from "../db/keys";
import { ANSWER_TYPES } from "../db/questions-db";

export default class DisplayMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      multiSelected: [],
      textEntry: "",
    };
  }

  handleOnChange = (e) => {
    this.handleOnItemSelected(e.target.value);
  };

  createDisplayForTextEntryAnswers() {
    return (
      <textarea
        placeholder="#Write your css here..."
        className="text-entry-box"
        onChange={this.handleOnChange}
      >
        {this.props.chosenAnswer}
      </textarea>
    );
  }


  pushAnswerToState(key, answer) {
    const { selected } = this.state;
    if (selected && selected.key === key) {
      // answer has already been clicked before, user wants to remove it
      this.handleOnItemSelected(null);
    } else {
      // user is now choosing an answer
      this.handleOnItemSelected({ ans: answer, key });
    }
  }

  createDisplayForSingleQuestion() {
    const { question, answers, reviewMode } = this.props;
    return answers.map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = question.key + "->" + letter;
      return (
        <p
          className={`one-answer ${this.reviewAnswerAndGetProps(id, answer)} ${
            reviewMode && answer.isAnswer ? `chosen-answer-right` : ""
          }`}
          key={index.toString()}
          onClick={() => this.pushAnswerToState(id, answer)}
        >
          <b>{letter}.</b> {answer.text}
        </p>
      );
    });
  }

  pushMultipleAnswersToState(key, answer) {
     // gives an array of the answers a user chose for the multiple choice question if available,other wise, resort to an empty array
    var selected = this.props.chosenAnswer || [];
    const obj = { ans: answer, key };
    // check if the current answer a user has selected is already part of what they have selected previously, if it is, it probably means they want to unselect
    const found = selected.filter((ans) => ans.key === key); 
    if (found.length > 0) {
      // if answer has already been selected, remove from the list of selected
      const rem = selected.filter((ans) => ans.key !== key);
      // now submit the remaining list without the answer a
      this.handleOnItemSelected(rem);
    } else {
      // answer has not been selected, so go ahead and add
      let ready = [...selected, obj];
      this.handleOnItemSelected(ready);
    }
  }

  answerIsSelected(answerKey) {
    // expects answerkey which is collected while looping over possible answers
    const { type } = this.props;
    // get the value of the answer a user chose
    const selected = this.props.chosenAnswer; 
    // const multi = this.state.multiSelected || [];
      // map the key of the current possible answer against the answer a user has chosen for the current question and see 
      // if it matches, return true else : false
    if (type === ANSWER_TYPES.SINGLE) {
      return !selected ? false : selected.key === answerKey;
    } else if (type === ANSWER_TYPES.MULTIPLE) {
      const isIn = selected && selected.filter((ans) => ans.key === answerKey);
      return selected && !!isIn.length;
    }
  }

  /**
   * 
   * The function determines what css propreties are fit for particular scenario of a possible answer 
   * being displayed under a question
   * @param {*} id 
   * @param {*} answer 
   * @returns 
   */
  reviewAnswerAndGetProps(id, answer) {
    const { reviewMode } = this.props; 
    const ansIsSelected = this.answerIsSelected(id);
    // if review mode is active, and the user chose the current answer in the loop and it turns out 
    // the answer is not right, apply a css class 
    if (reviewMode && ansIsSelected && !answer.isAnswer)
      return "chosen-answer-wrong";

      //If its not in review mode, just apply appropriate classes if the current possible answer in the loop is selected
    if (!reviewMode && ansIsSelected) return "chosen-answer-active";
  }

  createDisplayForMultipleAnswerQuestion() {
    const { question, answers, reviewMode } = this.props;
    return (answers || []).map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = question.key + "->" + letter;
      return (
        <p
          className={`one-answer ${this.reviewAnswerAndGetProps(id, answer)} ${
            reviewMode && answer.isAnswer ? `chosen-answer-right` : ""
          }`}
          key={index.toString()}
          onClick={() => this.pushMultipleAnswersToState(id, answer)}
        >
          <b>{letter}.</b> {answer.text}
        </p>
      );
    });
  }

  handleOnItemSelected = (data) => {
    const { onAnswered, reviewMode } = this.props;
    if (!onAnswered || reviewMode) return; 
    onAnswered(data);
  };

  /**
   * 
   * This is the main pivot function that uses the type of question to run the appropriate functions
   * @returns 
   */
  renderContent() {
    const { type } = this.props;
    switch (type) {
      case ANSWER_TYPES.MULTIPLE:
        return this.createDisplayForMultipleAnswerQuestion();
      case ANSWER_TYPES.SINGLE:
        return this.createDisplayForSingleQuestion();
      case ANSWER_TYPES.TEXT_ENTRY:
        return this.createDisplayForTextEntryAnswers();
      default:
        return <p>.... Uknown ...</p>;
    }
  }
  render() {
    return <div>{this.renderContent()} </div>;
  }
}
