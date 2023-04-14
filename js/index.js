const resultsSection = document.querySelector(".results");
const ustensilesResults = document.querySelector(".rechercheUstensiles");
const recipesFiltre = recipes
let recipesDisplay = ""

//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    
    console.log(recipesDisplay);

    recipesDisplay.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
    });
};

//Pour chaque ustensile

function dropdownUstensils(ustDisplay){
    ustDisplay.forEach((ustensile) =>{
        const ustensileEngine = recipesFactory(recipe);
        const ustensileDOM = ustensileEngine.getDropdown();
        ustensilesResults.appendChild(ustensileDOM);
    })

}


async function init() {

    displayRecipes(recipesFiltre)
};

init();

