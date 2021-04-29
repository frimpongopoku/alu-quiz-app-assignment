import React, { Component } from "react";
import { NumToAlpha } from "../db/keys";
import { ANSWER_TYPES } from "../db/questions-db";

export default class DisplayMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      textEntry: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({ textEntry: e.target.value });
    this.handleOnItemSelected(e.target.value);
  };
  createDisplayForTextEntryAnswers() {
    // const { questions } = this.propÏs;
    return (
      <textarea
        placeholder="#Write your css here..."
        className="text-entry-box"
        onChange={this.handleOnChange}
      ></textarea>
    );
  }
  pushAnswerToState(key, answer) {
    const { selected } = this.state;
    if (selected && selected.key === key) {
      this.setState({
        selected: null,
      });
      this.handleOnItemSelected(null);
    } else {
      this.setState({ selected: { ans: answer, key } });
      this.handleOnItemSelected({ ans: answer, key });
    }
  }
  createDisplayForSingleQuestion() {
    const { question, answers } = this.props;
    const { key } = question;
    return answers.map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = key + "->" + letter;
      return (
        <p
          className={`one-answer ${
            this.answerIsSelected(id) ? `chosen-answer-active` : ""
          }`}
          key={index.toString()}
          onClick={() => this.pushAnswerToState(id, answer)}
        >
          <b>{letter}.</b> The {index + 1} option is this first one, what do you
          think
        </p>
      );
    });
  }

  pushMultipleAnswersToState(key, answer) {
    var { selected } = this.state;
    selected = selected || [];
    const found = selected.filter((ans) => ans.key === key);
    if (found.length > 0) {
      const rem = selected.filter((ans) => ans.key !== key);
      this.setState({ selected: rem });
      this.handleOnItemSelected(selected);
    } else {
      selected.push({ ans: answer, key });
      this.setState({ selected });
      this.handleOnItemSelected(selected);
    }
  }

  answerIsSelected(answerKey) {
    const { type } = this.props;
    const selected = this.state.selected || [];
    if (type === ANSWER_TYPES.SINGLE) {
      return answerKey === selected.key;
    }
    const isIn = selected.filter((ans) => ans.key === answerKey);
    return !!isIn.length;
  }
  createDisplayForMultipleAnswerQuestion() {
    const { question, answers } = this.props;
    return (answers || []).map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = question.key + "->" + letter;
      return (
        <p
          className={`one-answer ${
            this.answerIsSelected(id) ? `chosen-answer-active` : ""
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
    const { onAnswered } = this.props;
    if (!onAnswered) return;
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
