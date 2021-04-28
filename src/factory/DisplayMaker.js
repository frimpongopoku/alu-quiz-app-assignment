import React, { Component } from "react";
import { NumToAlpha } from "../db/keys";
import { ANSWER_TYPES } from "../db/questions-db";

export default class DisplayMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  createDisplayForSingleQuestion() {
    // const {} = this.props;
  }

  pushMultipleAnswersToState(key, answer) {
    // console.log("I know I have been clicked bro, me I do know that", key, answer);
    var { selected } = this.state;
    selected = selected || [];
    const found = selected.filter((ans) => ans.key === key);
    if (found.length > 0) {
      console.log("I was found");
      const rem = selected.filter((ans) => ans.key !== key);
      this.setState({ selected: rem });
    } else {
      console.log("was not found");
      selected.push({ ans: answer, key });
      this.setState({ selected });
    }
  }

  answerIsSelected(answerKey) {
    const selected = this.state.selected || [];
    const isIn = selected.filter((ans) => ans.key === answerKey);
    return !!isIn.length;
  }
  createDisplayForMultipleAnswerQuestion() {
    const { question, answers } = this.props;
    const { key } = question;
    return answers.map((answer, index) => {
      const letter = NumToAlpha(index);
      const id = key + "->" + letter;
      return (
        <p
          className={`one-answer ${
            this.answerIsSelected(id) ? `multi-chosen-answer` : ""
          }`}
          key={index.toString()}
          onClick={() => this.pushMultipleAnswersToState(id, answer)}
        >
          <b>{letter}.</b> The {index + 1} option is this first one, what do you
          think
        </p>
      );
    });
  }
  renderContent() {
    const { type } = this.props;
    switch (type) {
      case ANSWER_TYPES.MULTIPLE:
        return this.createDisplayForMultipleAnswerQuestion();
      case ANSWER_TYPES.SINGLE:
        return <i></i>;
      case ANSWER_TYPES.TEXT_ENTRY:
        return <i></i>;
      default:
        return <p>.... Uknown ...</p>;
    }
  }
  render() {
    console.log(" iam the answers", this.state.selected);
    return <div>{this.renderContent()} </div>;
  }
}
