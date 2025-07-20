let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let messageContainer = document.querySelector('.msg-container');
let message = document.querySelector('#message')
let drawMsg = document.querySelector('#drawMsg')

let count = 0;

let turnO = true; //playerX, playerO, when true playerO and when false playerX

// we are using 2D-array
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    messageContainer.classList.add('hide');
    count = 0;
}

boxes.forEach( (box) => {
    box.addEventListener('click', () => {
        if (turnO) {    //playerO
            box.innerText = 'O'
            box.style.color = 'black'
            turnO = false;
        } else {  //playerX
            box.innerText = 'X'
            box.style.color = 'orange'
            turnO = true;
        }
        box.disabled = true;
        ++count;

        checkWinner();
    });
});

const disbaleBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}

displayWinner = (winner) => {
    message.innerText = `Congratulations, the winner is ${winner}`;
    drawMsg.innerText = ""
    messageContainer.classList.remove('hide')
    disbaleBoxes();
}

const checkWinner = () => {
    for (let elementAt of winPatterns) {
        let pos1Val = boxes[elementAt[0]].innerText
        let pos2Val = boxes[elementAt[1]].innerText
        let pos3Val = boxes[elementAt[2]].innerText
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                displayWinner(pos1Val)
                return
            }
        }
    }
    if (count == 9) {
        console.log('draw');
        checkDraw()
    }
}

const checkDraw = () => {
        drawMsg.innerText = `Game draw!`
        message.innerText = ""
        messageContainer.classList.remove('hide')
        disbaleBoxes();
}

newGameBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('click', resetGame)