function init(){
    const isReload = false;
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const searchInput = document.getElementById("search");
    section.classList.add("articles");
    const inputBg = "#E7E7E7";
    searchInput.style.background = inputBg;
    main.appendChild(section);
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    const data = setDOM();
    setEventsDOM(searchInput,data);
} 

function setDOM(){
    const listOfRecipes = [];
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
        document.querySelector(".articles").appendChild(recipeArticle);
        listOfRecipes.push(recipe);
    });
    return {listOfRecipes, toolsArray}
}



function reloadDOM(event){
    const globalSearchInput = document.getElementById("search");
    event.target.value = "";
    if(event.target.name === "search"){
        globalSearchInput.style.animation = "errorInput 100ms 5";
        globalSearchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
    }
    setDOM();
}

//Fonctionnalité - Gestion des évènements

function setEventsDOM(searchInput, data){
    const toolsBtn = document.getElementsByClassName("tools__menu");
    const arrayToolsBtn = [].slice.call(toolsBtn);
    const eventClickLiArray = [];
    arrayToolsBtn.forEach((toolBtn,indexToolBtn) => {
        const inputToolBtn = toolBtn.children[0].children[1];
        const ulToolBtn = toolBtn.children[1].children[0];
        toolBtn.addEventListener("click", function(e){
            toolBtn.lastElementChild.classList.remove("menu__item--hidden");
            toolBtn.classList.add("tools__menu--active");
            toolBtn.setAttribute("aria-expanded","true");
            toolBtn.children[0].setAttribute("aria-expanded","true");
            switch(inputToolBtn.value){
                case "Ingrédients":
                    inputToolBtn.setAttribute("placeholder","Rechercher un ingrédient");
                    break;
                case "Appareils":
                    inputToolBtn.setAttribute("placeholder","Rechercher un appareil");
                    break;
                case "Ustensiles":
                    inputToolBtn.setAttribute("placeholder","Rechercher un ustensile");
            }
            inputToolBtn.value = "";
            inputToolBtn.focus();
            inputToolBtn.addEventListener("blur", function(e){
                if(e.relatedTarget !== toolBtn){
                    eventCloseItemsBtn(e,toolBtn,inputToolBtn);
                }
            });
        });
        const liArrayBtn = Array.from(ulToolBtn.querySelectorAll("li"));
        liArrayBtn.forEach( liBtn => {
            liBtn.addEventListener("click", function(eventClickLi){
                liClickEvent(eventClickLi,eventClickLiArray,data.listOfRecipes, arrayToolsBtn,data.toolsArray,inputToolBtn,ulToolBtn,toolBtn,liBtn, indexToolBtn,searchInput);
            });
        });
        inputToolBtn.addEventListener("input",function(event){
            if(event.target.value.length >= 3){
                const search = event.target.value.toLowerCase();
                const searchRegex = new RegExp(search);
                if(removeItemsWithInput(data.toolsArray,indexToolBtn,ulToolBtn,searchRegex) === false){
                    addItems(data.toolsArray,indexToolBtn,ulToolBtn);
                    inputToolBtn.setAttribute("placeholder",`Aucun ${inputToolBtn.name} ne correspond à votre critère…`);
                    event.target.value = "";
                }
            }
        });
    });
    searchInput.addEventListener("input",function(event){
        if(event.target.value.length >= 3){
            eventSearchInput(searchInput, data.listOfRecipes, data.toolsArray, event);
        }
    });
}

function liClickEvent(eventClickLi,eventClickLiArray,listOfRecipes, arrayToolsBtn, toolsArray,inputToolBtn,ulToolBtn,toolBtn,liBtn,indexToolBtn,searchInput){
    const isInput = false;
    const divTag = document.createElement("div");
    divTag.setAttribute("role","status");
    divTag.textContent = liBtn.textContent;
    document.querySelector(".tagMenu").appendChild(divTag);
    eventCloseItemsBtn(eventClickLi,toolBtn,inputToolBtn);
    divTag.classList.add("tag",`tag${indexToolBtn}`);       
    //On supprime notre target item du tableau d'outils correspondant 
    spliceTarget(toolsArray,eventClickLi,indexToolBtn);
    //Ainsi que sur le DOM
    eventClickLi.target.remove();
    eventClickLiArray.push(eventClickLi);
    research(inputToolBtn,listOfRecipes,toolsArray,eventClickLi,isInput);
    divTag.addEventListener("click",function(eventClickTag){
        tagCloseEvent(eventClickTag,eventClickLiArray,arrayToolsBtn,toolsArray,ulToolBtn,divTag,inputToolBtn,searchInput,isInput);
    });
}

