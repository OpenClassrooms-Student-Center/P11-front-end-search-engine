// AFFICHE LA LISTE DES FILTRES DANS LES BOUTONS
// const ingredientsFilterBtn = document.querySelector("input_control input_control_2");
// const appliancesFilterBtn = document.querySelector("input_control input_control_3");
// const ustensilsFilterBtn = document.querySelector("input_control input_control_4");

// const ingredientsDropDownList = document.querySelector();
// const appliancesDropDownList = document.querySelector();
// const ustensilsDropDownList = document.querySelector();

// RECUPERE LA LISTE DE TOUS LES INGREDIENTS

// contiendra ts les ingrédients y compris les doublons
const allIngredients = [];
// i pour itération tant que les objets que les objets (du tableau) sont inférieur à la longueur du tableau, puis à la fin d'une itération continuer en ajoutant 1.
for (let i=0; i<recipes.length; i++) {
// ds recipes on récupère l'index sur lequel on est, ainsi que l'élément ingredients qui est lui même un tableau ds le tableau recipes
    let ingredients = recipes [i].ingredients; 
// méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant
    ingredients.map(({ingredient}) => {
        // La méthode .push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
        // La méthode .toLowerCase() remplace toites les majuscules en minuscules.
        allIngredients.push(`${ingredient.toLowerCase()}`);
        
    });
}
const ingredientsNoDuplicates = new Set(allIngredients);
// console.log(ingredientsNoDuplicates);

const allAppliances = [];
for (let i=0; i<recipes.length; i++) {
    let appliances = recipes [i].appliance;
    allAppliances.push(appliances);
}
const appliancesNoDuplicates = new Set(allAppliances);
// console.log(appliancesNoDuplicates);

const allUstensils = [];
for (let i=0; i<recipes.length; i++) {
    let ustensils = recipes [i].ustensils;
    allUstensils.push(ustensils);
};

const ustensilsNoDuplicates = new Set(allUstensils.flat());


for (const element of ustensilsNoDuplicates) {
    // console.log(element.toLowerCase());
}

// console.log(ustensilsNoDuplicates);

// BARRE DE RECHERCHE ECOUTEUR D'EVENEMENT SUR PRESSION DU CLAVIER
const searchInput = document.querySelector("#search");

// la méthode .keyup() permet de mettre l'écouteur d'événement dès qu'une touche est pressée- (e) pour évèvement(ds la console il correspond à un tableau de bord avec de nombreux élément dont value qui sera les caractères saisis)
searchInput.addEventListener("keyup",(e) => { 
    // target est l'un des élément de l'évènement(e), ici c'est l'input
    console.log(e)
    const searchedLetters = e.target.value;
    console.log(searchedLetters)
    // récupère toutes les cartes de recettes 
    const cardsRecipes = document.querySelectorAll(".recipe_article");
    // console.log(cardsRecipes)
    filterElements(searchedLetters, cardsRecipes)
});

// elements correspond aux cartes et letters aux lettres saisies
function filterElements (letters, elements) {
    // la fct se déclenchera uniquement lorsque l'utilisateur auras saisi plus de 2 caractèress.
    if (letters.length >2) {
        for (let i=0; 1<elements.length; i++){
            // si les lettres saisies est inclut dans les cartes de recettes 
            if(elements[i].textContent.toLowerCase().includes(letters)) {
                elements[i].style.display = "block";        
            }else {
                elements[i].style.display = "none";
            }
        }
    }
}



