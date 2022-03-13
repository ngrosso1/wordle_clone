document.addEventListener("DOMContentLoaded", () => {
    setUpSquares();
    const keyz = document.querySelectorAll(".keys button");

    let guessedWords = [[]];
    let availableSpace = 1;

    for (let i = 0; i < keyz.length; ++i) {
        keyz[i].onclick = ({ target }) => {
            const key = target.getAttribute("data-key");

            updateGuessedWords(key);
        };
    }

    function getCurrentWordsArr(){
        const numbOfGuessedWords = guessedWords.length;
        return guessedWords[numbOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordsArr = getCurrentWordsArr();
        if (currentWordsArr && currentWordsArr.length < 5) {
            currentWordsArr.push(letter);

            const availableSpaceEl = document.getElementById(String(1));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
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


})