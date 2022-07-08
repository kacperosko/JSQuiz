
var bg_colors = {a1:"#7AE6B3", a2:"#41C0F2", a3:"#FFE870", a4:"#F272C5"};
let q;
var how_many;
function saveData(data) {
    q=data.qusetions;
    how_many=data.count}
const questions_url = '/j.json';
async function getQuestions() {
    const response = await fetch(questions_url);
    const data = await response.json();
    console.log(data.count);
    loadData(data.qusetions);
    saveData(data);
}  
window.onload = function() {
    getQuestions();
}

var bool = true;
var question_count = 0;
var correct;
function  loadData(data) {
    console.log(data);
    bool = true;
    document.getElementById('title').innerHTML = data[question_count][0];

    document.getElementById('a1').innerHTML = data[question_count][1];
    document.getElementById('a2').innerHTML = data[question_count][2];
    document.getElementById('a3').innerHTML = data[question_count][3];
    document.getElementById('a4').innerHTML = data[question_count][4];
    correct = data[question_count][5];
    question_count++;
}

function next_step(id){
    for (const [key, value] of Object.entries(bg_colors)){
        document.getElementById(key).classList.add(key);
    }
    document.getElementById(id).style.backgroundColor = "";
    document.getElementById(id).style.color = '#000000';

    if(is_next_question()){
        loadData(q)
    }
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
function animate(id, correction){
    if (correction){
        document.getElementById('popup-text').innerHTML = "Brawo to poprawna odpowiedź!";
    }else{
        document.getElementById('popup-text').innerHTML = "Niestety nie trafiłeś...";
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
    // document.getElementById("popup-box").classList.remove("down");
}
var correct_bool;
function is_correct(id){
    console.log(parseInt(id.slice(-1)) +" "+correct);
    if (parseInt(id.slice(-1)) == correct){
        console.log("POPRAWNE!");
        correct_bool = true;
        
    }else{
        correct_bool = false;
        console.log("NOOO!");
    }
    animate(id, correct_bool);
    // next_step(id);
    bool = true;
}

function is_next_question(){
    // console.log("COUNTER "+question_count+" : " +how_many)
    if(question_count == how_many){
        //zakoncz gre -- final screen z wynikiem
        return false;
    }
    return true;
}

var div = document.getElementById('a1');
function sign(id) {
    if(bool){
        document.getElementById(id).style.backgroundColor = bg_colors[id];
        document.getElementById(id).style.color = '#ffffff';
        console.log("Zmienilem bg dla", id, ", na:", bg_colors[id])
        
        for (const [key, value] of Object.entries(bg_colors)){
            document.getElementById(key).classList.remove(key);
        }
        bool = false;

        is_correct(id);
    }
    console.log(q);
}
