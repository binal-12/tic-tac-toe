const grid = document.getElementsByClassName("game")[0]


let availabe = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
const dropDownDiv = document.getElementById("dropdownMenuButton")
let mode

let user
let comp
let userSelected = []
let compSelected = []

let player = "Player1"
let playerSelected
let player1 = []
let player2 = []

let gameStart = false
let gameOver = false
const correct = [
    ["0","1",'2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
]

function dropdown(crr){
    if(gameStart){
        return
    }
    dropDownDiv.textContent = crr.textContent
}

function press(crr){
    gameStart = true

    mode = dropDownDiv.textContent
    if( mode == "Single Player"){
        singlePlayer(crr)
    } else {
        multiPlayer(crr)
    }
}

function multiPlayer(crr){
    if(gameOver){
        return 
    }
    const cross = document.createElement("h3")
    cross.className = "sign"
    cross.textContent = "X"

    const circle = document.createElement("h3")
    circle.className = "sign"
    circle.textContent = "O"
    playerSelected = crr.textContent

    if (player == "Player1"){
        player1.push(playerSelected)
        crr.remove()
        grid.insertBefore(cross, grid.children[playerSelected])
        player = "Player2"
    } else {
        player2.push(playerSelected)
        crr.remove()
        grid.insertBefore(circle, grid.children[playerSelected])
        player = "Player1"
    }
    if (checkGame(player1, "Player1")){
        gameOver = true
        return
    }
    if (checkGame(player2, "Player2")){
        gameOver = true
        return
    }

}

function singlePlayer(crr){
    if (gameOver){
        return
    }
    const cross = document.createElement("h3")
    cross.className = "sign"
    cross.textContent = "X"
    
    user = crr.textContent
    crr.remove()
    grid.insertBefore(cross, grid.children[user])
    userSelected.push(user)
    
    for(let i=0, n=availabe.length; i<n; i++){
        if(availabe[i] == user){
            availabe.splice(i,1)
            break
        }
    }
    if (checkGame(userSelected, "user")) {
        gameOver = true
        return 
    }
    compTurn()
    if (checkGame(compSelected, "comp")) {
        gameOver = true
        return 
    }
    
    function compTurn(){
        if(availabe.length==0){
            return
        }
        const circle = document.createElement("h3")
        circle.className = "sign"
        circle.textContent = "O" 

        comp = availabe[Math.floor(Math.random() * (availabe.length -1))]
        compSelected.push(comp)
        grid.children[comp].remove()
        grid.insertBefore(circle, grid.children[comp])
        for(let i=0, n=availabe.length; i<n; i++){
            if(availabe[i] == comp){
                availabe.splice(i,1)
                break
            }
    }
}

}



function checkGame(arr, str){
    if(arr.length < 3){
        return false
    }
    for(let i=0; i<8; i++){
        if (correct[i].every(val => arr.includes(val))){
            console.log(str)
            highlight(correct[i], str)
            return true
        }
    }
    return false
}

function highlight(arr, str){
    for(let i=0; i<3; i++){
        if(str == "user"){
            grid.children[arr[i]].style.color = "#4dcf4d"
        } else {
            if(mode == "Single Player"){
                grid.children[arr[i]].style.color = "#cf4d4d"
            } else{
                grid.children[arr[i]].style.color = "#4dcf4d"
            }
        }
    }
}
