let tabIngredients;
let tabUstensiles;
let tabAppareils;

//          CREATION DES TABLEAUX BOUTONS FILTRE

function creaListeFiltre(recettesParam) {
    tabIngredients = [];
    tabUstensiles = [];
    tabAppareils = [];

    recettesParam.forEach(recette => {
        //Je fais mon tableau
        recette.ingredients.map((ingredient) => {
            tabIngredients.push(ingredient.ingredient);
        });
        recette.ustensils.map((ustensile) => {
            tabUstensiles.push(ustensile);
        });
        tabAppareils.push(recette.appliance);
    });

    //Je trie pour supp les doublons    
    tabIngredients = [...new Set (tabIngredients)].sort();
    tabUstensiles = [...new Set (tabUstensiles)].sort();
    tabAppareils = [...new Set (tabAppareils)].sort();

}

//          CREATION DES LISTES BOUTONS FILTRE

function creaListeDom(tabTag, id){
    //........je crée un UL et des LI generique.............
    const divListe = document.getElementById(id + "_div");
    divListe.innerHTML = "";

    const ul = document.createElement("ul");
    ul.id = id;

    divListe.appendChild(ul);

    tabTag.forEach(e => {
        const li = document.createElement("li");
        li.className = "li_" + id;
        li.innerHTML = e;
        ul.appendChild(li)
    });
}




//      APPARITION DES TAGS SELECTIONNES 
// construction de la zone tag selectionne

//............ESSAI DE REFACTORISATION .............

const divListeIng = document.getElementById("ingredients_div");
const divListeApp = document.getElementById("appareils_div");
const divListeUst = document.getElementById("ustensiles_div");

var ulTag = document.getElementById("tag");

//Création des balises du Dom pour les tags
function creaTagDom (e, id){
    const liTag = document.createElement("li");
    liTag.className = "li_" + id;
    liTag.id = "li_" + e.target.textContent;

    const spanTag = document.createElement("span");
    spanTag.className = "span_" + id;

    const iTag = document.createElement("i");
    iTag.className = "far fa-times-circle";
    iTag.id = "close_" + e.target.textContent;
    iTag.onclick = closeTag;

    spanTag.innerHTML = e.target.textContent;

    liTag.appendChild(spanTag);
    liTag.appendChild(iTag);
    ulTag.appendChild(liTag);

}
//**************************************************************************************** */

//fonction de suppression du tag avec la croix

function closeTag(e){

    ulTag.removeChild(e.target.parentNode);

    tabIng.splice(e); //supprime l'element e du tableau et crée un nouveau tableau de tag

    tabApp.splice(e);

    tabUst.splice(e);

    recettes = recipes;

    filtreTag();
    filtreBarre();

    displayRecette(recettes);
    displayListe(recettes);
}


//*************************************************************************************** */

//Filtre entre les tags et les recettes

//création de tableau vide des tags
var tabUst = [];
var tabApp = [];
var tabIng = [];

function filtreTag(){
    //remise à zéro des tableau des tags
    tabUst = [];
    tabApp = [];
    tabIng = [];

    //récupère le li qui est contenu dans ultag(element enfant)
    Array.from(ulTag.children).forEach(e => {
            if(e.children[0].className == "span_ustensiles"){
                 //si l'element enfant à la class span_ustensiles
                tabUst.push(e.children[0].textContent.toLowerCase());
                //je le mets dans le tableau des ustensiles
            }
            if(e.children[0].className == "span_appareils"){
                tabApp.push(e.children[0].textContent.toLowerCase());
            }

            if(e.children[0].className == "span_ingredients"){
                tabIng.push(e.children[0].textContent.toLowerCase());
            }
    })

        // every : teste si tous les element d'un tableau verifient une condition, renvoie true
        // some : teste si au moins un element du tableau passe le test, renvoie booleen


    if (ulTag.childElementCount > 0){ 

        //si ultag contient quelque chose
        resultatTag = recettes.filter(recette => {  //je parcours les recettes
            return (                                //et je retourne, la comparaison entre les tableaux et les recettes
                //test si tous les éléments contenus dans tab...sont inclus dans au moins une recette
                tabApp.every(app => recette.appliance.toLowerCase().includes(app)) &&
                //test sur tous les elements du tableau crée et parcours du tableau initial pour verifier au moins un element
                tabUst.every(ust => recette.ustensils.some ((ustensile) => ustensile.toLowerCase().includes(ust))) &&
                tabIng.every(ing => recette.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(ing)))
                
            )    
        });

        recettes = resultatTag;
    }else{
        resultatTag = recettes;
    }
    displayRecette(resultatTag);
    displayListe(resultatTag);
}