function tagCloseEvent(eventClickTag,eventClickLiArray,arrayToolsBtn,toolsArray,ulToolBtn,divTag,inputToolBtn,searchInput,isInput){
    const newItems = document.createElement("li");
    newItems.textContent = divTag.textContent;
    ulToolBtn.appendChild(newItems);
    const section = document.querySelector(".articles");
    divTag.remove();
    section.innerHTML = "";
    //Faire un reset de tous les ultToolBtn
    arrayToolsBtn.forEach(toolBtn => {
        toolBtn.children[1].children[0].innerHTML = "";
    });
    const reset = setDOM();
    const resetListOfRecipes = reset.listOfRecipes;
    //Retirer l'évènement li correspondant au tag sélectionné du tableau d'évènement 
    eventClickLiArray.forEach((eventClickLi,indexEventclickLi) => {
        if(eventClickLi.target.textContent.toLowerCase() === eventClickTag.target.textContent.toLowerCase()){
            eventClickLiArray.splice(indexEventclickLi,1);
        }
    });
    //retirer les items de l'interface qui correspondents au tag restant par l'eventLi
    if(eventClickLiArray.length > 0){
        eventClickLiArray.forEach(eventClickLiFilter =>{
            reset.toolsArray.forEach(toolArray => {
                toolArray.forEach((tool,toolIndex) => {
                    if(eventClickLiFilter.target.textContent.toLowerCase() === tool.toLowerCase()){
                        ulToolBtn.removeChild(ulToolBtn.children[toolIndex]);
                    }
                });
                toolArray.filter(tool => eventClickLiFilter.target.textContent.toLowerCase() == tool.toLowerCase());
            });
            research(inputToolBtn,resetListOfRecipes,reset.toolsArray,eventClickLiFilter,isInput);
        });
    }
    else{
        document.getElementById("search").value = "";
    }
}

function eventCloseItemsBtn(e,toolBtn,inputToolBtn){
    toolBtn.lastElementChild.classList.add("menu__item--hidden");
    toolBtn.classList.remove("tools__menu--active");
    let target = undefined;
    if(e.target.nodeName === "LI"){
        target = inputToolBtn.name;
    }
    else{
        target = e.target.name;
    }
    switch(target){
        case "ingredients":
            inputToolBtn.value = "Ingrédients";
            break;
        case "devices":
            inputToolBtn.value = "Appareils";
            break;
        case "ustensils":
            inputToolBtn.value = "Ustensiles";
    }
    inputToolBtn.removeAttribute("placeholder");
}

function eventSearchInput(searchInput,listOfRecipes, toolsArray, event){
    const isInput = true;
    searchInput.style.animation = "none";
    research(searchInput, listOfRecipes, toolsArray, event,isInput);
};


//Fonctionnalité - Partie outils des recettes/tools of recipes

function setIndexArray(currentItemsArray,indexArray){
    currentItemsArray.forEach((currentItem,index) => {
        indexArray.push(index);
    });
}

function setValidItemsIndex(currentItemsArray,itemData,validItemsIndexArray){
    const validIndex = currentItemsArray.findIndex(currentItem => currentItem.toLowerCase() === itemData.toLowerCase());
    if(validIndex !== -1){
        validItemsIndexArray.push(validIndex);
    }
}

