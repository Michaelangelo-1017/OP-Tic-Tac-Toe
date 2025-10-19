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
        }
    }
}

function createPlayer(name){
    return {name}
}

function gameControls(){
    return {
        players: [player1,player2],
        marks: ['X','O'],
        currentPlayerIndex : 0,
        playTurn(){
            if(currentBoard.placeMark(this.setCurrentMark,this.generateIndex)){
                this.switchPlayer()
            }
            else{
                this.playTurn();
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
        },
        get generateIndex(){
            return Math.floor((Math.random() * (9)) + 0)
        }
    }
    
}

const player1 = createPlayer('Mike');
const player2 = createPlayer('Duke');
const currentBoard = createBoard();
const playGame = gameControls();
console.log(player1);
console.log(player2);
console.log(currentBoard);
console.log(playGame);
for(let i=1; i<=9; i++){
    console.log(`It is ${playGame.setCurrentPlayer.name}'s turn, he played ${playGame.setCurrentMark} in ${playGame.generateIndex}`);
    playGame.playTurn();
}
console.log(currentBoard.board)