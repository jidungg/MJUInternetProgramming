var theWord = '';
var nowPos ;
var rope ='||';
var ropeLength ;
var initialEnemyPower = 300;
var initialRopeLength = 11;
var enemyPower; 
var enemyTimer;

var wordData = ['김치', '감자', '엄마', '아빠', '김지완', '인터넷', '프로그래밍','데이터베이스', '운영체제', '김치볶음밥'];

$(document).ready(function(){
    alert('asdf');
    $('#enemyPower').val(initialEnemyPower);
    $('#ropeLength').val(initialRopeLength);
    $('#textBox').keydown(function(e){
        if(e.keyCode ==13){
            enter();
        }
    });
});

function initialize(){

    for(i=1 ; i <= ropeLength ; i++){
        var tmp ="<strong >||</strong><br>";
        $(tmp).attr('id','board'+i).addClass('board').prependTo('#nick');
        $('#board'+i).html(rope);
    }
    nowPos = Math.round(ropeLength/2);
    enemyPower = $('#enemyPower').val();
    clearTimeout(enemyTimer);
}
function start(){
    ropeLength = $('#ropeLength').val();
    if(ropeLength%2 == 0){
        alert('길이는 홀수만 가능');
        return;
    }
    initialize();
    var textBox = $('#textBox').attr('disabled', true);
    setTimeout(function(){
        textBox.attr('disabled', false);
        textBox.focus();
        update();
    },3000)
}
function enemyAttack(){
    //1글자 치는데 = 1000*60/enemyPower ms
    clearTimeout(enemyTimer);
    var attackInterval = theWord.length * (60000/enemyPower) + 500;

    enemyTimer = setTimeout(function(){
        $('#board'+nowPos).html(rope);
        nowPos --;
        if(nowPos <= 0){
            lose();
        }else{
            update();
        }
    },attackInterval);
}
function enter(){
    var value = $('#textBox').val();
    if(theWord == value){
        correct();
    }else{
        $('#textBox').val('');
    }
}

function correct(){
    $('#board'+nowPos).html(rope);

    nowPos ++;
    if(nowPos > ropeLength){
        win();
    }else{
        update();
    }
}
function update(){
    theWord = wordData[Math.floor(Math.random()*wordData.length)];
    $('#board'+nowPos).html(theWord);
    $('#textBox').val('');
    enemyAttack();
}
function win(){
    alert('이겼당');
    $('.board').remove();
}
function lose(){
    alert('졌당');
    $('.board').remove();
}