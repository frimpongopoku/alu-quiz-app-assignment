const ANSWER_TYPES = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
  DRAG_AND_DROP: "DRAG AND DROP",
  TEXT_ENTRY: "TEXT ENTRY",
};

const questions = [
  {
    topic: "Some nice question topic in css here",
    type: ANSWER_TYPES.MULTIPLE,
    question: "What is the name of your favorite pet?",
    possibleAnswers: {
      settings: { special: true, style: {} },
      options: [
        {
          letter: "A",
          text:
            "This is an option, this is another question, what do you think",
          isAnswer: true,
        },
        {
          letter: "B",
          text:
            "This is an option, this is another question, what do you think",
          isAnswer: true,
        },
        {
          letter: "C",
          text:
            "This is an option, this is another question, what do you think",
          isAnswer: false,
        },
        {
          letter: "D",
          text:
            "This is an option, this is another question, what do you think",
          isAnswer: false,
        },
      ],
    },
  },
];
