//gère déroulement et fermeture des drops down

/* let dropIngrBtn = document.querySelectorAll("#ingredients #ingredients-down");
let dropAppBtn = document.querySelectorAll("#appareil, #appareil-down");
let dropUstBtn = document.querySelectorAll("#ustensiles, #ustensiles-down");
let dropIngrBtnClos = document.querySelectorAll(
  "#drop-ingredients_open,#ingredients-up"
);
let dropAppBtnClos = document.querySelectorAll(
  "#drop-appareil_open,#appareil-up"
);
let dropUstBtnClos = document.querySelectorAll(
  "#drop-ustensiles_open,#ustensiles-up"
); */

let dropIngrBtn = document.getElementById("ingredients-down");
let dropAppBtn = document.getElementById("appareil-down");
let dropUstBtn = document.getElementById("ustensiles-down");
let dropIngrBtnClos = document.getElementById("ingredients-up");
let dropAppBtnClos = document.getElementById("appareil-up");
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
