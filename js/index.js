const resultsSection = document.querySelector(".results");

const recipe = recipes

async function displayRecipes(recipe) {
    
    console.log(recipe);

    recipes.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        photographersSection.appendChild(recipeDOM);
    });
};

async function init() {
    // Récupère les datas des photographes

    displayRecipes(recipes)
};

init();

