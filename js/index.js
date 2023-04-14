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

function dropdownUstensils(){
    const ustensils = recipes.ustensils;
    console.log(ustensils);
    console.log(ustensil);
    let ustensilsList = document.querySelectorAll("rechercheUstensiles")
    ustensils.forEach((ustensil) => {
        ustensilsList.innerHTML += `<li class="rechercheUstensiles_open">${ustensil}</li>`;
    })
}


async function init() {

    displayRecipes(recipesFiltre)
};

init();

