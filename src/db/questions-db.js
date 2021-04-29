export const ANSWER_TYPES = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
  DRAG_AND_DROP: "DRAG AND DROP",
  TEXT_ENTRY: "TEXT ENTRY",
};

export const questions = [
  {
    key: "2f3fd958-b047-4e31-a888-a2481e46e0a8",
    topic: {
      title: "CSS SELECTORS",
      resources: "https://www.w3schools.com/css/css_selectors.asp",
    },
    settings: { hasHTML: true },
    type: ANSWER_TYPES.MULTIPLE,
    points: 10,
    title: `Which of the following is an acceptable way of setting a background color of <span style='font-weight:bold; color:red'>red</span> to div in css? Select all that apply.`,
    feedback: "",
    possibleAnswers: {
      expected: 2,
      settings: { hasStyles: false, style: {} },
      options: [
        {
          letter: "A",
          text: "div{ background:red; }",
          isAnswer: true,
        },
        {
          letter: "B",
          text: "div{ 'background':red; }",
          isAnswer: false,
        },
        {
          letter: "C",
          text: ".div{ background:'red'; }",
          isAnswer: false,
        },
        {
          letter: "D",
          text: "div      { background:    red;    }",
          isAnswer: true,
        },
      ],
    },
  },
  // -----------------------------------------------------------------------------------------------------
  {
    key: "bd63ce82-6704-4a8b-a87f-f8a0d4aaf37e",
    topic: {
      title: "CSS SYNTAX FORMAT",
      resources: "https://www.w3schools.com/css/css_syntax.asp",
    },
    settings: { hasHTML: false },
    type: ANSWER_TYPES.SINGLE,
    points: 5,
    title: "Which of the following is the correct format for the CSS?",
    possibleAnswers: {
      feedback:
        "CSS syntax is composed of selector and declaration wherein selector points to the HTML element you want to style. The declaration block contains one or more declarations separated by semicolons.Each declaration includes a CSS property name and a value, separated by a colon and declaration blocks are surrounded by curly braces",
      settings: { hasStyles: true, style: {} },
      options: [
        {
          letter: "A",
          text: "p { color: red, text-align: center; }",
          isAnswer: false,
        },
        {
          letter: "B",
          text: "p {color: red;text-align: center;}",
          isAnswer: true,
        },
        {
          letter: "C",
          text: "p { color -red; text-align -  center; }",
          isAnswer: false,
        },
        {
          letter: "D",
          text: "p { color: red; text-align: center;",
          isAnswer: false,
        },
      ],
    },
  },
  // -----------------------------------------------------------------------------------------------------
  {
    key: "ebd5cb51-8487-4bc2-9303-3ffa8410ac33",
    topic: {
      title: "CSS SELECTORS ID",
      resources: "https://www.w3schools.com/css/css_selectors.asp",
    },
    settings: { hasHTML: false },
    type: ANSWER_TYPES.SINGLE,
    points: 5,
    title:
      "Which of the following examples is the correct way to use CSS ID selector?",
    possibleAnswers: {
      feedback:
        "Hash (#) character is being used to select an element with a specific id. An ID name cannot start with a number",
      settings: { hasStyles: true, style: { whitespace: "pre-wrap" } },
      options: [
        {
          letter: "A",
          text: `#1sen {
              text-align: center;
              color: red;
            }
            `,
          isAnswer: false,
        },
        {
          letter: "B",
          text: `*sen1 {
              text-align: center;
              color: red;
            }
            `,
          isAnswer: true,
        },
        {
          letter: "C",
          text: ` #sen1 {
            text-align: center;
            color: red;
          }
          `,
          isAnswer: false,
        },
        {
          letter: "D",
          text: ` #'sen1' {
            text-align: center;
            color: red;
          }
          `,
          isAnswer: false,
        },
      ],
    },
  },
  // -----------------------------------------------------------------------------------------------------
  {
    key: "838cf1c5-cd30-40a3-bcda-bbbf0bfd57f2",
    topic: {
      title: "CSS MARGINS",
      resources: " https://www.w3schools.com/css/css_margin.asp",
    },
    settings: { hasHTML: false },
    type: ANSWER_TYPES.MULTIPLE,
    points: 10,
    title:
      " Which of the following can be a possible value for margin properties? Select all that apply. ",
    possibleAnswers: {
      expected: 2,
      feedback: "B and D do not exist as values in CSS margin properties.",
      settings: { hasStyles: false, style: {} },
      options: [
        {
          letter: "A",
          text: "auto",
          isAnswer: true,
        },
        {
          letter: "B",
          text: "?",
          isAnswer: true,
        },
        {
          letter: "C",
          text: "%",
          isAnswer: true,
        },
        {
          letter: "D",
          text: "implemement",
          isAnswer: false,
        },
      ],
    },
  },
  // --------------------------------------------------------------------------------------------------------
  {
    key: "57991021-406a-4f34-964e-37c803d7a254",
    topic: {
      title: "CSS PROPERTIES",
      resources:
        "https://stackoverflow.com/questions/4718342/lots-of-dom-hidden-vs-display-none#:~:text=Because%20display%3A%20none%20actually%20removes,but%20they're%20still%20there.",
    },
    settings: { hasHTML: true },
    type: ANSWER_TYPES.TEXT_ENTRY,
    points: 10,
    title: `
        <span style='font-size:30px'>Using the editor provided below, assign a css property to a <b>div</b>
        with a class name <b>kula</b> in order to make disappear, and removed
        from the DOM.</span><br/>
     `,
    possibleAnswers: {
      feedback:
        "If you specify 'display: none', the browser does not take that element into consideration when painting.",
      settings: { hasStyles: false, style: {} },
      correctAnswer: ".kula{display:none;}",
    },
  },
];
