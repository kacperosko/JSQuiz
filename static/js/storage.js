let word ="";
let score = sessionStorage.getItem('score');
if(score == 1){
    word = "point"
}else{
    word = "points"
}

document.getElementById('scoreFinal').innerHTML = score +" "+word;
sessionStorage.clear()