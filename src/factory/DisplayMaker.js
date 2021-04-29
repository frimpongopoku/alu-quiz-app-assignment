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
    this.setState({ textEntry: e.target.value });
    this.handleOnItemSelected(e.target.value);
  };

  createDisplayForTextEntryAnswers() {
    return (
      <textarea
        placeholder="#Write your css here..."
        className="text-entry-box"
        onChange={this.handleOnChange}
      ></textarea>
    );
  }

  // sameQuestion() {
  //   const { selected, multiSelected } = this.state;
  //   if (this.props.type === ANSWER_TYPES.SINGLE) {
  //     if (!selected) return true;
  //     else {
  //       const key = selected.key.split("->")[0];
  //       return this.props.question.key === key;
  //     }
  //   } else if (this.props.type === ANSWER_TYPES.MULTIPLE) {
  //     if (!multiSelected || multiSelected.length === 0) return true;
  //     else {
  //       const one = multiSelected[0];
  //       return one.key.split("->")[0] === this.props.question.key;
  //     }
  //   }
  //   return false;
  // }

  pushAnswerToState(key, answer) {
    const { selected } = this.state;
    // const isTheSameQuestion = this.sameQuestion();
    if (selected && selected.key === key) {
      // answer has already been clicked before, user wants to remove it
      this.setState({
        selected: null,
      });
      this.handleOnItemSelected(null);
    } else {
      // user is now choosing an answer
      this.setState({ selected: { ans: answer, key } });
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
    var selected = this.props.chosenAnswer || [];
    const obj = { ans: answer, key };
    const found = selected.filter((ans) => ans.key === key);
    if (found.length > 0) {
      // if answer has already been selected, remove from the list of selected
      const rem = selected.filter((ans) => ans.key !== key);
      this.setState({ multiSelected: rem });
      this.handleOnItemSelected(rem);
    } else {
      // answer has not been selected, so go ahead and add
      let ready = [...selected, obj];
      this.setState({ multiSelected: ready });
      this.handleOnItemSelected(ready);
    }
  }

  answerIsSelected(answerKey) {
    const { type } = this.props;
    const selected = this.props.chosenAnswer;
    // const multi = this.state.multiSelected || [];
    if (type === ANSWER_TYPES.SINGLE) {
      return !selected ? false : selected.key === answerKey;
    } else if (type === ANSWER_TYPES.MULTIPLE) {
      const isIn = selected && selected.filter((ans) => ans.key === answerKey);
      return selected && !!isIn.length;
    }
  }

  reviewAnswerAndGetProps(id, answer) {
    const { reviewMode } = this.props;
    const ansIsSelected = this.answerIsSelected(id);
    if (reviewMode && ansIsSelected && !answer.isAnswer)
      return "chosen-answer-wrong";
    if (!reviewMode && ansIsSelected) return "chosen-answer-active";
  }

  createDisplayForMultipleAnswerQuestion() {
    const { question, answers, reviewMode } = this.props;
    return (answers || []).map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = question.key + "->" + letter;
      // const _class = reviewMode && this.answerIsSelected ? answer.isAnswer
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
