const resultsSection = document.querySelector(".results");
let ustensilsList = document.querySelectorAll("rechercheUstensiles")
const ddInputs = document.querySelectorAll("dd-input")
const ustensilsDd = document.querySelector(".dd-ustentils")
const recipesFiltre = recipes
const ustensilsFiltre = "";
const dropdownsEl = document.querySelector(".fa-chevron-down");
console.log(dropdownsEl)


//recolte les recettes
function recipesCall() {
    recipesFiltre.forEach(recipes => {
        const id = recipes.id
        const nameRecipe = recipes.name
        const servings = recipes.servings
        const ingredients = recipes.ingredients
        ingredients.forEach(ingredients => {
            ingredient = ingredients.ingredient;
            quantity = ingredients.quantity;
            unit = ingredients.unit;
        })
        const time = recipes.time
        const description = recipes.description
        const appliance = recipes.appliance
        const ustensils = recipes.ustensils
        const dataRecipes  =  { id, nameRecipe, servings, ingredients, time, description, appliance, ustensils};
        //console.log(time);
        //console.log(unit);
        //console.log(ustensils);
    })

    
}


//Ecoute du click pour liste déroulante
dropdownsEl.addEventListener("click", (e) => {
    console.log("event ecouté");
    console.log(e.srcElement.classList)
    switch(e.srcElement.classList){
        case '.dd-ustentils' :
            dropdownUstensils();
            break;
        case '.dd-apparels' : 
            dropdownApparels()
            break;
        case '.dd-ingredients' : 
            dropdownIngredients();
            break;
        default :
        console.log("pas de fonctions écoutée")
    }

})

//fonction ustentiles
async function dropdownUstensils(recipesCall){
    console.log(recipesCall);
    console.log(ustensils);
    
    dataRecipes.forEach((ustensils) => {
        ustensilsList.innerHTML += `<li class="ustensiles_open">${ustensils}</li>`;
    })
}


 ustensilsDd.addEventListener("click", () => {
    console.log("event écouté");
    dropdownUstensils(recipes);
})



//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    recipesDisplay.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
    });
};

//Pour chaque ustensile





async function init() {
    recipesCall()
    displayRecipes(recipesFiltre)
};

init();

