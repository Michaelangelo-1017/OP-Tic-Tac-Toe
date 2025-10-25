//Variables
const boardCont = document.querySelector('.board');
const restartBtn = document.getElementById('restart');
const nextRoundBtn = document.getElementById('next-round');
const walkthrough = document.getElementById('walkthrough');


function createBoard(){
    return {
        board: ["","","","","","","","",""],
        placeMark(mark,index){
            if (this.board[index] === ""){
                this.board[index] = mark;
                return true;
            }
            else{
                return false;
            }
        },
        reset(){
            this.board = ["","","","","","","","",""];
            playGame.canStillPlay = true;
            playGame.currentPlayerIndex = 0;
        },
        displayBoard(){
            document.querySelector('.board').innerHTML = '';
            this.board.forEach((square,index)=>{
                document.querySelector('.board').innerHTML += `<button class='tic-square' id='square-${index}'>${square}</button>`
            })
            currentBoard.updateWalkthrough(`${playGame.setCurrentPlayer}'s turn`);
            nextRoundBtn.classList.add('disabled');
            playGame.updateScoresText();
            changeBackground(0);
        },
        updateBoard(){
            document.querySelector('.board').innerHTML = '';
            this.board.forEach((square,index)=>{
                document.querySelector('.board').innerHTML += `<button class='tic-square' id='square-${index}'>${square}</button>`;
            })
        },
        updateWalkthrough(text){
            walkthrough.innerText = text;
        }
    }
}

function createPlayer(){
    let player1 = '';
    while(player1.trim() === ''){
        player1 = prompt(`Enter Player 1's name`);
        if(player1 === null){
            player1 = 'Player 1'
        }
    }
    let player2 = '';
    while(player2.trim() === ''){
        player2 = prompt(`Enter Player 2's name`);
        if(player2 === null){
            player2 = 'Player 2'
        }
    }
    player1 = player1[0].toUpperCase() + player1.slice(1);
    player2 = player2[0].toUpperCase() + player2.slice(1);
    return {player1,player2};
}

function changeBackground(index){
    console.log(index)
    walkthrough.style.color = index === 0 ? 'lime' : '#FB4D3D';
}

function gameControls(names){
    const winningSets = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8],[2,4,6]];
    const {player1,player2} = names;
    return {
        players: [player1,player2],
        marks: ['X','O'],
        currentPlayerIndex : 0,
        canStillPlay : true,
        winner : "",
        scores : [0,0],
        checkWin(){
            const markIndexArr = [];
            currentBoard.board.forEach((space,index)=>{
                if(space === this.setCurrentMark){
                    markIndexArr.push(index)
                }
            }); 
            const checkerArr = winningSets.map((winArr)=> winArr.every((val)=>markIndexArr.includes(val)));
            if(checkerArr.includes(true)){
                currentBoard.updateWalkthrough(`${this.setCurrentPlayer} (${this.setCurrentMark}) won`);
                this.canStillPlay = false;
                this.winner = this.setCurrentMark;
                document.querySelectorAll('.tic-square').forEach(btn => {btn.classList.add('alt-hover')});
                nextRoundBtn.classList.remove('disabled');
                this.updateScore(this.marks.indexOf(this.winner));
                changeBackground(this.marks.indexOf(this.winner));
            }
        },
        playTurn(ticIndex){
            if(this.canStillPlay){
                if(currentBoard.placeMark(this.setCurrentMark,ticIndex)){
                    
                    currentBoard.updateBoard();
                    this.checkWin();
                    this.checkDraw()
                    this.switchPlayer();
                    this.canStillPlay ? currentBoard.updateWalkthrough(`${playGame.setCurrentPlayer}'s turn`) : null;
                    this.canStillPlay ? changeBackground(this.currentPlayerIndex) : null;
                    
                }
            }
        },
        switchPlayer(){
            this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        },
        get setCurrentPlayer(){
            return this.players[this.currentPlayerIndex];
        },
        get setCurrentMark(){
            return this.marks[this.currentPlayerIndex];
        },
        newRound(){
            currentBoard.reset();
            this.currentPlayerIndex = 0;
            currentBoard.displayBoard();
        },
        restart(){
            currentBoard.reset();
            this.currentPlayerIndex = 0;
            this.scores = [0,0];
            currentBoard.displayBoard();
        },
        checkDraw(){
            if(!currentBoard.board.includes('')){
                currentBoard.updateWalkthrough(`It's a draw!`);
                restartBtn.classList.remove('disabled');
                nextRoundBtn.classList.remove('disabled');
                this.canStillPlay = false;
                document.querySelectorAll('.tic-square').forEach(btn => {btn.classList.add('alt-hover')});
                walkthrough.style.color = 'aqua';
            }
        },
        updateScore(winnerIndex){
            this.scores[winnerIndex] += 1;
        },
        updateScoresText(){
            document.getElementById('scores').innerHTML = `<span class='name one'>${player1}</span> ${this.scores[0]} - ${this.scores[1]} <span class='name two'>${player2}</span>`;
        }
    }
}

const currentBoard = createBoard();
const playGame = gameControls(createPlayer());
currentBoard.displayBoard()
console.log(currentBoard);
console.log(playGame);

//Event Listeners
boardCont.addEventListener('click',(e)=>{
    if(e.target.classList.contains('tic-square')){
        const ticId = e.target.id;
        playGame.playTurn(ticId[ticId.length-1]);
    }
})

restartBtn.addEventListener('click',()=>{
    playGame.restart();
})

nextRoundBtn.addEventListener('click',()=>{
    playGame.newRound();
})