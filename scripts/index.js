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
    setDOM();
} 

function setDOM(){
    const searchInput = document.getElementById("search");
    const tagsBtn = document.getElementsByClassName("tools__menu");
    const section = document.querySelector(".articles");
    const listOfRecipes = [];
    const ingredientsArray = [];
    const applianceArray = [];
    const ustensilsArray= [];
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        recipesModel.setItemsDOM(recipesModel.ingredients,ingredientsArray);
        recipesModel.setItemsDOM(recipesModel.appliance, applianceArray);
        recipesModel.setItemsDOM(recipesModel.ustensils,ustensilsArray);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipe);
    });
    searchInput.addEventListener("input", function eventSearchInput(e){
        searchInput.style.animation = "none";
        research(listOfRecipes, e);
    });
    const arrayTagsBtn = [].slice.call(tagsBtn);
    console.log(arrayTagsBtn);
    arrayTagsBtn.forEach(btn => {
        btn.addEventListener("click", function(e){
            btn.lastElementChild.classList.remove("menu__item--hidden");
            btn.classList.add("tools__menu--active");
            switch(btn.children[0].children[1].value){
                case "Ingrédients":
                    btn.children[0].children[1].setAttribute("placeholder","Rechercher un ingrédient");
                    break;
                case "Appareils":
                    btn.children[0].children[1].setAttribute("placeholder","Rechercher un appareil");
                    break;
                case "Ustensiles":
                    btn.children[0].children[1].setAttribute("placeholder","Rechercher un ustensile");
            }
            btn.children[0].children[1].value = "";
            btn.children[0].children[1].focus();
        });
        btn.children[0].children[1].addEventListener("blur",function(e){
            btn.lastElementChild.classList.add("menu__item--hidden");
            btn.classList.remove("tools__menu--active");
            console.log(btn.children[0].children[1].classList[1]);
            switch(btn.children[0].children[1].placeholder){
                case "Rechercher un ingrédient":
                    btn.children[0].children[1].value = "Ingrédients";
                    break;
                case "Rechercher un appareil":
                    btn.children[0].children[1].value = "Appareils";
                    break;
                case "Rechercher un ustensile":
                    btn.children[0].children[1].value = "Ustensiles";
            }
            btn.children[0].children[1].removeAttribute("placeholder");
            btn.children[0].children[1].removeEventListener("blur",e);
        });
    });
}

function research(listOfRecipes, event){
    const search = event.target.value.toLowerCase();
    const section = document.querySelector(".articles");
    const searchInput = document.getElementById("search");
    
    if(search.length >= 3){
        const searchRegex = new RegExp(search);
        const indexList = [];
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
                indexList.push(listOfRecipes.indexOf(recipe));
            }
        });
        if(indexList.length > 0){
            //on supprime les articles correspondants
            indexList.forEach(index => {
                listOfRecipes.splice(index-articleDelete,1);
                section.removeChild(section.children[index-articleDelete]);
                articleDelete += 1;
            });
        }
        if(section.children.length === 0){
            reloadSearch(searchInput,event);
        }
    }
}

function reloadSearch(searchInput, event){
    const errorColor = "#e54858";
    searchInput.style.animation = "errorInput 100ms 5";
    searchInput.style.border = errorColor;
    searchInput.removeEventListener("input",event);
    searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
    event.target.value = "";
    event.target.blur();
    setDOM();
}

init();