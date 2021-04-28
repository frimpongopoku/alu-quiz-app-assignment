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
   * The @validateSingleType function is used to validate questions that expect a single
   * answer from player
   * Things To Note:
   * ----------------
   * In a single-answer-question, the answer is expected to come as an object.
   * How it works
   * -------------
   * Every answer object has an @isAnswer (a @boolean ) field which is used to verify if the chosen answer is right
   *
   * @return @Boolean that represents the state of use's answer
   *
   */
  validateSingleType() {
    this.answer.isAnswer;
  }

  /**
   * The @validateMultipleAnswerQuestion function is used to validate questions that expect multiple answers from players
   * Things To Note:
   * ----------------
   * In a multiple-answer-question, the answer is expected to come in an array -- an array of objects.
   * How it works:
   * --------------
   * Obtain the number of expected answers from the question object (A numerical value)
   * Loop over array of the answers that were provided by the player
   * There are a few things that can happen when we loop over the answers:
   * Case 1:
   * A player manages to choose all the correct answers
   * Case 2:
   * A player manages to get some answers right, and others wrong
   * Case 3:
   * A player chooses only wrong answers
   * How is it known if an answer is right or not?
   * ----------------------------------------------
   * All answer objects come with a field @isAnswer (a @boolean ) that indicates whether or not the answer is right
   * Hence while going over each answer the user provided, we just need to verify by the field if @isAnswer
   * If the answer is right? push the current answer object that the loop cursor is on, into an array called @correct
   * If the answer is wrong? Push the current answer object that the loop cursor is on, into an array called @wrong
   * The @correct and @wrong arrays will later be used in a part of the UI to inform the player of which answers they got right or wrong
   * How points are determined for a multiple-answer-question?
   * ---------------------------------------------------------
   * Things To Note:
   * Every multiple-answer-question object comes with a @possibleAnswers field that is also an object.
   * This  object contains another field named @expected that indicates how many correct answers are expected.
   * With this, we can easily determine how many points were obtained by doing the following
   *
   * To obtain the points for all cases:
   * ---------------------------------------
   *  let a = number of items in the correct answer, b = expected number of answers, p = the total number of @points [Provided by question object] that can be obtained by fully answering the question.
   * Hence total points earned by user = (a/b) * p
   * Now @return an object with fields
   * @status : which is a direct relationship of the number of points earned in boolean,
   * @correct : which is the array of all choses correct answers by player ( to be used later)
   * @wrong : an array of all wrong answers chosen by player ( to be used later )
   * --------------------------------------
   * NB: Getting some and not all the answers right still gives a validation of "true" in the @status field
   */
  validateMultipleAnswerQuestion() {
    const { possibleAnswers, points } = this.question.possibleAnswers;
    const answers = this.answer || [];
    const correct,
      wrong = [];
    answers.forEach((ans) => {
      if (ans.isAnswer) correct.push(ans);
      else wrong.push(ans);
    });
    var pointsEarned = (correct.length / possibleAnswers.expected) * points;
    return { status: !!pointsEarned, correct, wrong };
  }
}
