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
    setDOM(searchInput);
} 

function setDOM(searchInput){
    const listOfRecipes = [];
    const section = document.querySelector(".articles");
    const ingredientsArray = [];
    const appliancesArray = [];
    const ustensilsArray = [];
    const toolsArray = [ingredientsArray,appliancesArray,ustensilsArray];
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        toolsArray.forEach(toolArray => {
            switch(toolArray){
                case ingredientsArray:   
                    recipesModel.setItemsDOM(recipesModel.ingredients,toolArray);
                    break;
                case appliancesArray:
                    recipesModel.setItemsDOM(recipesModel.appliance,toolArray);
                    break;
                case ustensilsArray:
                    recipesModel.setItemsDOM(recipesModel.ustensils,toolArray);
            }
        });
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipe);
    });
    setEventsDOM(searchInput,listOfRecipes, toolsArray);
}

function research(searchInput, listOfRecipes, toolsArray, event){
    const search = event.target.value.toLowerCase();
    const section = document.querySelector(".articles");
    if(search.length >= 3){
        const searchRegex = new RegExp(search);
        const recipeIndexArray = [];
        listOfRecipes.forEach(recipe => {
            switch(event.target.name){
                case "search":
                    let findName = false;
                    let findDescription = false;
                    if(recipe.name.toLowerCase().match(searchRegex)){
                        findName = true;
                    }
                    if(recipe.description.toLowerCase().match(searchRegex)){
                        findDescription = true;
                    }
                    if(findName === false && findDescription === false && findIngredient(recipe,searchRegex) === false){
                        pushIndexRecipe(listOfRecipes,recipe,recipeIndexArray);
                    }
                    break;
                case "ingredients":
                    if(findIngredient(recipe,searchRegex) === false){
                        pushIndexRecipe(listOfRecipes,recipe,recipeIndexArray);
                    }
                    break;
                case "devices":
                    if(!recipe.appliance.toLowerCase().match(searchRegex)){
                        pushIndexRecipe(listOfRecipes,recipe,recipeIndexArray);
                    }
                    break;
                case "ustensils":
                    let ustensils = false ;
                    recipe.ustensils.forEach(ustensil => {
                        if(ustensil.toLowerCase().match(searchRegex)){
                            ustensils = true;
                        }                    
                    });
                    if(ustensils === false){
                        pushIndexRecipe(listOfRecipes,recipe,recipeIndexArray);
                    }
            }
        });
        if(recipeIndexArray.length > 0){
            let articleDelete = 0;
            //on supprime les articles correspondants
            recipeIndexArray.forEach(recipeIndex => {
                listOfRecipes.splice(recipeIndex-articleDelete,1);
                section.removeChild(section.children[recipeIndex-articleDelete]);
                articleDelete += 1;
            });
            toolsArray.forEach((toolArray,indexTool) => {
                const validItemIndexArray = [];
                const itemIndexArray = [];
                listOfRecipes.forEach( recipe => {
                    switch(indexTool){
                        case 0:
                            recipe.ingredients.forEach(ingredient => {
                                setValidItemsIndex(toolArray,ingredient.ingredient,validItemIndexArray);
                            });
                            break;
                        case 1:
                            setValidItemsIndex(toolArray,recipe.appliance,validItemIndexArray);
                            break;
                        case 2:
                            recipe.ustensils.forEach(ustensil => {
                                setValidItemsIndex(toolArray,ustensil,validItemIndexArray);
                            });
                    }
                });
                setIndexArray(toolArray,itemIndexArray); 
                removeItemsDOM(toolArray, itemIndexArray, validItemIndexArray,indexTool);
            });
        }
        if(section.children.length === 0){
            reloadDOM(searchInput,event);
        }
    }
}

function findIngredient(recipe,searchRegex){
    recipe.ingredients.forEach(ingredient => {
        if(ingredient.ingredient.toLowerCase().match(searchRegex)){
            return true
        }                            
    });
    return false
}

function pushIndexRecipe(listOfRecipes, recipe, recipeIndexArray){
    recipeIndexArray.push(listOfRecipes.indexOf(recipe));
}

