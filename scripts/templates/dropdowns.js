//gère déroulement et fermeture des drops down
//let dropIngrBtn = document.getElementsByClassName("drop-ingredients");
let dropIngrBtn = document.getElementById("ingredients");
let dropAppBtn = document.getElementById("appareil");
let dropUstBtn = document.getElementById("ustensiles");
let dropIngrBtnClos = document.getElementById("drop-ing_open");
let dropAppBtnClos = document.getElementById("drop-app_open");
let dropUstBtnClos = document.getElementById("drop-ust_open");
let main = document.querySelector(".recipes");
let searchEvery = document.querySelector(".search-every");

dropIngrBtn.addEventListener("click", openDropIngr);
dropAppBtn.addEventListener("click", openDropApp);
dropUstBtn.addEventListener("click", openDropUst);
dropIngrBtnClos.addEventListener("click", closeAll);
dropAppBtnClos.addEventListener("click", closeAll);
dropUstBtnClos.addEventListener("click", closeAll);
main.addEventListener("click", closeAll);
searchEvery.addEventListener("click", closeAll);

function closeAll() {
  document.getElementById("drop-ing_open").style.display = "none";
  document.getElementById("drop-app_open").style.display = "none";
  document.getElementById("drop-ust_open").style.display = "none";
}

function openDropIngr() {
  document.getElementById("drop-ing_open").style.display = "flex";
  document.getElementById("drop-app_open").style.display = "none";
  document.getElementById("drop-ust_open").style.display = "none";
}

function openDropApp() {
  document.getElementById("drop-app_open").style.display = "flex";
  document.getElementById("drop-ing_open").style.display = "none";
  document.getElementById("drop-ust_open").style.display = "none";
}

function openDropUst() {
  document.getElementById("drop-ust_open").style.display = "flex";
  document.getElementById("drop-ing_open").style.display = "none";
  document.getElementById("drop-app_open").style.display = "none";
}
