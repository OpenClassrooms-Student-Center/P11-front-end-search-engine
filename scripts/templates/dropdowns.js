//gère déroulement et fermeture des drops down
let dropIngrBtn = document.getElementById("ingredients-down");
let dropAppBtn = document.getElementById("appareils-down");
let dropUstBtn = document.getElementById("ustensiles-down");
let dropIngrBtnClos = document.getElementById("ingredients-up");
let dropAppBtnClos = document.getElementById("appareils-up");
let dropUstBtnClos = document.getElementById("ustensiles-up");
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
  document.getElementById("drop-ing_close").style.display = "flex";
  document.getElementById("drop-ust_open").style.display = "none";
  document.getElementById("drop-ust_close").style.display = "flex";
  document.getElementById("drop-app_open").style.display = "none";
  document.getElementById("drop-app_close").style.display = "flex";
}

function openDropIngr() {
  document.getElementById("drop-ing_open").style.display = "flex";
  document.getElementById("drop-ing_close").style.display = "none";
  document.getElementById("drop-app_close").style.display = "flex";
  document.getElementById("drop-app_open").style.display = "none";
  document.getElementById("drop-ust_close").style.display = "flex";
  document.getElementById("drop-ust_open").style.display = "none";
}

function openDropApp() {
  document.getElementById("drop-app_open").style.display = "flex";
  document.getElementById("drop-app_close").style.display = "none";
  document.getElementById("drop-ing_close").style.display = "flex";
  document.getElementById("drop-ing_open").style.display = "none";
  document.getElementById("drop-ust_close").style.display = "flex";
  document.getElementById("drop-ust_open").style.display = "none";
}

function openDropUst() {
  document.getElementById("drop-ust_open").style.display = "flex";
  document.getElementById("drop-ust_close").style.display = "none";
  //close other dropdowns
  document.getElementById("drop-app_close").style.display = "flex";
  document.getElementById("drop-app_open").style.display = "none";
  document.getElementById("drop-ing_close").style.display = "flex";
  document.getElementById("drop-ing_open").style.display = "none";
}
