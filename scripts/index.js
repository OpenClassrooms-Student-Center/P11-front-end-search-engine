function init(){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const searchInput = document.getElementById("search");
    section.classList.add("articles");
    const inputBg = "#E7E7E7";
    searchInput.style.background = inputBg;
    main.appendChild(section);
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    setRecipesDOM();
} 

function setRecipesDOM(){
    const searchInput = document.getElementById("search");
    const section = document.querySelector(".articles");
    const listOfRecipes = [];
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipe);
    });
    searchInput.addEventListener("input", function eventSearchInput(e){
        searchInput.style.animation = "none";
        research(listOfRecipes, e);
    });
}

function research(listOfRecipes, event){
    const search = event.target.value.toLowerCase();
    const section = document.querySelector(".articles");
    const searchInput = document.getElementById("search");
    
    if(search.length >= 3){
        const searchRegex = new RegExp(search);
        const index = [];
        console.log(index);
        let articleDelete = 0;
        listOfRecipes.forEach(recipe => {
            let findName = false;
            let findIngredient = false;
            let findDescription = false;
            if(recipe.name.toLowerCase().match(searchRegex)){
                findName = true;
            }
            recipe.ingredients.forEach(ingredient => {
                if(ingredient.ingredient.toLowerCase().match(searchRegex)){
                    findIngredient = true;
                }                            
            });
            if(recipe.description.toLowerCase().match(searchRegex)){
                findDescription = true;
            }
            if(findName === false && findIngredient === false && findDescription === false){
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
        reloadSearch(section,searchInput,event);
    }
}

function reloadSearch(section, searchInput, event){
    const errorColor = "#e54858";
    if(section.children.length === 0){
        searchInput.style.animation = "errorInput 100ms 5";
        searchInput.style.border = errorColor;
        searchInput.removeEventListener("input",event);
        searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
        event.target.value = "";
        event.target.blur();
        setRecipesDOM();
    }
}

init();