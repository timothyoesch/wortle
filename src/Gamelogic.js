import {v4 as uuid} from 'uuid'

const allowedLetters = ["q","w","e","r","t","z","u","i","o","p","ü","a","s","d","f","g","h","j","k","l","ö","ä","y","x","c","v","b","n","m","Q","W","E","R","T","Z","U","I","O","P","Ü","A","S","D","F","G","H","J","K","L","Ö","Ä","Y","X","C","V","B","N","M"]

class Gamelogic {
    constructor() {
        this.gamedata = {
            current : undefined,
            statistics : undefined
        }

        this.initGameData()

        const self = this
        document.addEventListener("keydown", function(e){
            if (e.repeat) {
                return
            }
            if (e.ctrlKey || e.altKey){
                return
            }
            if (!allowedLetters.includes(e.key) && e.key !== "Backspace" && e.key !== "Enter") {
                return
            }
            var key = ""
            var specialChar = false
            if (e.key === "Backspace") {
                key = "delete"
                specialChar = true
            } else if (e.key === "Enter") {
                key = e.key.toLowerCase()
                specialChar = true
            } else {
                key = e.key.toLowerCase()
            }

            self.guessLetter(key, specialChar)
        })

        this.fetchWord()

        this.guessLetter = this.guessLetter.bind(this)
        this.checkWord = this.checkWord.bind(this)

    }

    wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    initGameData() {
        if (!this.getGameData()) {
            this.gamedata = {
                _id : uuid(),
                current : {
                    board : ["","","","","",""],
                    evaluations: [
                        ["","","","",""],
                        ["","","","",""],
                        ["","","","",""],
                        ["","","","",""],
                        ["","","","",""],
                        ["","","","",""]
                    ],
                    guessedLetters : [],
                    status : "pending",
                    currentRow : 0,
                    currentField : 0,
                    lastPlayed : Date.now(),
                    word : "",
                },
                statistics : []
            }
            localStorage.setItem("gamedata", JSON.stringify(this.gamedata))
        } else {
            this.gamedata = JSON.parse(localStorage.getItem("gamedata"))
            const self = this
            window.addEventListener("DOMContentLoaded", function(){
                self.setBoard(self.gamedata.current)
            })
        }
    }

    getGameData() {
        if (!localStorage.getItem("gamedata")) {
            return false
        } else {
            return true
        }
    }

    updateGamedata(gamedata){
        localStorage.setItem("gamedata", JSON.stringify(gamedata))
    }

    setBoard(current) {
        const rows = document.querySelectorAll(".gamerow")
        current.board.forEach((row, index) => {
            let fields = rows[index].querySelectorAll("p")
            let letters = row.split("")
            letters.forEach((letter, index) => {
                fields[index].innerText = letter
            });
        });

        let guessedWords = this.gamedata.current.board.filter(word => word !== "")
        guessedWords.forEach((word, row) => {
            this.evaluate(0.25, row)
        });

        this.setKeyboard()
    }

    guessLetter(key, specialChar) {
        let rows = document.querySelectorAll(".gamerow")
        let currentRow = rows[this.gamedata.current.currentRow]
        let fields = currentRow.querySelectorAll(".gamefield")
        let currentField = fields[this.gamedata.current.currentField]

        if (specialChar){
            if (key === "delete") {
                if (this.gamedata.current.currentField === 0){
                    return
                }
                this.gamedata.current.currentField = this.gamedata.current.currentField - 1
                currentField = fields[this.gamedata.current.currentField]
                currentField.querySelector("p").innerText = ""
                let tempData = this.gamedata.current.board[this.gamedata.current.currentRow].split("")
                tempData.pop()
                this.gamedata.current.board[this.gamedata.current.currentRow] = tempData.join("")
            } else if (key === "enter") {
                this.guessWord(this.gamedata.current.board[this.gamedata.current.currentRow])
                return
            }
        } else {
            if (this.gamedata.current.currentField === 5) {
                return
            }
            currentField.querySelector("p").innerText = key
            this.gamedata.current.currentField = this.gamedata.current.currentField + 1
            this.gamedata.current.board[this.gamedata.current.currentRow] = this.gamedata.current.board[this.gamedata.current.currentRow] + key
        }

        this.updateGamedata(this.gamedata)
    }

