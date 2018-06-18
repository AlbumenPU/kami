
var boardID=0;
var colorID=0;
var t = Date.now();
var ob=new view();
var op=new colorOperation();
var end=new ending();
$(document).ready(function(e){

    ob.init();
});
// init();

function colorOperation() {
    this.MAXrow=16;
    this.MAXcol=10;
    this.changeID=function(num) {
        colorID = num;
        var nowSelect = $("#nowSelectColor");
        // this.sleep(1000000000);
        nowSelect.css('background-color', ob.getColorNum(colorID));
    }

    this.changeColor=function(i, j) {
        var gridCell = $("#grid-cell-" + i + "-" + j);
        if (board[boardID][i][j] != colorID) {
            gridCell.css('background-color', ob.getColorNum(colorID));
            // this.sleep(1000000000000);
            board[boardID][i][j] = colorID;
        }
    }


    this.borderJudge=function(i, j) {
        if (i < 0 || i >= this.MAXrow || j < 0 || j >= this.MAXcol) {
            return false;
        }
        else {
            return true;
        }
    }

    this.colorDFS=function(i, j) {
        boardSign[i][j] = 1;
        console.log(i,j)
        if (this.borderJudge(i, j - 1) && board[boardID][i][j] == board[boardID][i][j - 1] && boardSign[i][j - 1] == 0) {
            this.colorDFS(i, j - 1);
        }
        if (this.borderJudge(i - 1, j) && board[boardID][i][j] == board[boardID][i - 1][j] && boardSign[i - 1][j] == 0) {
            this.colorDFS(i - 1, j);
        }
        if (this.borderJudge(i, j + 1) && board[boardID][i][j] == board[boardID][i][j + 1] && boardSign[i][j + 1] == 0) {
            this.colorDFS(i, j + 1);
        }
        if (this.borderJudge(i + 1, j) && board[boardID][i][j] == board[boardID][i + 1][j] && boardSign[i + 1][j] == 0) {
            this.colorDFS(i + 1, j);
        }
        this.changeColor(i, j);

        // setInterval(changeColor(i,j),1000);
        boardSign[i][j] = 0;
        // renowsteps();
        // setTimeout(colorDFS,1000);
    }

    this.color=function(i, j) {
        var gamenowstep = document.getElementById("nowsteps");
        if (board[boardID][i][j] != colorID) {
            this.colorDFS(i, j);
            ob.renowsteps();
        }
        if (end.judgeGameSuccess()) {
            if(gamenowstep.innerHTML==stepNumber[boardID]) {
                if (boardID == 5) {
                    swal("真厉害！你已经完成所有的图片啦！")
                    // alert("你完成全部的图片啦！");
                }
                else {
                    // setTimeout(successView(),100000000);

                    end.successView();
                }
            }
            else {
                end.failureView()
            }
        }
    }




    this.initBoard=function() {
        for (var v = 0; v < 6; v++) {
            for (var i = 0; i < this.MAXrow; i++) {
                for (var j = 0; j < this.MAXcol; j++) {
                    board[v][i][j] = board1[v][i][j];
                }
            }
        }
    }
}