function reloadDOM(searchInput,event){
    const globalSearchInput = document.getElementById("search");
    event.target.value = "";
    switch(event.target.name){
        case "search":
            searchInput.style.animation = "errorInput 100ms 5";
            searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
            break;
        case "ingredients":
            searchInput.setAttribute("placeholder","Aucun ingrédient ne correspond à votre critère…");
            break;
        case "devices":
            searchInput.setAttribute("placeholder","Aucun appareil ne correspond à votre critère…");
            break;
        case "ustensils":
            searchInput.setAttribute("placeholder","Aucun ustensile ne correspond à votre critère…");
    }
    setDOM(globalSearchInput);
}

function setEventsDOM(searchInput, listOfRecipes, toolsArray){
    const toolsBtn = document.getElementsByClassName("tools__menu");
    const arrayToolsBtn = [].slice.call(toolsBtn);
    arrayToolsBtn.forEach(toolsBtn => {
        const inputToolsBtn = toolsBtn.children[0].children[1];
        toolsBtn.addEventListener("click", function(e){
            toolsBtn.lastElementChild.classList.remove("menu__item--hidden");
            toolsBtn.classList.add("tools__menu--active");
            switch(inputToolsBtn.value){
                case "Ingrédients":
                    inputToolsBtn.setAttribute("placeholder","Rechercher un ingrédient");
                    break;
                case "Appareils":
                    inputToolsBtn.setAttribute("placeholder","Rechercher un appareil");
                    break;
                case "Ustensiles":
                    inputToolsBtn.setAttribute("placeholder","Rechercher un ustensile");
            }
            inputToolsBtn.value = "";
            inputToolsBtn.focus();
        });
        inputToolsBtn.addEventListener("blur",function(e){
            toolsBtn.lastElementChild.classList.add("menu__item--hidden");
            toolsBtn.classList.remove("tools__menu--active");
            switch(e.target.name){
                case "ingredients":
                    inputToolsBtn.value = "Ingrédients";
                    break;
                case "devices":
                    inputToolsBtn.value = "Appareils";
                    break;
                case "ustensils":
                    inputToolsBtn.value = "Ustensiles";
            }
            inputToolsBtn.removeAttribute("placeholder");
        });
        inputToolsBtn.addEventListener("input",function(event){
            research(inputToolsBtn,listOfRecipes,toolsArray,event);
        })
    });
    searchInput.addEventListener("input", function(event){
        eventSearchInput(searchInput, listOfRecipes, toolsArray, event);
    });
}

function eventSearchInput(searchInput,listOfRecipes, toolsArray, event){
    searchInput.style.animation = "none";
    research(searchInput, listOfRecipes, toolsArray, event);
};


//Fonctionnalité - Partie outils des recettes/tools of recipes 

function setValidItemsIndex(currentItemsArray,itemData,validItemsIndexArray){   
    const validIndex = currentItemsArray.findIndex(currentItem => currentItem.toLowerCase() === itemData.toLowerCase());
    if(validIndex !== -1){
        validItemsIndexArray.push(validIndex);
    }
}

function setIndexArray(currentItemsArray,indexArray){
    currentItemsArray.forEach((currentItem,index) => {
        indexArray.push(index);
    });
}


function removeItemsDOM(currentItemsArray, currentItemsIndexArray, validItemsIndexArray,indexTool){
    //On retire les items ne correspondant pas au tableau d'index valide
    let itemsDelete = 0;
    switch(indexTool){
        case 0:
            var ulTool = document.querySelector(".ingredients").children[0];
            break;
        case 1:
            var ulTool = document.querySelector(".appliances").children[0];
            break;
        case 2:
            var ulTool = document.querySelector(".ustensils").children[0];
    }
    currentItemsIndexArray.forEach( currentItemIndex => {
        if(validItemsIndexArray.every(validItemIndex => validItemIndex !== currentItemIndex)){
            ulTool.removeChild(ulTool.children[currentItemIndex-itemsDelete]);
            currentItemsArray.splice(currentItemIndex-itemsDelete,1);
            itemsDelete++;
        }
    });
}

init();