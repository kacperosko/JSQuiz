var start_btn = document
  .getElementById("start")
  .addEventListener("click", function () {
    sessionStorage.setItem(
      "path",
      document.getElementById("select-path").value
    );
    location.href = "/static/pages/quiz.html";
  });
const questions_url = "/files.json";
const questions_dir = "/questions/";
let temp;
async function getJSON(url) {
  const response = await fetch(url);
  const data = await response.json();

  temp = data;
}

var paths = [];
var titles_dic = {};
async function getPaths(tab) {
  // console.log(tab);
  for (let i = 0; i < tab.length; i++) {
    paths.push(tab[i]);
  }
}

async function getTitleFromJSON() {
  for (let i = 0; i < paths.length; i++) {
    const response = await fetch(questions_dir + paths[i]);
    const data = await response.json();
    titles_dic[data.title] = questions_dir + paths[i];
    console.log(titles_dic)
  }
}
function load_select(dic) {
  for (const [key, value] of Object.entries(dic)) {
    document.getElementById("select-path").innerHTML +=
      "<option value=" + value + ">" + key + "</option>";
  }
}

// window.onload = function () {
getJSON(questions_url)
    .then(() => getPaths(temp.filesName))
    .then(() => getTitleFromJSON())
    .then(() => load_select(titles_dic));

sessionStorage.setItem("score", 0);
sessionStorage.setItem("question_count", 0);
//   };