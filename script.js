let boxes=document.querySelectorAll(".btn");
let resetbtn=document.querySelector(".reset-btn");
let newGameBtn=document.querySelector(".new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");

let turn0=true;
let count=0;

const winPattern=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
];

const resetGame=()=>{
    turn0=true;
    enablebtns();
    msgContainer.classList.add("hide");
    count=0;
    msg.innerText="";
}

boxes.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        if(turn0){
            btn.innerText="O";
            btn.style.color="green";
            turn0=false;
            count++;
        }else{
            btn.innerText="X";
            btn.style.color="red";
            turn0=true;
            count++;
        }
        btn.disabled=true;
        checkWinner();
    });
});

const disablebtns=()=>{
    for(let btn of boxes){
        btn.disabled=true;
    }
}

const enablebtns=()=>{
    for(let btn of boxes){
        btn.disabled=false;
        btn.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`🎉 Congratulations 🎉 
     Winner is ${winner} 🏆`;
    msgContainer.classList.remove("hide");
    disablebtns();
}

const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPattern){
     let pos1val=boxes[pattern[0]].innerText;
     let pos2val=boxes[pattern[1]].innerText;
     let pos3val=boxes[pattern[2]].innerText;

     if(pos1val != "" && pos2val != "" && pos3val !=""){
        if(pos1val === pos2val && pos2val === pos3val){
            console.log("Winner", pos1val);
            showWinner(pos1val);
            winnerFound=true;
            break;
        }
     }
    }
    if(!winnerFound && count === 9){  // If no winner and all boxes are clicked
        msg.innerText = "Oops! No one is the winner 😕";
        msgContainer.classList.remove("hide");
        disablebtns();
    }
}

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);