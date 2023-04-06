const resultsSection = document.querySelector(".results");

async function getRecipes() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    return ({
        recipes : recipe})
    
}

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
    const { recipes } = await getRecipes();
    displayRecipes(recipes)
};

init();

