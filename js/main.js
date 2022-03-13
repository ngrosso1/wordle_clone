document.addEventListener("DOMContentLoaded", () => {
    setUpSquares();
    const keyz = document.querySelectorAll(".keys button");

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "dairy";

    function getCurrentWordsArr(){
        const numbOfGuessedWords = guessedWords.length;
        return guessedWords[numbOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordsArr = getCurrentWordsArr();
        if (currentWordsArr && currentWordsArr.length < 5) {
            currentWordsArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function handleSubmitWords(){
        const currentWordsArr = getCurrentWordsArr();
        if (currentWordsArr.length !== 5) {
            window.alert("Please enter a word of 5 letters");
        }

        const currentWord = currentWordsArr.join("");
        if (currentWord === word) {
            window.alert("Correct!");
        }

        if (guessedWords.length === 6) {
            window.alert("You have used all your guesses\nThe word was: " + word);
        }

        guessedWords.push([]);
    }

    function setUpSquares() {
        const game = document.getElementById("board");
        for(let i = 0; i < 30; ++i){
            let squares = document.createElement("div");
            squares.classList.add("squares");
            squares.setAttribute("id", i + 1);
            game.appendChild(squares);
        }
    }

    for (let i = 0; i < keyz.length; ++i) {
        keyz[i].onclick = ({ target }) => {
            const key = target.getAttribute("data-key");

            if(key === 'enter'){
                handleSubmitWords()
                return;
            }

            updateGuessedWords(key);
        };
    }
})