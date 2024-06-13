
let boxes=document.querySelectorAll(".box");
let resetButton=document.querySelector(".tryagain");
let msgContainer = document.querySelector(".msgContainer");
let newGame= document.querySelector(".newgame");
let message= document.querySelector("#message");
let turn1 = true ; //return O
let gameEnded = false; 
let winPattern = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
const button = document.querySelector('.msgContainer');
const canvas = document.querySelector('.canvas');

const jsConfetti = new JSConfetti();

button.addEventListener("mouseover",()=>{
    if (!gameEnded) { 
    jsConfetti.addConfetti();
}
});
const resetGame=()=>{
    turn1=true;
    gameEnded = false; 
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (box.innerText === "" && !gameEnded) { 
        if(turn1){
        box.innerText="O";
        box.style.color="#304C89";
        turn1= false;
    } else{
        box.innerText="X";
        box.style.color = "#000000";
        turn1=true;
    };
    checkWinner();
}
});
});
const enableBoxes = ()=>{
    for(let box of boxes ){
        box.disabled = false;
        box.innerText="";
    }
};
const disableBoxes = ()=>{
    for(let box of boxes ){
        box.disabled = true;
    }
};
const showWinner=(winner)=>{
    message.innerText= `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameEnded = true;
    jsConfetti.addConfetti();
};
const showTie = () => {
    message.innerText = `Game tie. Play again!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameEnded = true; // Set the gameEnded flag
};


const checkWinner = () =>{
    let winnerFound = false;
    for(let patterns of winPattern){
       let pos1Val=boxes[patterns[0]].innerText; //this will store the value at index 0
       let pos2Val=boxes[patterns[1]].innerText; 
       let pos3Val=boxes[patterns[2]].innerText; 
       if(pos1Val !="" && pos2Val != "" && pos3Val !=""){
        if(pos1Val===pos2Val && pos2Val===pos3Val){
             console.log("Winner" , pos1Val);
             showWinner(pos1Val);
             winnerFound = true;
             break;
        }
       }
}
// Check for tie
if (!winnerFound) {
let allFilled = true;
for (let box of boxes) {
    if (box.innerText === "") {
        allFilled = false;
        break;
    }
}
if (allFilled) {
    showTie();
}}
};
newGame.addEventListener("click",resetGame);
tryAgain.addEventListener("click",resetGame);

