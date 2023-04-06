const resultsSection = document.querySelector(".results");

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const jsonCall = await fetch('factory/recipeFactory.js');
    const recipesArray = await jsonCall.json();
    
    return ({
        recipe : recipesArray["recipes"]})
}

async function displayRecipes(recipes) {
    
    console.log(photographers);
    recipes.forEach((recipes) => {
        const recipeEngine = recipesFactory(recipes);
        const recipeDOM = recipeEngine.getRecipeDOM();
        photographersSection.appendChild(recipeDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
