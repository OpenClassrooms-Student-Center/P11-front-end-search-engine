function init(){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const searchInput = document.getElementById("search");
    const listOfRecipes = [];
    const errorColor = "#e54858";
    const inputBg = "#E7E7E7";
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipeArticle);
    });
    main.appendChild(section);
    searchInput.addEventListener("input", function(e){
        const search = e.target.value.toLowerCase();
        searchInput.style.background = inputBg;
        searchInput.style.animation = "none";
        if(search.length >= 3){
            const searchRegex = new RegExp(search);
            const index = [];
            console.log(index);
            let articleDelete = 0;
            listOfRecipes.forEach(recipe => {
                if(!recipe.children[0].children[0].children[0].textContent.toLowerCase().match(searchRegex)){
                    index.push(listOfRecipes.indexOf(recipe));
                }
            });
            if(index.length > 0){
                //on supprime les articles correspondants
                index.forEach(index => {
                    listOfRecipes.splice(index-articleDelete,1);
                    section.removeChild(section.children[index-articleDelete]);
                    articleDelete += 1;
                });
            }
            if(section.children.length === 0){
                searchInput.style.animation = "errorInput 100ms 5";
                searchInput.style.border = errorColor;
                searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
                e.target.value = "";
                e.target.blur();
                recipes.forEach(recipe => {
                    recipesModel = recipesFactory(recipe);
                    const recipeArticle = recipesModel.getRecipesCardDOM();
                    section.appendChild(recipeArticle);
                    listOfRecipes.push(recipeArticle);
                });
            }
        }
    });
} 

init();

