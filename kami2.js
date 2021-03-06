
var boardID=6;
var colorID=0;

var ob=new view();

$(document).ready(function(e){

    ob.init();
    // coordinates(ev);
});
// init();
function view() {
    this.MAXrow=18;
    this.MAXcol=12;
    this.init = function () {

        this.resteps(6);
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
                        return ob.color(p,q);
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
                if (board[6][i][j] == 0) {
                    gridCell.css('background-color', this.getColorNum(board[6][i][j]));
                }
                else if (board[6][i][j] == 1) {
                    gridCell.css('background-color', this.getColorNum(board[6][i][j]));
                }
                else if (board[6][i][j] == 2) {
                    gridCell.css('background-color', this.getColorNum(board[6][i][j]));
                }
                else if (board[6][i][j] == 3) {
                    gridCell.css('background-color', this.getColorNum(board[6][i][j]));
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


    this.changeID=function(num) {
        colorID = num;
        var nowSelect = $("#nowSelectColor");
        nowSelect.css('background-color', this.getColorNum(colorID));
    }

    this.changeColor=function(i, j) {
        var gridCell = $("#grid-cell-" + i + "-" + j);
        if (board[boardID][i][j] != colorID) {

            gridCell.css('background-color', this.getColorNum(colorID));
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
        boardSign1[i][j] = 1;
        if (this.borderJudge(i, j - 1) && board[boardID][i][j] == board[boardID][i][j - 1] && boardSign1[i][j - 1] == 0) {
            this.colorDFS(i, j - 1);
        }
        if (this.borderJudge(i - 1, j) && board[boardID][i][j] == board[boardID][i - 1][j] && boardSign1[i - 1][j] == 0) {
            this.colorDFS(i - 1, j);
        }
        if (this.borderJudge(i, j + 1) && board[boardID][i][j] == board[boardID][i][j + 1] && boardSign1[i][j + 1] == 0) {
            this.colorDFS(i, j + 1);
        }
        if (this.borderJudge(i + 1, j) && board[boardID][i][j] == board[boardID][i + 1][j] && boardSign1[i + 1][j] == 0) {
            this.colorDFS(i + 1, j);
        }
        this.changeColor(i, j);
        // setInterval(changeColor(i,j),1000);
        boardSign1[i][j] = 0;
        // renowsteps();
        // setTimeout(colorDFS,1000);
    }

    this.color=function(i, j) {
        var gamenowstep = document.getElementById("nowsteps");
        if (board[boardID][i][j] != colorID) {
            this.colorDFS(i, j);
            this.renowsteps();
        }
        // if (this.judgeGameSuccess()) {
        //     if (boardID == 11) {
        //         swal("真厉害！你已经完成所有的图片啦！")
        //         // alert("你完成全部的图片啦！");
        //     }
        //     else {
        //         // setTimeout(successView(),100000000);
        //
        //         this.successView();
        //     }
        // }
        if (this.judgeGameSuccess()) {
            if(gamenowstep.innerHTML==stepNumber[boardID]) {
                if (boardID == 5) {
                    swal("真厉害！你已经完成所有的图片啦！")
                    // alert("你完成全部的图片啦！");
                }
                else {
                    // setTimeout(successView(),100000000);

                    this.successView();
                }
            }
            else {
                this.failureView()
            }
        }
    }

    this.sleep=function(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }

    this.initBoard=function() {
        for (var v = 6; v < 12; v++) {
            for (var i = 0; i < this.MAXrow; i++) {
                for (var j = 0; j < this.MAXcol; j++) {
                    board[v][i][j] = board1[v][i][j];
                }
            }
        }
    }

    this.updataView=function() {
        this.resteps(boardID);
        this.initNowSteps();
        this.initBoard();
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

            this.failureView();
        }
    }

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
        // window.open("failure.html", "newwindow", "height=300, width=400, top=250, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");


    }

    this.successView=function() {
        var con;
        // this.sleep(100);
        // window.open("success.html", "newwindow", "height=300, width=400, top=250, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no") ;
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

    this.introduction=function() {
        window.open("geme_introduction.html", "newwindow", "height=550, width=1000, top=100, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
    }
}

function clickChangeID(num) {
    ob.changeID(num);
}

function clickChangeDraw(num) {
    ob.changeDraw(num);
}

function clickintroduction() {
    ob.introduction();
}

function clickindex() {
    // window.open("index.html")
    window.location.href="index.html";
}


function selectopen(j) {
    if(j==1){
        window.location.href=("kami.html");
    }
    else if(j==2){
        window.location.href=("kami2.html");
    }

}