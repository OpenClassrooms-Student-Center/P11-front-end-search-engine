const resultsSection = document.querySelector(".results");
let ustensilsList = document.querySelectorAll("rechercheUstensiles")
const recipesFiltre = recipes
const ustensilsFiltre = "";

//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    recipesDisplay.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
    });
};

//Pour chaque ustensile

async function dropdownUstensils(recipes){
    console.log(recipes);
    const ustensils = recipes.ustensils;
    console.log(ustensils);
    
    ustensilsFiltre.forEach((ustensils) => {
        ustensilsList.innerHTML += `<li class="rechercheUstensiles_open">${ustensils}</li>`;
    })
}


async function init() {

    displayRecipes(recipesFiltre)
};

init();

