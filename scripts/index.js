function init(){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
    });
    main.appendChild(section);
}

init();