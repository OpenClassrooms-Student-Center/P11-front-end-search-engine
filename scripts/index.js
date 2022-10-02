function init(){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const listOfIngredients = [];
    const listOfUstensils = [];
    const listOfAppliances = []; 
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        setTable(listOfIngredients,listOfUstensils,listOfAppliances,recipesModel);
    });
    main.appendChild(section);
    console.log(listOfIngredients);
    console.log(listOfUstensils);
    console.log(listOfAppliances);
    document.getElementById("search").addEventListener("input", function(e){
        if(e.target.value.length >= 3){
            
        }
    });
}

function setTable(listOfIngredients, listOfUstensils, listOfAppliances, recipesModel){
    recipesModel.ingredients.forEach(ingredient => {
        listOfIngredients.push(ingredient.ingredient);
    });
    recipesModel.ustensils.forEach( ustensil => {
        listOfUstensils.push(ustensil);
    });
    listOfAppliances.push(recipesModel.appliance);
}

function sortTable(listOfIngredients,listOfUstensils,listOfAppliances){
    
}

init();