function ending() {
    this.MAXrow=16;
    this.MAXcol=10;
    this.failureView=function() {
        var con;
        // this.sleep(100);
        swal({
                title: "哦豁！",
                text: "超过限制步数了……",
                imageUrl: "images/难过.gif",
                // imagesize:"100x100",
                imageSize:"200x200",
                confirmButtonColor: "#7EC0EE",
                allowOutsideClick:true,
                // showCancelButton: true,
                confirmButtonText: "再来一次",
                closeOnConfirm: true
            },
            function(){
                ob.changeDraw(boardID);
            });


    }

    this.successView=function() {
        var con;
        // this.sleep(100);
        swal({
                title: "你赢啦！",
                text: "进入下一关？",
                imageUrl: "images/开心.gif",
                // imagesize:"100x100",
                imageSize:"200x200",
                confirmButtonColor: "#7EC0EE",
                allowOutsideClick:true,
                showCancelButton: true,
                confirmButtonText: "下一关",
                cancelButtonText: "再来一次",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            // function(){
            // ob.changeDraw(boardID+1);
            function(isConfirm){
                if (isConfirm) {
                    ob.changeDraw(boardID+1);
                } else {
                    ob.changeDraw(boardID);
                }
            });
    }

    this.judgeGameSuccess=function() {
        var num = 0;
        for (var i = 0; i < this.MAXrow; i++) {
            for (var j = 0; j <this.MAXcol; j++) {
                if (board[boardID][i][j] == board[boardID][0][0]) {
                    num = num + 1;
                }
            }
        }
        if (num == this.MAXcol * this.MAXrow) {
            return true;
        }
        else {
            return false;
        }
    }
}


function view() {
    this.MAXrow=16;
    this.MAXcol=10;
    this.init = function () {

        this.resteps(0);
        var nowSelect = $("#nowSelectColor");
        nowSelect.css('background-color', this.getColorNum(0));
        for (var k = 111; k < 115; k++) {
            var gridCell = $("#grid_cell_" + k);
            gridCell.css("top", this.getPosTop2(i + 1000, j));
            gridCell.css("left", this.getPosLeft2(i, (k - 114.5)));
            if (k == 111) {
                gridCell.css('background-color', this.getColorNum(0));
            }
            else if (k == 112) {
                gridCell.css('background-color', this.getColorNum(1));
            }
            else if (k == 113) {
                gridCell.css('background-color', this.getColorNum(2));
            }
            else if (k == 114) {
                gridCell.css('background-color', this.getColorNum(3));
            }
        }

        for (var i = 0; i < this.MAXrow; i++) {
            for (var j = 0; j < this.MAXcol; j++) {
                //创建小div
                var smalldiv = document.createElement("div");
                var audio = document.getElementById('audio')
                smalldiv.className = "grid-cell";
                smalldiv.id = "grid-cell-" + i + "-" + j;
                smalldiv.onclick = (function (p, q) {
                    return function () {
                        audio.cloneNode().play();
                        return op.color(p,q);
                    }
                })(i, j);
                document.getElementById("boxRender").appendChild(smalldiv);
            }
        }


        for (var i = 0; i < this.MAXrow; i++) {
            for (var j = 0; j < this.MAXcol; j++) {
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css("top", this.getPosTop(i, j));
                gridCell.css("left", this.getPosLeft(i, j));
                if (board[0][i][j] == 0) {
                    gridCell.css('background-color', this.getColorNum(board[0][i][j]));
                }
                else if (board[0][i][j] == 1) {
                    gridCell.css('background-color', this.getColorNum(board[0][i][j]));
                }
                else if (board[0][i][j] == 2) {
                    gridCell.css('background-color', this.getColorNum(board[0][i][j]));
                }
                else if (board[0][i][j] == 3) {
                    gridCell.css('background-color', this.getColorNum(board[0][i][j]));
                }
            }
        }
    }

    this.getPosTop = function (i, j) {
        return 10 + i * 30;
    }

    this.getPosLeft = function (i, j) {
        return 500 + j * 30;
    }


    this.getPosTop2 = function (i, j) {
        return 450 + i * 50;
    }

    this.getPosLeft2 = function (i, j) {
        return 700 + j * 70;
    }

    this.resteps = function (id) {
        var gamestep = document.getElementById("steps");
        gamestep.innerHTML = stepNumber[id];
    }

    this.getColorNum = function (num) {
        switch (num) {
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
    this.sleep=function(d){
        while(Date.now - t <= d);
    }


    this.updataView=function() {
        this.resteps(boardID);
        this.initNowSteps();
        op.initBoard();
        for (var i = 0; i < this.MAXrow; i++) {
            for (var j = 0; j < this.MAXcol; j++) {
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css("top", this.getPosTop(i, j));
                gridCell.css("left", this.getPosLeft(i, j));
                if (board[boardID][i][j] == 0) {
                    gridCell.css('background-color', this.getColorNum(board[boardID][i][j]));
                }
                else if (board[boardID][i][j] == 1) {
                    gridCell.css('background-color', this.getColorNum(board[boardID][i][j]));
                }
                else if (board[boardID][i][j] == 2) {
                    gridCell.css('background-color', this.getColorNum(board[boardID][i][j]));
                }
                else if (board[boardID][i][j] == 3) {
                    gridCell.css('background-color', this.getColorNum(board[boardID][i][j]));
                }
            }
        }
    }

    this.changeDraw=function(i) {
        boardID = i;
        this.updataView();
    }


    this.initNowSteps=function() {
        var gamenowstep = document.getElementById("nowsteps");
        gamenowstep.innerHTML = 0;
    }

    this.renowsteps=function() {
        var gamenowstep = document.getElementById("nowsteps");
        gamenowstep.innerHTML++;
        if (gamenowstep.innerHTML > stepNumber[boardID]) {

            end.failureView();
        }
    }


    this.introduction=function() {
        window.open("geme_introduction.html", "newwindow", "height=550, width=1000, top=100, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
    }

}

function clickChangeID(num) {
    op.changeID(num);
}

function clickChangeDraw(num) {
    ob.changeDraw(num);
}

function clickintroduction() {
    ob.introduction();
}

function clickindex() {
    window.location.href=("index.html")
}

function selectopen(j) {
    if(j==1){
        window.location.href=("kami.html");
    }
    else if(j==2){
        window.location.href=("kami2.html");
    }

}