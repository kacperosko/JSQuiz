
var start_btn = document.getElementById("start").addEventListener("click", function() {
    // this.style.display = "none";
    // document.getElementById("box").style.visibility = "visible";
    location.href = "/static/pages/quiz.html";
});
const questions_url = '/categories.json';
const questions_dir = '/questions/';
var files;
let temp;
async function getJSON(url) {
    const response = await fetch(url);
    const data = await response.json();

    temp = data.filesName;
    console.log(temp)
}

var paths = [];
async function getPaths(d){
    console.log(d);
    for (let i = 0; i < d.length; i++) {
        paths.push(d[i])
    }
}
function saveCookies(name, value){
    document.cookie = name+"="+value;
    console.log("COOKIE: "+name+"="+value)
}

window.onload = function() {
    // getJSON(questions_url);
    // console.log(temp)
    // getPaths(main_data.filesName);

    // for (let i = 0; i < paths.length; i++) {
    //     const file = paths[i];
    //     console.log(questions_dir+file);
    // }


    sessionStorage.setItem('score', 0);
    sessionStorage.setItem('question_count', 0);
}

function load_select(){
    for (let i = 0; i < files.length; i++) {
        document.getElementById('select-path').innerHTML += "<option>" +files[i] +"</option>";
        
    }
}