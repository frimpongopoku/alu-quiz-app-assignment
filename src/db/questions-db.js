export const ANSWER_TYPES = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
  DRAG_AND_DROP: "DRAG AND DROP",
  TEXT_ENTRY: "TEXT ENTRY",
};

export const questions = [
  {
    topic: { title : "POSITIONING", resources:"www.w3schools.com"},
    type: ANSWER_TYPES.MULTIPLE,
    points: 10,
    question: "What is the name of your favorite pet?",
    possibleAnswers: {
      expected: 2,
      settings: { special: false, style: {} },
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
  {
    topic:{ title : "TARGETTING", resources:"www.w3schools.com"},
    type: ANSWER_TYPES.SINGLE,
    points: 5,
    question: "What is the name of your favorite pet?",
    possibleAnswers: {
      settings: { special: false, style: {} },
      options: [
        {
          letter: "A",
          text:
            "This is an option, this is another question, what do you think",
          isAnswer: false,
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
  {
    topic: { title : "COLORS", resources:"www.w3schools.com"},
    type: ANSWER_TYPES.TEXT_ENTRY,
    points: 10,
    question: "What is the name of your favorite pet?",
    possibleAnswers: {
      settings: { special: true, style: {} },
      correctAnswer: "#nameOfClass{background:white;}"
    },
  },
];