//evenement au click sur un mot de la liste
divListeIng.addEventListener("click", (e)  => {

    if(tabIng.includes(e.target.textContent.toLowerCase())){    //permet de ne pas selectionner 2 fois le même mot de la liste
    
    }else{
        creaTagDom(e,"ingredients");    //j'appel la fonction de créa dans le dom
        filtreTag();// j'appel la fonction de trie des recettes en relation avec les tags
    }
});


divListeUst.addEventListener("click", (e) => {

    if(tabUst.includes(e.target.textContent.toLowerCase())){

    }else{
        creaTagDom(e,"ustensiles");
        filtreTag();
    }
});

divListeApp.addEventListener("click", (e) => {

    if(tabApp.includes(e.target.textContent.toLowerCase())){

    }else{
        creaTagDom(e,"appareils");
        filtreTag();
    }
}); 





//....................OUVERTURE DES LISTES
const openBtnIngredient = document.getElementById("ingredients-down");
const openBtnAppareil = document.getElementById("appareils-down");
const openBtnUstensile = document.getElementById("ustensiles-down");
const btnIngredient = document.querySelector(".btn_ingredients");
const btnAppareil = document.querySelector(".btn_appareils");
const btnUstensile = document.querySelector(".btn_ustensiles");
const ListeIngredients = document.querySelector(".liste_ingredients");
const ListeAppareils = document.querySelector(".liste_appareils");
const ListeUstensiles= document.querySelector(".liste_ustensiles");

openBtnIngredient.addEventListener("click", openListeIngredients);

function openListeIngredients(){
    openBtnIngredient.style.display = "none";
    ListeIngredients.style.display = "block";
    ListeAppareils.style.display = "none";
    ListeUstensiles.style.display = "none";
    openBtnAppareil.style.display = "block";
    openBtnUstensile.style.display = "block";
    btnAppareil.style.transform = "translateX(350px)";
    btnUstensile.style.transform = "translateX(300px)";
}

openBtnAppareil.addEventListener("click", openListeAppareils);

function openListeAppareils(){
    openBtnAppareil.style.display = "none";
    ListeAppareils.style.display = "block";
    ListeIngredients.style.display = "none";
    ListeUstensiles.style.display = "none";
    openBtnIngredient.style.display = "block";
    openBtnUstensile.style.display = "block";
    btnUstensile.style.transform = "translateX(370px)";
    btnAppareil.style.transform = "translateX(0px)";
}

openBtnUstensile.addEventListener("click", openListeUstensiles);

function openListeUstensiles(){
    openBtnUstensile.style.display = "none";
    ListeUstensiles.style.display = "block";
    ListeIngredients.style.display = "none";
    ListeAppareils.style.display = "none";
    openBtnIngredient.style.display = "block";
    openBtnAppareil.style.display = "block";
    btnAppareil.style.transform = "translateX(-10px)";
}
    
    
//................FERMETURE DES LISTES
const closeIngredient = document.getElementById("ingredients-up");
const closeAppareil = document.getElementById("appareils-up");
const closeUstensile = document.getElementById("ustensiles-up");

closeIngredient.addEventListener("click", closeListeIngredients);

function closeListeIngredients(){
    openBtnIngredient.style.display = "block";
    ListeIngredients.style.display = "none"; 
    btnAppareil.style.transform = "translateX(0)";
    btnUstensile.style.transform = "translateX(0)"; 
}

closeAppareil.addEventListener("click", closeListeAppareils);

function closeListeAppareils(){
    openBtnAppareil.style.display = "block";
    ListeAppareils.style.display = "none";
    btnUstensile.style.transform = "translateX(0)";
}

closeUstensile.addEventListener("click", closeListeUstensiles);

function closeListeUstensiles(){
    openBtnUstensile.style.display = "block";
    ListeUstensiles.style.display = "none";
    btnUstensile.style.transform = "translateX(0)";
}

