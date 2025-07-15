const hangmanimg = document.querySelector(".hangmanbox img")
const keyboarddiv = document.querySelector(".keyboard")
const displaywordbox = document.querySelector(".worddisplay")
const guesstext = document.querySelector(".guessestext b")
const gamemodal = document.querySelector(".gamemodal")
const playagain = document.querySelector(".playagainbtn")
let currentword;
let wrongguesscount = 0
let correctletter = []
const maxguess = 6

function resetgame() {
    correctletter = []
    wrongguesscount = 0
    hangmanimg.src = `images/hangman-${wrongguesscount}.svg`
    guesstext.innerText = `${wrongguesscount} / ${maxguess}`
    keyboarddiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    displaywordbox.innerHTML = currentword.split("").map(() => ` <li class="letter  guess "></li>`).join("")

    gamemodal.classList.remove("show")



}


const getword = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]



    currentword = word

    document.querySelector(".hinttext b").innerText = hint
    resetgame()
}


function gameover(isvictory) {
    setTimeout(() => {
        const modaltext = isvictory ? `You found the word:` : `The correct word was:`
        gamemodal.querySelector('img').src = `images/${isvictory ? 'victory' : 'lost'}.gif`
        gamemodal.querySelector("h4").innerText = `${isvictory ? 'Congrates!' : "Game Over!"}`
        gamemodal.querySelector('p').innerHTML = `${modaltext} <b>${currentword}</b>`
        gamemodal.classList.add("show")
    }, 300);

}



function initgame(btn, clickletter) {


    if (currentword.includes(clickletter)) {
        [...currentword].forEach((letter, inx) => {
            if (letter === clickletter) {
                correctletter.push(letter)
                displaywordbox.querySelectorAll("li")[inx].innerText = letter
                displaywordbox.querySelectorAll("li")[inx].classList.add("guess")
            }
        })
    } else {
        wrongguesscount++
        hangmanimg.src = `images/hangman-${wrongguesscount}.svg`


    }
    btn.disabled = true
    guesstext.innerText = `${wrongguesscount} / ${maxguess}`
    if (wrongguesscount === maxguess) return gameover(false)
    if (correctletter.length === currentword.length) return gameover(true)
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboarddiv.appendChild(button)
    button.addEventListener("click", e => initgame(e.target, String.fromCharCode(i)))
}

getword()

playagain.addEventListener("click", resetgame)