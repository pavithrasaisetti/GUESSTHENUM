// Redirect to game.html with difficulty selection
document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            let difficulty = document.getElementById("difficulty").value;
            localStorage.setItem("difficulty", difficulty);
            window.location.href = "game.html";
        });
    }
});

// Game Logic
document.addEventListener("DOMContentLoaded", function () {
    let homeBtn = document.getElementById("homeBtn");
    let answer = Math.floor(Math.random() * 100) + 1;
    let difficulty = localStorage.getItem("difficulty") || "easy";

    let attempts = difficulty === "easy" ? 10 : difficulty === "medium" ? 7 : 5;
    let timeLeft = difficulty === "easy" ? 60 : difficulty === "medium" ? 40 : 30; // ⏳ Timer based on difficulty

    let guessInput = document.getElementById("guessInput");
    guessInput.disabled = false;
    let submitGuess = document.getElementById("submitGuess");
    let restartBtn = document.getElementById("restartBtn");
    let message = document.getElementById("message");
    let attemptsDisplay = document.getElementById("attempts");
    let timerDisplay = document.createElement("p"); // ⏳ Timer display element

    // Insert Timer UI below attempts
    timerDisplay.innerHTML = `⏰ The NUMBER u have to guess in: <span id="timer">${timeLeft}</span> sec`;
    document.querySelector(".game-container").appendChild(timerDisplay);

    if (attemptsDisplay) attemptsDisplay.textContent = attempts;

    let timer = setInterval(() => {
        timeLeft--;
        let timerElement = document.getElementById("timer");
        timerElement.textContent = timeLeft;
    
        // 🔴 Change color to red when 10 seconds are left
        if (timeLeft <= 10) {
            timerElement.style.color = "red";
            timerElement.style.fontWeight = "bold";
            timerElement.style.animation = "blink 1s infinite"; // Optional blinking effect
        }
    
        if (timeLeft <= 0) {
            clearInterval(timer);
            message.textContent = "⏳ You ran out of time! The number was " + answer;
            guessInput.disabled = true;
            submitGuess.disabled = true;
        }
    }, 1000); // Update every second
    // Update every second

    function checkGuess() {
    let guess = parseInt(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "⚠️ Whoops! Try a number between 1 and 100!";
        return;
    }

    if (guess === answer) {
        message.textContent = "🎉 You got it! The number was " + answer + ". You're a mind reader!";
        guessInput.disabled = true;
        submitGuess.disabled = true;
        clearInterval(timer);
        return;
    }

    attempts--;
    attemptsDisplay.textContent = attempts;

    let hint = guess > answer ? "📈 Too high!" : "📉 Too low!";
    
    // 🎭 Funny hints based on difference
    let difference = Math.abs(guess - answer);
    if (difference > 50) {
        hint += " 🚀 Whoa! You're way off! Try a much smaller/bigger number!";
    } else if (difference > 30) {
        hint += " 😅 A little extreme, but getting warmer!";
    } else if (difference > 10) {
        hint += " 🔥 Ooooh, close! But not quite!";
    } else {
        hint += " 🧐 Super close! Almost there!";
    }

    message.textContent = hint;
    guessInput.value = "";

    if (attempts === 0) {
        message.textContent = "😞 Out of attempts! The number was " + answer + ". Better luck next time!";
        guessInput.disabled = true;
        submitGuess.disabled = true;
        clearInterval(timer);
    }
}


    guessInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    if (submitGuess) {
        submitGuess.addEventListener("click", checkGuess);
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", function () {
            window.location.reload();
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});
