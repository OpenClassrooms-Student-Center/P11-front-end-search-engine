//Renseigne la fonction creaListeDom pour les paramètres
function displayListe (recette) {
    creaListeFiltre(recette);
    creaListeDom(tabIngredients, "ingredients");
    creaListeDom(tabAppareils,  "appareils");
    creaListeDom(tabUstensiles,  "ustensiles");
}

//Renseigne la fonction filtreBtn pour les paramètres
function displayFiltreBtn (){
    filtreBtn(tabIngredients, "ingredients");
    filtreBtn(tabAppareils,  "appareils");
    filtreBtn(tabUstensiles,  "ustensiles");
}

//              RECHERCHE AVEC BOUTON FILTRE
let suggestion = "";

function filtreBtn(tabTag, id){
    const inputBtn = document.getElementById("input_" + id);

    const inputBarre = inputBtn.value;

    //Je filtre en fonction des caractères saisis
    if(inputBarre.length >= 1) {
        const resultFiltre = tabTag.filter(el => el.toLowerCase().includes(inputBarre.toLowerCase()));
        
        suggestion = "";
        //Je parcour le tableau de resultat et j'affiche les suggestions
        resultFiltre.forEach(el =>
            suggestion += `
            <li class = li_choix_${id}, value = "${el}">${el}</li>`
        )

        document.getElementById(id).innerHTML = suggestion;
        
    }else{
        creaListeDom(tabTag, id);
    }
    inputBtn.addEventListener("input", displayFiltreBtn);

}


let cartesRecettes = document.querySelector(".cartes_recettes");

//Message en cas de recette non trouvée
function pasDeRecette(){
    cartesRecettes.innerHTML = "";

    const divnull = document.createElement("div");
    divnull.id = "pas_de_recette";
    divnull.textContent = 'Aucune recette ne correspond à vos critères, veuillez modifier votre recherche svp. Vous pouvez chercher "tarte aux pommes", "poisson", etc...';
    cartesRecettes.appendChild(divnull);
}

function displayRecette (recettes) {
    cartesRecettes.innerHTML = "";

    recettes.forEach(recette => {
        const creaData = new dataRecettes(recette);
        const creaCarte = creaData.creaCarteDom();
        cartesRecettes.appendChild(creaCarte);
    });
}

var recettes = recipes;

function init () {
    displayRecette(recettes);
    displayListe(recettes);
    displayFiltreBtn();
}

init ();