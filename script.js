//Variables
const boardCont = document.querySelector('.board');
const restartBtn = document.getElementById('restart');

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
            restartBtn.classList.add('disabled')
        },
        updateBoard(){
            document.querySelector('.board').innerHTML = '';
            this.board.forEach((square,index)=>{
                document.querySelector('.board').innerHTML += `<button class='tic-square' id='square-${index}'>${square}</button>`;
            })
        },
        updateWalkthrough(text){
            document.getElementById('walkthrough').innerText = text;
        }
    }
}

function createPlayer(){
    let player1 = '';
    while(player1.trim() === ''){
        player1 = prompt(`Enter Player 1's name`);
    }
    let player2 = '';
    while(player2.trim() === ''){
        player2 = prompt(`Enter Player 2's name`);
    }
    return {player1,player2}
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
                restartBtn.classList.remove('disabled')
            }
            //console.log(`markIndexArr : ${JSON.stringify(markIndexArr)}`)
        },
        playTurn(ticIndex){
            if(this.canStillPlay){
                if(currentBoard.placeMark(this.setCurrentMark,ticIndex)){
                    currentBoard.updateBoard();
                    this.checkWin();
                    this.switchPlayer();
                    this.canStillPlay ? currentBoard.updateWalkthrough(`${playGame.setCurrentPlayer}'s turn`) : null;
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
        restart(){
            currentBoard.reset();
            this.currentPlayerIndex = 0;
        }
    }
}


const currentBoard = createBoard();
const playGame = gameControls(createPlayer());
currentBoard.displayBoard()
console.log(currentBoard);
console.log(playGame);



boardCont.addEventListener('click',(e)=>{
    if(e.target.classList.contains('tic-square')){
        const ticId = e.target.id;
        playGame.playTurn(ticId[ticId.length-1]);
        //console.log('Btn clicked');
    }
})

restartBtn.addEventListener('click',()=>{
    currentBoard.reset();
    currentBoard.displayBoard();
})

console.log(currentBoard.board)