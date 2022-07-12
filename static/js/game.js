
var bg_colors = {a1:"#7AE6B3", a2:"#41C0F2", a3:"#FFE870", a4:"#F272C5"};
var pop_msg = {true: ["That's correct!", "Excellent, this is good answer", "Congrats, good answer!!!", "Wow! You're amazing"],
                false:["Unfortunally that's incorrect", "Not this time but keep trying", "This answer doesn't look correct", "Bad shoot, try again"]}
var how_many, msg, q;
function saveData(data) {
    q=data.qusetions;
    how_many=data.qusetions.length
}
const questions_url = sessionStorage.getItem('path');
async function getQuestions() {
    const response = await fetch(questions_url);
    const data = await response.json();
    loadData(data.qusetions);
    saveData(data);
    document.getElementById('how_many').innerHTML = how_many;
    document.getElementById('score').innerHTML =  sessionStorage.getItem('score');
}  
window.onload = function() {
    getQuestions();
}

var bool = true;
var correct;
var actuall_q = 1;
function  loadData(data) {
    bool = true;

    var question_count = parseInt(sessionStorage.getItem('question_count'));
    
    document.getElementById('title').innerHTML = data[question_count][0];

    document.getElementById('a1').innerHTML = data[question_count][1];
    document.getElementById('a2').innerHTML = data[question_count][2];
    document.getElementById('a3').innerHTML = data[question_count][3];
    document.getElementById('a4').innerHTML = data[question_count][4];

    document.getElementById('page').innerHTML = parseInt(sessionStorage.getItem('question_count'))+1;
    correct = data[question_count][5];
    // saveCookies('question_count', question_count++);

}

function next_step(id){
    document.getElementById(id).style.backgroundColor = "";
    document.getElementById(id).style.color = '#000000';
    for (const [key, value] of Object.entries(bg_colors)){
        document.getElementById(key).classList.add(key);
    }
    if(is_next_question()){
        loadData(q)
    }
    if (correct_bool){
        sessionStorage.setItem("score", parseInt(sessionStorage.getItem('score'))+1)
        document.getElementById('score').innerHTML =  sessionStorage.getItem('score');
    }
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function animate(id, correction){
    msg = pop_msg[correction];
    msg = msg[Math.floor(Math.random() * msg.length)];
    if (correction){
        document.getElementById('popup-text').innerHTML = msg;
        document.getElementById('popup-box').style.backgroundColor = '#17ba3d'
    }else{
        document.getElementById('popup-text').innerHTML = msg;
        document.getElementById('popup-box').style.backgroundColor = '#c1300c'
    }

    document.getElementById("popup").style.display = 'flex';   

    document.getElementById("popup-box").classList.add("up");

    sleep(2000).then(() => {
        document.getElementById("popup-box").classList.remove("up");
        document.getElementById("popup-box").classList.add("down");
    });
    sleep(3000).then(() => {
        document.getElementById("popup").style.display = 'none';   
        document.getElementById("popup-box").classList.remove("down");
        next_step(id)
    });
}
var correct_bool;
function is_correct(id){
    if (parseInt(id.slice(-1)) == correct){
        correct_bool = true;
    }else{
        correct_bool = false;
    }
    animate(id, correct_bool);
    bool = true;
}
function is_next_question(){
    if((parseInt(sessionStorage.getItem('question_count'))+1) == how_many){
        //zakoncz gre -- final screen z wynikiem
        sessionStorage.setItem("score", parseInt(sessionStorage.getItem('score'))+1);
        // document.cookie = "score="+score;
        var $mainDiv = jQuery("div");
        $mainDiv.attr('id', "main");
        $mainDiv.load('final.html')
        
        return false;
    }
    sessionStorage.setItem('question_count', parseInt(sessionStorage.getItem('question_count'))+1);
    return true;
}

var div = document.getElementById('a1');
function sign(id) {
    if(bool){
        document.getElementById(id).style.backgroundColor = bg_colors[id];
        document.getElementById(id).style.color = '#ffffff';
        for (const [key, value] of Object.entries(bg_colors)){
            document.getElementById(key).classList.remove(key);
        }
        bool = false;

        is_correct(id);
    }
}

function again(){
    location.href = "../../index.html";
}