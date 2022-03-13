document.addEventListener("DOMContentLoaded", () => {
    setUpSquares();
    const keyz = document.querySelectorAll(".keys button");

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "dairy";
    let guessedWordCount = 0;

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

    function getTileColor(letter, index) {
        const correct = word.includes(letter);
        if (!correct){
            return "rgb(58, 58, 60)";
        }

        keyInPos = word.charAt(index);
        const isCorrectPos = letter === keyInPos;

        if (isCorrectPos){
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWords(){
        const currentWordsArr = getCurrentWordsArr();
        if (currentWordsArr.length !== 5) {
            window.alert("Please enter a word of 5 letters");
        }

        const currentWord = currentWordsArr.join("");

        const firstID = guessedWordCount * 5 + 1;
        const wait = 200;

        currentWordsArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterID = firstID + index; 
                const letterEl = document.getElementById(letterID);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, wait * index);
        })

        guessedWordCount += 1;

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
            squares.classList.add("animate__animated");
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