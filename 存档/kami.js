var MAXrow=16;
var MAXcol=10;
var boardID=0;
var colorID=0;

$(document).ready(function(e){
    init();
    // coordinates(ev);
});
// init();


function init(){

    resteps(0);
    var nowSelect=$("#nowSelectColor");
    nowSelect.css('background-color', getColorNum(0));
    for (var k=111;k<115;k++){
        var gridCell = $("#grid_cell_"+k);
        gridCell.css("top",getPosTop2(i+1000,j));
        gridCell.css("left",getPosLeft2(i,(k-114.5)));
        if (k==111){
            gridCell.css('background-color', getColorNum(0));
        }
        else if (k==112){
            gridCell.css('background-color', getColorNum(1));
        }
        else if (k==113){
            gridCell.css('background-color', getColorNum(2));
        }
        else if (k==114){
            gridCell.css('background-color', getColorNum(3));
        }
    }

    for (var i = 0; i < 16; i ++) {
        for (var j = 0; j < 10; j ++){
            //创建小div
            var smalldiv = document.createElement("div");
            var audio = document.getElementById('audio')
            smalldiv.className="grid-cell";
            smalldiv.id="grid-cell-"+i+"-"+j;

            smalldiv.onclick=(function (p,q) {
                return function () {
                    audio.cloneNode().play();
                    return color(p,q);
                }
            })(i,j);
            // smalldiv.push(smalldiv);
            document.getElementById("boxRender").appendChild(smalldiv);
        }
    }


    for(var i = 0;i<MAXrow;i++){
        for(var j = 0;j<MAXcol;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
            if(board[0][i][j]==0){
                gridCell.css('background-color', getColorNum(board[0][i][j]));
            }
            else if(board[0][i][j]==1) {
                gridCell.css('background-color', getColorNum(board[0][i][j]));
            }
            else if (board[0][i][j]==2){
                gridCell.css('background-color', getColorNum(board[0][i][j]));
            }
            else if (board[0][i][j]==3) {
                gridCell.css('background-color', getColorNum(board[0][i][j]));
            }
        }
    }
}

function getPosTop(i, j) {
    return 10 + i * 30;
}

function getPosLeft(i, j) {
    return 500 + j * 30;
}


function getPosTop2(i, j) {
    return 450 + i * 50;
}

function getPosLeft2(i, j) {
    return 700 + j * 70;
}


function changeID(num) {
    colorID= num;
    var nowSelect=$("#nowSelectColor");
    nowSelect.css('background-color', getColorNum(colorID));
}

function getColorNum(num){
    switch (num){
        case 0:
            return "#a0522d";
            break;
        case 1:
            return "#ff1493";
            break;
        case 2:
            return "#5d478b";
            break;
        case 3:
            return "#45d3aa";
            break;
    }
}

function changeColor(i,j) {
    var gridCell = $("#grid-cell-"+i+"-"+j);
    if(board[boardID][i][j] != colorID){

        gridCell.css('background-color', getColorNum(colorID));
        board[boardID][i][j]=colorID;
    }
}


function borderJudge(i,j) {
    if (i<0 || i>=MAXrow || j<0 || j>=MAXcol){
        return false;
    }
    else {
        return true;
    }
}

function colorDFS(i,j) {
    boardSign[i][j]=1;
    if (borderJudge(i,j-1) && board[boardID][i][j]==board[boardID][i][j-1] && boardSign[i][j-1]==0){
        colorDFS(i,j-1);
    }
    if (borderJudge(i-1,j) && board[boardID][i][j]==board[boardID][i-1][j] && boardSign[i-1][j]==0){
        colorDFS(i-1,j);
    }
    if (borderJudge(i,j+1) && board[boardID][i][j]==board[boardID][i][j+1] && boardSign[i][j+1]==0){
        colorDFS(i,j+1);
    }
    if (borderJudge(i+1,j) && board[boardID][i][j]==board[boardID][i+1][j] && boardSign[i+1][j]==0){
        colorDFS(i+1,j);
    }
    changeColor(i,j);
    // setInterval(changeColor(i,j),1000);
    boardSign[i][j]=0;
    // renowsteps();
    // setTimeout(colorDFS,1000);
}

function color(i,j) {
    if(board[boardID][i][j]!=colorID){
        colorDFS(i,j);
        renowsteps();
    }
    if (judgeGameSuccess()){
        if(boardID==5){

            alert("你完成全部的图片啦！");
        }
        else {
            // setTimeout(successView(),100000000);

            successView();
        }
    }
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function initBoard() {
    for(var v=0;v<6;v++) {
        for (var i = 0; i < MAXrow; i++) {
            for (var j = 0; j < MAXcol; j++) {
                board[v][i][j]=board1[v][i][j];
            }
        }
    }
}

function updataView() {
    resteps(boardID);
    initNowSteps();
    initBoard();
    for(var i = 0;i<MAXrow;i++){
        for(var j = 0;j<MAXcol;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
            if(board[boardID][i][j]==0){
                gridCell.css('background-color', getColorNum(board[boardID][i][j]));
            }
            else if(board[boardID][i][j]==1) {
                gridCell.css('background-color', getColorNum(board[boardID][i][j]));
            }
            else if (board[boardID][i][j]==2){
                gridCell.css('background-color', getColorNum(board[boardID][i][j]));
            }
            else if (board[boardID][i][j]==3) {
                gridCell.css('background-color', getColorNum(board[boardID][i][j]));
            }
        }
    }
}

function changeDraw(i) {
    boardID=i;
    updataView();
}


function resteps(id) {
    var gamestep=document.getElementById("steps");
    gamestep.innerHTML=stepNumber[id];
}

function initNowSteps() {
    var gamenowstep=document.getElementById("nowsteps");
    gamenowstep.innerHTML=0;
}

function renowsteps() {
    var gamenowstep=document.getElementById("nowsteps");
    gamenowstep.innerHTML++;
    if (gamenowstep.innerHTML>stepNumber[boardID]){

        failureView();
    }
}

function failureView() {
    var con;
    sleep(100);
    window.open ("failure.html", "newwindow", "height=300, width=400, top=250, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")&nbsp;
    // con=confirm("挑战失败啦！要不咱们重新来过？");
    // if(con==true){
    //     updataView();
    // }
    // else {
    //     alert("倔得像头牛！！！")
    //     updataView();
    // }
}

function successView() {
    var con;
    sleep(100);
    window.open ("success.html", "newwindow", "height=300, width=400, top=250, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")&nbsp;
    // con=confirm("恭喜你成功啦！继续下一张图？");
    // if(con==true){
    //     boardID=boardID+1;
    //     changeDraw(boardID);
    // }
    // else {
    //     updataView();
    // }
}

function judgeGameSuccess() {
    var num=0;
    for (var i=0;i<MAXrow;i++){
        for (var j=0;j<MAXcol;j++){
            if(board[boardID][i][j]==board[boardID][0][0]){
                num=num+1;
            }
        }
    }
    if(num==MAXcol*MAXrow){
        return true;
    }
    else {
        return false;
    }
}

function instruction() {
    window.open ("instruction.html", "newwindow", "height=500, width=800, top=150, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")&nbsp;
}