function init(){
    const reload = false;
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const searchInput = document.getElementById("search");
    section.classList.add("articles");
    const inputBg = "#E7E7E7";
    searchInput.style.background = inputBg;
    main.appendChild(section);
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    setDOM(reload,searchInput);
} 

function setDOM(reload,searchInput){
    const listOfRecipes = [];
    const section = document.querySelector(".articles");
    const ingredientsArray = [];
    const appliancesArray = [];
    const ustensilsArray = [];
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        if(reload === false){
            recipesModel.setItemsDOM(recipesModel.ingredients, ingredientsArray);
            recipesModel.setItemsDOM(recipesModel.appliance,appliancesArray);
            recipesModel.setItemsDOM(recipesModel.ustensils, ustensilsArray);
        }
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipe);
    });
    setEventsDOM(searchInput,listOfRecipes, ingredientsArray, appliancesArray, ustensilsArray, reload);
}

function research(listOfRecipes, currentIngredientsArray, currentAppliancesArray, currentUstensilsArray, event){
    const search = event.target.value.toLowerCase();
    const section = document.querySelector(".articles");
    const searchInput = document.getElementById("search");
    if(search.length >= 3){
        const searchRegex = new RegExp(search);
        const recipeIndexArray = [];
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
                recipeIndexArray.push(listOfRecipes.indexOf(recipe));
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
            const invalidItemIndexArray = [];
            let itemsDelete = 0;
            // getItemsDOM(ustensilsTestArray);
            listOfRecipes.forEach(recipe => {
                currentIngredientsArray.forEach( ingredientTest => {
                    let validIngredient = false;
                    recipe.ingredients.forEach(ingredient => {
                        if(ingredientTest.toLowerCase() === ingredient.ingredient.toLowerCase()){
                            validIngredient = true; 
                        }
                    });
                    if(validIngredient === false){
                        currentIngredientsArray.splice(currentIngredientsArray.indexOf(ingredientTest),1);
                    }
                });
                currentAppliancesArray.forEach( applianceTest => {
                    let validAppliance = false;
                    if(applianceTest.toLowerCase() === recipe.appliance.toLowerCase()){
                        validAppliance = true; 
                    }
                    if(validAppliance === false){
                        currentAppliancesArray.splice(currentAppliancesArray.indexOf(applianceTest),1);
                    }
                });
                currentUstensilsArray.forEach( ustensilTest => {
                    let validItem = false;
                    const index = currentUstensilsArray.indexOf(ustensilTest);
                    recipe.ustensils.forEach(ustensil => {
                        if(ustensilTest.toLowerCase() === ustensil.toLowerCase()){
                            validItem = true;
                        }
                    });
                    let test = compareItemIndex(index,invalidItemIndexArray,validItem);
                    if(validItem === false && test === false){
                        invalidItemIndexArray.push(index);
                    }
                });                
            });
            console.log(invalidItemIndexArray);
            //On retire les items correspondant au tableau d'index
            const ulUstensils = document.querySelector(".ustensils").children[0];
            invalidItemIndexArray.forEach(itemsIndex => {
                ulUstensils.removeChild(ulUstensils.children[itemsIndex-itemsDelete]);
                currentUstensilsArray.splice(currentUstensilsArray.indexOf(itemsIndex-itemsDelete),1);
                itemsDelete++;
            });
        }
        if(section.children.length === 0){
            reloadRecipes(searchInput,event);
        }
    }
}

function reloadRecipes(searchInput,event){
    const reload = true;
    const errorColor = "#e54858";
    searchInput.style.animation = "errorInput 100ms 5";
    searchInput.style.border = errorColor;
    searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
    event.target.value = "";
    event.target.blur();
    searchInput.removeEventListener("input",event);
    setDOM(reload,searchInput);
}

function setEventsDOM(searchInput, listOfRecipes, ingredientsArray, appliancesArray, ustensilsArray, reload){
    if(reload === false){
        const itemsBtn = document.getElementsByClassName("tools__menu");
        const arrayItemsBtn = [].slice.call(itemsBtn);
        arrayItemsBtn.forEach(itemsBtn => {
            itemsBtn.addEventListener("click", function(e){
                itemsBtn.lastElementChild.classList.remove("menu__item--hidden");
                itemsBtn.classList.add("tools__menu--active");
                switch(itemsBtn.children[0].children[1].value){
                    case "Ingrédients":
                        itemsBtn.children[0].children[1].setAttribute("placeholder","Rechercher un ingrédient");
                        break;
                    case "Appareils":
                        itemsBtn.children[0].children[1].setAttribute("placeholder","Rechercher un appareil");
                        break;
                    case "Ustensiles":
                        itemsBtn.children[0].children[1].setAttribute("placeholder","Rechercher un ustensile");
                }
                itemsBtn.children[0].children[1].value = "";
                itemsBtn.children[0].children[1].focus();
            });
            itemsBtn.children[0].children[1].addEventListener("blur",function(e){
                itemsBtn.lastElementChild.classList.add("menu__item--hidden");
                itemsBtn.classList.remove("tools__menu--active");
                switch(itemsBtn.children[0].children[1].placeholder){
                    case "Rechercher un ingrédient":
                        itemsBtn.children[0].children[1].value = "Ingrédients";
                        break;
                    case "Rechercher un appareil":
                        itemsBtn.children[0].children[1].value = "Appareils";
                        break;
                    case "Rechercher un ustensile":
                        itemsBtn.children[0].children[1].value = "Ustensiles";
                }
                itemsBtn.children[0].children[1].removeAttribute("placeholder");
                itemsBtn.children[0].children[1].removeEventListener("blur",e);
            });
        });
    }
    searchInput.addEventListener("input", function(event){
        eventSearchInput(searchInput, listOfRecipes, ingredientsArray, appliancesArray, ustensilsArray, event);
    });
}

function eventSearchInput(searchInput,listOfRecipes,ingredientsArray, appliancesArray, ustensilsArray, event){
    searchInput.style.animation = "none";
    research(listOfRecipes, ingredientsArray, appliancesArray, ustensilsArray, event);
};

function compareItemIndex(testIndex, indexArray, validItem){
    if(indexArray.length > 0){
        let sameIndex = false;
        indexArray.forEach(index => {
            if(index === testIndex){
                sameIndex = true;
                if(validItem){
                    indexArray.splice(index - indexArray[0],1);
                }
            }
            if(testIndex < index && validItem === false){
                sameIndex = true;
            }
        });
        if(sameIndex){
            return true
        }
    }
    return false
}

function getItemsDOM(itemsArray){
    const ulUstensils = document.querySelector(".ustensils").children[0];
    console.log({ulUstensils});
}

init();