function removeItemsWithInput(toolsArray,arrayIndex, ulToolBtn,searchRegex){
    let findItem = false;
    let itemsDelete = 0;
    const indexItemsRemove = [];
    toolsArray[arrayIndex].forEach(function(tool,index){
        if(!tool.toLowerCase().match(searchRegex)){
            if(ulToolBtn.children.length > 0){
                indexItemsRemove.push(index);
                ulToolBtn.removeChild(ulToolBtn.children[index-itemsDelete]);
                itemsDelete++;
            }
        }
        else{
            findItem = true;
        }
    });
    itemsDelete = 0;
    indexItemsRemove.forEach(indexItemRemove => { 
        toolsArray[arrayIndex].splice(indexItemRemove-itemsDelete,1);
        itemsDelete++;    
    });
    return findItem
}

function spliceTarget(toolsArray,e,indexToolBtn){
    toolsArray[indexToolBtn].forEach((tool,index) => {
        if(tool.toLowerCase() === e.target.textContent.toLowerCase()){
            toolsArray[indexToolBtn].splice(index,1);
        }
    });
}

function addItems(toolsArray,arrayIndex,ulToolBtn){
    toolsArray[arrayIndex].forEach(tool =>{
        const li = document.createElement("li");
        li.textContent = tool;
        ulToolBtn.appendChild(li);
    });
}

function removeItemsWithRecipe(toolArray,itemsIndexArray, validItemsIndexArray,ulTool){
    //On retire les items ne correspondant pas au tableau d'index valide
    let itemsDelete = 0;
    itemsIndexArray.forEach((itemsIndex) => {
        if(validItemsIndexArray.every(validItemIndex => validItemIndex !== itemsIndex)){
            ulTool.removeChild(ulTool.children[itemsIndex-itemsDelete]);
            toolArray.splice(itemsIndex-itemsDelete,1);
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
    const section = document.querySelector(".articles");
    const searchRegex = new RegExp(search);
    const recipeIndexArray = [];
    setIndexRecipeArray(listOfRecipes,searchInput,recipeIndexArray,searchRegex);
    if(recipeIndexArray.length > 0){
        let articleDelete = 0;
        //on supprime les articles correspondants
        recipeIndexArray.forEach(recipeIndex => {
            listOfRecipes.splice(recipeIndex-articleDelete,1);
            section.removeChild(section.children[recipeIndex-articleDelete]);
            articleDelete += 1;
        });
        if(section.children.length > 0){
            toolsArray.forEach((toolArray,indexTool) => {
                const validItemIndexArray = [];
                const itemsIndexArray= [];
                let ulTool = undefined;
                listOfRecipes.forEach( recipe => {
                    switch(indexTool){
                        case 0:
                            recipe.ingredients.forEach(ingredient => {
                                setValidItemsIndex(toolArray,ingredient.ingredient,validItemIndexArray);
                            });
                            ulTool = document.querySelector(".ingredients").children[0];
                            break;
                        case 1:
                            setValidItemsIndex(toolArray,recipe.appliance,validItemIndexArray);
                            ulTool = document.querySelector(".appliances").children[0];
                            break;
                        case 2:
                            recipe.ustensils.forEach(ustensil => {
                                setValidItemsIndex(toolArray,ustensil,validItemIndexArray);
                            });
                            ulTool = document.querySelector(".ustensils").children[0];
                    }
                });
                //On remplit un tableau d'index d'items courant car on ne peut pas boucler sur le tableau
                //d'outils et supprimer ses éléments en même temps.
                setIndexArray(toolArray,itemsIndexArray); 
                removeItemsWithRecipe(toolArray,itemsIndexArray, validItemIndexArray, ulTool);
            });
        }
    }
    if(section.children.length == 0){
        reloadDOM(event);
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

function setIndexRecipeArray(listOfRecipes,searchInput,recipeIndexArray,searchRegex){
    listOfRecipes.forEach((recipe,index) => {
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
                    pushIndexRecipe(index,recipeIndexArray);
                }
                break;
            case "ingredients":
                if(findIngredient(recipe,searchRegex) === false){
                    pushIndexRecipe(index,recipeIndexArray);
                }
                break;
            case "devices":
                if(!recipe.appliance.toLowerCase().match(searchRegex)){
                    pushIndexRecipe(index,recipeIndexArray);
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
                    pushIndexRecipe(index,recipeIndexArray);
                }
        }
    });
}

function pushIndexRecipe(index, recipeIndexArray){
    recipeIndexArray.push(index);
}

init();