    async guessWord(word) {
        if (word.length < 5) {
            this.message(1,"Wort hat zu wenige Zeichen")
            return
        }

        if (!await this.wordExists(word)) {
            this.message(1,"Wort existiert nicht in der Datenbank")
            return
        }

        this.checkWord(word, this.gamedata.current.currentRow)
        this.evaluate(1, this.gamedata.current.currentRow)
        await this.wait(5 * 450)
        this.setKeyboard()
        let result = this.checkResult(this.gamedata.current.currentRow)
        if (!result) {
            this.nextLine()
        } else {
            this.message(2, "Du hast gewonnen!", 2)
        }
    }

    checkWord(word, row){
        let correctWord = this.gamedata.current.word.split("")
        let letters = []
        for(let i = 0; i < correctWord.length; i++) {
            letters[i] = {
                letter: correctWord[i],
                guessed: false
            }
        }

        let guessedWord = word.split("")

        for(let i = 0; i < guessedWord.length; i++) {
            if (correctWord.includes(guessedWord[i])) {
                let index = letters.findIndex(letter => letter.letter === guessedWord[i] && letter.guessed === false)
                if (index === i) {
                    this.gamedata.current.evaluations[row][i] = "correct"
                    letters[index].guessed = true
                    this.gamedata.current.guessedLetters.push({
                        letter: letters[index].letter,
                        status: "correct"
                    })
                    this.updateGamedata(this.gamedata)
                    continue
                }
                if (letters[index].guessed === true) {
                    this.gamedata.current.evaluations[row][i] = "wrong"
                    this.gamedata.current.guessedLetters.push({
                        letter: letters[index].letter,
                        status: "wrong"
                    })
                    this.updateGamedata(this.gamedata)
                    continue
                } else {
                    this.gamedata.current.evaluations[row][i] = "exists"
                    letters[index].guessed = true
                    this.gamedata.current.guessedLetters.push({
                        letter: letters[index].letter,
                        status: "exists"
                    })
                    this.updateGamedata(this.gamedata)
                    continue
                }
            } else {
                this.gamedata.current.evaluations[row][i] = "wrong"
                this.updateGamedata(this.gamedata)
                this.gamedata.current.guessedLetters.push({
                    letter: guessedWord[i],
                    status: "wrong"
                })
                continue
            }
        };

    }

    nextLine() {
        this.gamedata.current.currentRow = this.gamedata.current.currentRow + 1
        this.gamedata.current.currentField = 0
        this.updateGamedata(this.gamedata)
    }

    async evaluate(speed = 1, row) {
        let rows = document.querySelectorAll(".gamerow")
        let currentRow = rows[row]
        let fields = currentRow.querySelectorAll(".gamefield")
        for (let i = 0; i < fields.length; i++) {
            fields[i].setAttribute("style", `--transitionspeed: ${speed}`)
            await this.wait(300 * speed)
            fields[i].classList.add("turn")

            await this.wait(150 * speed)
            fields[i].classList.remove("turn")
            fields[i].classList.add(this.gamedata.current.evaluations[row][i])
        }
    }

    setKeyboard() {
        let letters = this.gamedata.current.guessedLetters
        letters.forEach(letter => {
            let key = document.querySelector(`button.keyboardkey[data-key-id="${letter.letter}"`).classList.add(letter.status)
        });
    }

    checkResult(row){
        let result = this.gamedata.current.evaluations[row].filter(field => field === "correct")
        if (result.length === 5) {
            return true
        } else {
            return false
        }
    }

    message(type, message, stretch = 1) {
        document.querySelector("#app").classList.add("dark")

        let messageDiv = document.createElement("div")
        if (type === 1) {
            type = "error"
        } else if (type === 2) {
            type = "success"
        }
        messageDiv.id = "alertmessage"
        messageDiv.classList = type
        messageDiv.innerText = message
        document.documentElement.appendChild(messageDiv)

        setTimeout(() => {
            document.querySelector("#app").classList.remove("dark")
            messageDiv.remove()
        }, message.length * 70 * stretch);
    }

    async fetchWord() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}get-gamedata`)
        if (response.ok) {
            let json = await response.json();
            this.gamedata.current.word = json.word.word
            this.updateGamedata(this.gamedata)
        } else {
            alert("HTTP-Error: " + response.status);
            return
        }
    }

    async wordExists(word) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}check-word?word=${word}`)
        if (response.ok) {
            let json = await response.json();
            return json
        } else {
            alert("HTTP-Error: " + response.status);
            return
        }
    }
}

export default Gamelogic