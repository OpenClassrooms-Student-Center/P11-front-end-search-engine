const resultsSection = document.querySelector(".results");

const recipes = recipe[0]

async function displayRecipes(recipes) {
    
    console.log(recipes);

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

