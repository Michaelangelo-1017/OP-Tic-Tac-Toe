//
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
        },
        displayBoard(){
            this.board.forEach((square,index)=>{
                document.querySelector('.board').innerHTML += `<button class='tic-square' id='square-${index}'>${square}</button>`
            })
            currentBoard.updateWalkthrough(`${playGame.players[0]}'s turn`)
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

function createPlayer(name){
    return {name}
}

function gameControls(){
    const winningSets = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8],[2,4,6]];
    return {
        players: ['Player 1','Player 2'],
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
                currentBoard.updateWalkthrough(`${this.setCurrentPlayer} with the mark : ${this.setCurrentMark} has won the game.`);
                this.canStillPlay = false;
                this.winner = this.setCurrentMark;
            }
        },
        playTurn(ticIndex){
            if(this.canStillPlay){
                if(currentBoard.placeMark(this.setCurrentMark,ticIndex)){
                this.switchPlayer();
                this.checkWin();
                currentBoard.updateBoard();
            }
                else{
                    this.playTurn();
                }
            }
            else{
                currentBoard.updateWalkthrough(`${this.winner} has won already`)
            }
        },
        switchPlayer(){
            
            this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
            currentBoard.updateWalkthrough(`${this.setCurrentPlayer}'s turn`); 
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
        },
        get generateIndex(){
            return Math.floor((Math.random() * (9)) + 0)
        }
    }
    
}

const currentBoard = createBoard();
const playGame = gameControls();
currentBoard.displayBoard()
console.log(currentBoard);
console.log(playGame);

const boardCont = document.querySelector('.board');

boardCont.addEventListener('click',(e)=>{
    if(e.target.classList.contains('tic-square')){
        const ticId = e.target.id;
        playGame.playTurn(ticId[ticId.length-1]);
        console.log('Btn clicked')
    }
})

console.log(currentBoard.board)
