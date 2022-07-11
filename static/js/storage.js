let word ="";
let score = sessionStorage.getItem('score');
if(score == 1){
    word = "punkt"
}else if(score <5){
    word = "punkty"
}else{
    word = "punktów"
}
document.getElementById('scoreFinal').innerHTML = score +" "+word;
sessionStorage.clear()

// sessionStorage.setItem('fname','Bob');
// sessionStorage.setItem('lname','Thomas');

// console.log(sessionStorage.getItem('fname'));
// console.log(sessionStorage.getItem('lname'));

// //returns null
// console.log(sessionStorage.getItem('firstname'));

// //removes the item with key and value
// sessionStorage.removeItem('fname');
// //clears the entire storage
// sessionStorage.clear()