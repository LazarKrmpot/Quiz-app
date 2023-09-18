const questions = [
  {
    question: "What are the various data types that exist in JavaScript",
    answer: "Hyper Text Markup Language",
    options: [
      "Boolean - For true and false values",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
    ],
  },
  {
    question: "What are the features of JavaScript?",
    answer: "Lightweight, interpreted programming language",
    options: [
      "Lightweight, interpreted programming language",
      "Colorful Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    question: "The ' == ' operator compares?",
    answer: "values",
    options: ["values", "types", "Hypertext Preprogramming"],
  },
  {
    question: "What are some of the built-in methods in JavaScript?",
    answer: "Date()",
    options: [
      "Date()",
      "Stylesheet Query Language",
      "Statement Question Language",
    ],
  },
  {
    question: "What is NaN property in JavaScript?",
    answer: "Not-a-Number",
    options: ["Not a nothing", "Not-a-Number", "Extra Multi-Program Language"],
  },
  {
    question: "What are the ways of defining a variable in JavaScript?",
    answer: "Var",
    options: ["Var", "rock", "any"],
  },
  {
    question: "What are JavaScript Data Types?",
    answer: "Number",
    options: ["int", "Number", "matrix"],
  },
  {
    question: "Which company developed JavaScript?",
    answer: "Netscape",
    options: ["Xiaomi", "Microsoft", "Netscape"],
  },
  {
    question: "Which symbol is used for comments in Javascript?",
    answer: "// for Single line comments",
    options: ["...", "---", "// for Single line comments"],
  },
  {
    question: "What are all the looping structures in JavaScript?",
    answer: "for",
    options: ["for", "around", "spin"],
  },
];

// Screens
const WelcomeScreen = document.getElementById("welcome");
const QuizBox = document.getElementById("quiz");
const Results = document.getElementById("results-page");

// Timer
const infoWrapper = document.getElementById("info");
const timerContainer = document.getElementById("timerContainer");
const timerElement = document.getElementById("timer_counter");

// Progress bar
const progresTracker = document.getElementById("progress-tracker");
const progressBar = document.getElementById("progressBar");

// Buttons
const startButton = document.getElementById("btn__start");
const nextButton = document.getElementById("btn__next");
const restartButton = document.getElementById("btn_restart");

// Qustions
const questionCounter = document.getElementById("questions_counter");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");

// Edit Statistics
const secondsLeft = document.getElementById("seconds");
const unQuestions = document.getElementById("unanswered");
const coQuestions = document.getElementById("correct");
const inQuestions = document.getElementById("incorrect");

// Image for statistics
const endImageContainer = document.getElementById("end-image-container");
const endImage = document.getElementById("end-img");

// End message
const resultText = document.getElementById("result-text");

// Current Question
let currentQuestionIndex = 0;

// Statistics
let correctAnswers = 0;
let incorectAnswers = 0;
let remainingTime;
let unansweredQuestions = 0;

// Display how many questions
questionCounter.innerHTML = `${questions.length} QUESTIONS`;

// Hide the restart button on start
restartButton.style.display = "none";

//************ START QUIZ ***************

// Starting the quiz
const startQuiz = () => {
  progresTracker.classList.remove("inactive");
  WelcomeScreen.style.display = "none";
  startButton.classList.add("inactive");
  nextButton.classList.remove("inactive");
  QuizBox.classList.remove("inactive");
  showQuestion(currentQuestionIndex);

  // Start the countdown timer
  startTimer(500); // 500 seconds

  // Initialize the progress bar to 0
  progressBar.value = 0;
};

// Function to start the countdown timer
startTimer = (seconds) => {
  remainingTime = seconds;
  unansweredQuestions = questions.length;
  updateTimerDisplay(remainingTime);

  timerInterval = setInterval(function () {
    remainingTime--;

    if (remainingTime < 0) {
      // Time is up, end the quiz
      clearInterval(timerInterval);
      endQuiz();
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
};

// Function to update the timer display
function updateTimerDisplay(seconds) {
  timerElement.textContent = seconds;
}

//************ PROGRESS BAR ***************

function updateProgressBar() {
  const totalQuestions = questions.length;
  const currentIncrement = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.value = currentIncrement;
  document.getElementById("tracker").textContent = `${currentIncrement.toFixed(
    0
  )}%`;
}

//************ QUESTIONS AND ANSWERS ***************

// Display question and options
function showQuestion(index) {
  const question = questions[index];
  const questionsLeft = questions.length - index;
  questionCounter.innerHTML = `${questionsLeft} ANSWERS LEFT`;
  questionText.textContent = question.question;
  optionsContainer.innerHTML = "";

  for (let i = 0; i < question.options.length; i++) {
    const optionLabel = document.createElement("label");
    const optionInput = document.createElement("input");

    optionInput.className = "answers_list";
    optionInput.type = "radio";
    optionInput.name = "answer";
    optionInput.value = question.options[i];
    optionInput.id = `option_${i}`; // Unique ID for the input

    optionLabel.setAttribute("for", `option_${i}`); // Associate label with input
    optionLabel.innerText = question.options[i];

    optionsContainer.appendChild(optionInput);
    optionsContainer.appendChild(optionLabel);
  }
}

// Function to check the answer and move to the next question
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    nextButton.disabled = false;
    return;
  }

  const selectedAnswer = selectedOption.value;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
    nextButton.disabled = false;
    correctAnswers++;
  }

  if (selectedAnswer !== correctAnswer) {
    incorectAnswers++;
  }

  currentQuestionIndex++;
  unansweredQuestions--;
  updateProgressBar(); // Increment the progress bar

  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

// ************* END QUIZ *******************

// Function to end the quiz and display results
function endQuiz() {
  clearInterval(timerInterval); // Stop the timer
  QuizBox.classList.add("inactive");
  Results.style.display = "block";
  progresTracker.style.display = "block";
  infoWrapper.style.display = "none";

  secondsLeft.innerHTML = `${
    remainingTime < 0 ? (remainingTime = 0) : remainingTime
  }`;
  unQuestions.innerHTML = `${unansweredQuestions}`;
  coQuestions.innerHTML = `${correctAnswers}`;
  inQuestions.innerHTML = `${incorectAnswers}`;

  if (correctAnswers > questions.length / 2) {
    if (endImageContainer.classList.contains("sad-image"))
      endImageContainer.classList.replace("sad-image", "confet-image");
    endImage.src = "img/confet.png";
    endImage.alt = "confetti";
    endImageContainer.classList.add("confet-image");
    resultText.style.display = "none";
  } else {
    if (endImageContainer.classList.contains("confet-image"))
      endImageContainer.classList.replace("confet-image", "sad-image");
    endImageContainer.classList.add("sad-image");
    endImage.src = "img/sad.png";
    endImage.alt = "sad";
    // Show try again messsage
    remainingTime === 0
      ? (resultText.style.display = "flex")
      : (resultText.style.display = "none");
  }

  progressBar.value = 100; // Set progress bar to 100% at the end
  document.getElementById("tracker").textContent = "100%";
  restartButton.style.display = "block"; // Show the restart button
  nextButton.classList.add("inactive");
}

// ************* RESTART *******************

// Function to reset the quiz
function resetQuiz() {
  progresTracker.style.display = "block";
  infoWrapper.style.display = "flex";
  Results.style.display = "none";
  clearInterval(timerInterval); // Stop the timer
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorectAnswers = 0;
  unansweredQuestions = questions.length;
  progressBar.value = 0;
  updateProgressBar();

  // Hide the restart button and show the start button
  restartButton.style.display = "none";
  WelcomeScreen.style.display = "none";
  nextButton.classList.add("inactive");

  // Update the question counter
  questionCounter.innerHTML = `${currentQuestionIndex + 1}`;

  // Reset the timer display
  updateTimerDisplay(500); // Reset to the initial time
  startQuiz();
}

// *************  BUTTONS  *******************

document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", checkAnswer);
  restartButton.addEventListener("click", function () {
    resetQuiz();
  });
});
