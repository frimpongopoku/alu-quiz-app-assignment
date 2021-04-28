import { ANSWER_TYPES } from "../db/questions-db";

class Validator {
  constructor(question, answer) {
    this.type = question.type;
    this.answer = answer;
    this.question = question;
  }

  answerIsCorrect() {
    const result = {
      question: this.question,
      answer: this.answer,
    };
    switch (this.type) {
      case ANSWER_TYPES.MULTIPLE:
        const status = this.validateMultipleAnswerQuestion();
        return {
          ...result,
          status: status.status,
          points: status.points,
          correct: status.correct,
          wrong: status.wrong,
        };

      case ANSWER_TYPES.TEXT_ENTRY:
        const status = this.validateSingleType();
        return { ...result, status, points: status ? this.points : 0 };
     
      case ANSWER_TYPES.SINGLE:
        break;

      case ANSWER_TYPES.DRAG_AND_DROP:
        break;

      default:
        return result;
    }
  }

  /**
   * The function is used to validate questions that expect a single
   * answer from user
   */
  validateSingleType() {
    return this.answer && this.answer.isAnswer;
  }

  /**
   * The function is used to validate questions that expect a multiple answers from user
   * answer from user
   */
  validateMultipleAnswerQuestion() {
    const { possibleAnswers, points } = this.question.possibleAnswers;
    const answers = this.answer || [];
    const correct,
      wrong = [];
    var pointsEarned = 0;
    answers.forEach((ans) => {
      if (ans.isAnswer) correct.push(ans);
      else wrong.push(ans);
    });

    if (correct.length === possibleAnswers.expected) pointsEarned = points;
    else if (correct.length > 0 && correct.length < possibleAnswers.expected)
      pointsEarned = (correct.length / possibleAnswers.expected) * points;
    else pointsEarned = 0;
    return { status: !!pointsEarned, correct, wrong };
  }
}
