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



function reloadDOM(searchInput,event){
    const globalSearchInput = document.getElementById("search");
    event.target.value = "";
    console.log(event);
    if(event.target.name === "search"){
        searchInput.style.animation = "errorInput 100ms 5";
        searchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
    }
    setDOM(globalSearchInput);
    //On supprime les tags
    const arrayTagsBtn = Array.from(document.querySelectorAll("div[role=status]"));
    arrayTagsBtn.forEach(tagBtn => {
        tagBtn.remove();
    });
}

//Fonctionnalité - Gestion des évènements

function setEventsDOM(searchInput, listOfRecipes, toolsArray){
    const toolsBtn = document.getElementsByClassName("tools__menu");
    const arrayToolsBtn = [].slice.call(toolsBtn);
    const arrayTagBtn = [];
    arrayToolsBtn.forEach(toolBtn => {
        const inputToolsBtn = toolBtn.children[0].children[1];
        const ulToolBtn = toolBtn.children[1].children[0];
        toolBtn.addEventListener("click", function(e){
            toolBtn.lastElementChild.classList.remove("menu__item--hidden");
            toolBtn.classList.add("tools__menu--active");
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
            inputToolsBtn.addEventListener("blur", function(e){
                console.log(e);
                if(e.relatedTarget !== toolBtn){
                    eventCloseItemsBtn(e,toolBtn,inputToolsBtn);
                }
            });
        });
        const liArrayBtn = Array.from(ulToolBtn.querySelectorAll("li"));
        liArrayBtn.forEach( liBtn => {
            liBtn.addEventListener("click", function(e){
                const isInput = false;
                const divTag = document.createElement("div");
                divTag.setAttribute("role","status");
                divTag.textContent = liBtn.textContent;
                document.querySelector(".tagMenu").appendChild(divTag);
                eventCloseItemsBtn(e,toolBtn,inputToolsBtn);
                //Faire un reset des items
                switch(inputToolsBtn.name){
                    case "ingredients":
                        divTag.classList.add("tag","tag1");
                        reloadItems(toolsArray,0,ulToolBtn);
                        break;
                    case "devices":
                        divTag.classList.add("tag","tag2");
                        reloadItems(toolsArray,1,ulToolBtn);
                        break;
                    case "ustensils":
                        divTag.classList.add("tag","tag3");
                        reloadItems(toolsArray,2,ulToolBtn);
                }
                arrayTagBtn.push(divTag);
                research(inputToolsBtn,listOfRecipes,toolsArray,e,isInput);
            });
        });
        inputToolsBtn.addEventListener("input",function(event){
            if(event.target.value.length >= 3){
                const search = event.target.value.toLowerCase();
                const searchRegex = new RegExp(search);
                switch(inputToolsBtn.name){
                    case "ingredients":
                        if(removeItemsWithTag(toolsArray,0,ulToolBtn,searchRegex) === false){
                            addItems(toolsArray,0,ulToolBtn);
                            inputToolsBtn.setAttribute("placeholder","Aucun ingrédient ne correspond à votre critère…");
                            event.target.value = "";
                        }
                        break;
                    case "devices":
                        if(removeItemsWithTag(toolsArray,1,ulToolBtn,searchRegex) === false){
                            addItems(toolsArray,1,ulToolBtn);
                            inputToolsBtn.setAttribute("placeholder","Aucun appareil ne correspond à votre critère…");
                            event.target.value = "";
                        }
                        break;
                    case "ustensils":
                        if(removeItemsWithTag(toolsArray,2,ulToolBtn,searchRegex) === false){
                            addItems(toolsArray,2,ulToolBtn);
                            inputToolsBtn.setAttribute("placeholder","Aucun ustensile ne correspond à votre critère…");
                            event.target.value = "";
                        }
                }
            }
        });
    });
    searchInput.addEventListener("input", function(event){
        eventSearchInput(searchInput, listOfRecipes, toolsArray, event);
    });
}

function eventCloseItemsBtn(e,toolBtn,inputToolsBtn){
    toolBtn.lastElementChild.classList.add("menu__item--hidden");
    toolBtn.classList.remove("tools__menu--active");
    let target = undefined;
    if(e.target.nodeName === "LI"){
        target = inputToolsBtn.name;
    }
    else{
        target = e.target.name;
    }
    switch(target){
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
}

function eventSearchInput(searchInput,listOfRecipes, toolsArray, event){
    const isInput = true;
    searchInput.style.animation = "none";
    research(searchInput, listOfRecipes, toolsArray, event,isInput);
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

function removeItemsWithTag(toolsArray,arrayIndex, ulToolBtn,searchRegex){
    let findItem = false;
    let itemsDelete = 0;
    toolsArray[arrayIndex].forEach(function(tool,index){
        if(!tool.toLowerCase().match(searchRegex)){
            removeItems(ulToolBtn,index,itemsDelete);
            itemsDelete++;
        }
        else{
            findItem = true;
        }
    });
    return findItem
}

function reloadItems(toolsArray,arrayIndex,ulToolBtn){
    const liArray = Array.from(ulToolBtn.querySelectorAll("li"));
    let itemsDelete = 0;
    liArray.forEach(function (li,index){
        removeItems(ulToolBtn,index,itemsDelete);
        itemsDelete++;
    });
    addItems(toolsArray,arrayIndex,ulToolBtn);
}

function addItems(toolsArray,arrayIndex,ulToolBtn){
    toolsArray[arrayIndex].forEach(tool =>{
        const li = document.createElement("li");
        li.textContent = tool;
        ulToolBtn.appendChild(li);
    });
}

function removeItems(ulToolBtn,index,itemsDelete){
    if(ulToolBtn.children.length > 0){
        ulToolBtn.removeChild(ulToolBtn.children[index-itemsDelete]);
    }
}

function removeItemsWithRecipe(currentItemsArray, currentItemsIndexArray, validItemsIndexArray,indexTool){
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

//Fonctionnalité - Algorithme de recherche

function research(searchInput, listOfRecipes, toolsArray, event, isInput){
    let search = undefined;
    if(isInput){
        search = event.target.value.toLowerCase();
    }
    else{
        search = event.target.textContent.toLowerCase();
    }
    if(search.length >= 3){
        const section = document.querySelector(".articles");
        const searchRegex = new RegExp(search);
        const recipeIndexArray = [];
        listOfRecipes.forEach(recipe => {
            switch(searchInput.name){
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
                removeItemsWithRecipe(toolArray, itemIndexArray, validItemIndexArray,indexTool);
            });
        }
        if(section.children.length === 0){
            reloadDOM(searchInput,event);
        }
    }
}

function findIngredient(recipe,searchRegex){
    let test = false;
    recipe.ingredients.forEach(ingredient => {
        if(ingredient.ingredient.toLowerCase().match(searchRegex)){
            test = true;
        }                            
    });
    return test
}

function pushIndexRecipe(listOfRecipes, recipe, recipeIndexArray){
    recipeIndexArray.push(listOfRecipes.indexOf(recipe));
}

init();