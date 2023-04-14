const resultsSection = document.querySelector(".results");

const recipesFiltre = recipes

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

async function dropdownUstensils(){
    const ustensils = recipesFiltre.ustensils;
    console.log(ustensils);
    let ustensilsList = document.querySelectorAll("rechercheUstensiles")
    ustensils.forEach((ustensils) => {
        ustensilsList.innerHTML += `<li class="rechercheUstensiles_open">${ustensils}</li>`;
    })
}


async function init() {

    displayRecipes(recipesFiltre)
};

init();

