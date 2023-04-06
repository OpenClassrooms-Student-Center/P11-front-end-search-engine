const resultsSection = document.querySelector(".results");

const recipesFiltre = recipes

async function displayRecipes(recipesDisplay) {
    
    console.log(recipesDisplay);

    recipesDisplay.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
    });
};

async function init() {
    // Récupère les datas des photographes

    displayRecipes(recipesFiltre)
};

init();

