const resultsSection = document.querySelector(".results");
let ustensilsList = document.querySelectorAll("rechercheUstensiles")
const ddInputs = document.querySelectorAll("dd-input")
const ustensilsDd = document.querySelector(".dd-ustentils")
const recipesFiltre = recipes
const ustensilsFiltre = "";
const dropdownsEl = document.querySelector(".fa-chevron-down");
console.log(dropdownsEl)


//recolte les recettes
function RecipesCall() {
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
    })

    
}

dropdownsEl.addEventListener("click", (e) => {
    console.log("event ecouté");
    console.log(e.srcElement)
    switch(e.srcElement.className){
        case 'dd-ustentils' :
            dropdownUstensils();
            break;
        case 'dd-apparels' : 
            dropdownApparels()
            break;
        case 'dd-ingredients' : 
            dropdownIngredients();
            break;
        default :
        console.log("pas de fonctions écoutée")
    }

})

async function dropdownUstensils(recipes){
    console.log(recipes);
    console.log(ustensils);
    
    ustensilsFiltre.forEach((ustensils) => {
        ustensilsList.innerHTML += `<li class="ustensiles_open">${ustensils}</li>`;
    })
}


/* ustensilsDd.addEventListener("click", () => {
    console.log("event écouté");
    dropdownUstensils(recipes);
})
 */


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
    RecipesCall()
    displayRecipes(recipesFiltre)
};

init();

