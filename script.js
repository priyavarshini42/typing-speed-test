/* =========================================================
   CLEAN TYPING SPEED TEST (FIXED VERSION)
========================================================= */

/* ==========================
   PARAGRAPHS
========================== */

const paragraphs = [
    "The quick brown fox jumps over the lazy dog while learning to type faster every single day.",
    "Typing is a skill that improves with practice, focus, and consistency over time.",
    "JavaScript makes web pages interactive by allowing dynamic behavior and real-time updates.",
    "A fast typist can save a lot of time in programming, writing, and productivity tasks.",
    "Technology is evolving rapidly and typing efficiently is an important digital skill."
];

/* ==========================
   ELEMENTS
========================== */

const paragraphEl = document.getElementById("paragraph");
const inputEl = document.getElementById("input");

const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const accuracyEl = document.getElementById("accuracy");
const mistakesEl = document.getElementById("mistakes");
const progressBar = document.getElementById("progressBar");

/* ==========================
   GAME STATE
========================== */

let timer = 60;
let timeLeft = timer;
let interval = null;

let currentParagraphIndex = 0;
let charIndex = 0;

let mistakes = 0;
let correctChars = 0;
let totalTyped = 0;

let isTestRunning = false;

/* ==========================
   LOAD PARAGRAPH
========================== */

function loadParagraph() {

    paragraphEl.innerHTML = "";

    const text = paragraphs[currentParagraphIndex];

    text.split("").forEach(char => {

        const span = document.createElement("span");
        span.innerText = char;
        paragraphEl.appendChild(span);

    });

    charIndex = 0;

    paragraphEl.children[0].classList.add("active");
}

/* ==========================
   START TEST
========================== */

function startTest() {

    if (isTestRunning) return;

    isTestRunning = true;

    interval = setInterval(updateTimer, 1000);
}

/* ==========================
   TIMER
========================== */

function updateTimer() {

    if (timeLeft <= 0) {
        endTest();
        return;
    }

    timeLeft--;

    timerEl.innerText = timeLeft;

    let progress = ((timer - timeLeft) / timer) * 100;
    progressBar.style.width = `${progress}%`;
}

/* ==========================
   END TEST (ONLY FINAL RESULT)
========================== */

function endTest() {

    clearInterval(interval);

    inputEl.disabled = true;

    const wpm = Math.round(correctChars / 5);
    const cpm = correctChars;
    const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);

    wpmEl.innerText = wpm;
    cpmEl.innerText = cpm;
    accuracyEl.innerText = accuracy + "%";
    mistakesEl.innerText = mistakes;

    alert(`
FINAL RESULT 🎯

WPM: ${wpm}
CPM: ${cpm}
Accuracy: ${accuracy}%
Mistakes: ${mistakes}
    `);
}

/* ==========================
   INPUT HANDLER
========================== */

inputEl.addEventListener("input", () => {

    if (!isTestRunning) startTest();

    const chars = paragraphEl.querySelectorAll("span");
    const typed = inputEl.value.split("");

    totalTyped = typed.length;
    mistakes = 0;
    correctChars = 0;

    chars.forEach((char, index) => {

        const typedChar = typed[index];

        if (typedChar == null) {
            char.classList.remove("correct", "wrong");
        } else if (typedChar === char.innerText) {
            char.classList.add("correct");
            char.classList.remove("wrong");
            correctChars++;
        } else {
            char.classList.add("wrong");
            char.classList.remove("correct");
            mistakes++;
        }
    });

    charIndex = typed.length;

    // ACTIVE CURSOR
    chars.forEach(c => c.classList.remove("active"));

    if (chars[charIndex]) {
        chars[charIndex].classList.add("active");
    }

    // ✅ AUTO NEXT PARAGRAPH
    if (typed.join("") === paragraphs[currentParagraphIndex]) {

        currentParagraphIndex++;

        inputEl.value = "";

        if (currentParagraphIndex < paragraphs.length) {
            loadParagraph();
        } else {
            endTest(); // FINAL RESULT ONLY HERE
        }
    }
});

/* ==========================
   INIT
========================== */

loadParagraph();
