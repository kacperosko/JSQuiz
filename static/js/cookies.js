function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
let word ="";
let score = getCookie('score');
if(score == 1){
    word = "punkt"
}else if(score <5){
    word = "punkty"
}else{
    word = "punktów"
}
document.getElementById('scoreFinal').innerHTML = score +" "+word;