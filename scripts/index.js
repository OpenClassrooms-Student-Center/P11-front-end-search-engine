function displayListe(recette) {
    creaListeFiltre(recette);
    creaListeDom(tabIngredients, "ingredients");
    creaListeDom(tabAppareils, "appareils");
    creaListeDom(tabUstensiles, "ustensiles");

}

function displayFiltreBtn() {
    filtreBtn(tabIngredients, "ingredients");
    filtreBtn(tabAppareils, "appareils");
    filtreBtn(tabUstensiles, "ustensiles");
}


const cartesRecettes = document.querySelector(".cartes_recettes");

function displayRecette(recettes) {
    cartesRecettes.innerHTML = "";
    recettes.forEach(recette => {
        const creaData = new dataRecettes(recette);
        const creaCarte = creaData.creaCarteDom();
        cartesRecettes.appendChild(creaCarte);
    });
}

const recettes = recipes;

function init() {
    displayRecette(recettes);
    displayListe(recettes);
    displayFiltreBtn();

}

init();