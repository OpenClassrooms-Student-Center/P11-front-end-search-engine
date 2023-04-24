const resultsSection = document.querySelector(".results");
let filterList = document.querySelectorAll("dropdownUl")
const ddInputs = document.querySelectorAll("dd-input")
const ustensilsDd = document.querySelector(".dd-ustensils")
const recipesFiltre = recipes
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));
console.log(dropdownsEl)
let tags = []


//recolte les recettes
/* function recipesCall() {
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
        const dataRecipes = { id, nameRecipe, servings, ingredients, time, description, appliance, ustensils };
        //console.log(time);
        //console.log(unit);
        //console.log(ustensils);
    })
} */


//Ecoute du click pour liste déroulante
/* dropdownsEl.addEventListener("click", (e) => {
    console.log("event ecouté");
    console.log(e.srcElement.classList)
    switch (e.srcElement.classList) {
        case '.dd-ustentils':
            dropdownUstensils();
            break;
        case '.dd-apparels':
            dropdownApparels()
            break;
        case '.dd-ingredients':
            dropdownIngredients();
            break;
        default:
            console.log("pas de fonctions écoutée")
    }

}) */

dropdownsEl.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        console.log(e.srcElement.id)
        dropdown(e.srcElement.id);

    }))

//fonction dropdown
async function dropdown(nom) {
    
    let eleAffiche = tags[nom]
    console.log(eleAffiche);
    //sort les listes deroulantes
    eleAffiche.forEach((e) => {
        filterList.innerHTML += `<li class="${nom}_>${e}</li>`;
        
    })
}

/* ustensilsDd.addEventListener("click", () => {
    console.log("event écouté");
    dropdownUstensils(recipes);
}) */

//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    //tableaux vides
    let appliances = [];
    let ustensils = []
    let ingredients = [];


    //apparition de la factory des blocs
    recipesDisplay.forEach((recipe) => {
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);

    //remplissage des tableaux
        console.log(recipe);
        recipeArray = [...new Set(recipes)]
        appliances = [...new Set(recipe.appliance)]
        
        ustensils = [...[recipe.ustensils]]
        recipe.ingredients.forEach(ingredient => {
            ingredients = [...[ingredient.ingredient]]
        })
        console.log(ingredients)
        
    });

    tags['ustensils'] = ustensils;
    console.log(tags['ustensils']);
    tags['appareils'] = appliances;
    tags['ingredients'] = ingredients;
};

//Pour chaque ustensile


async function init() {
    
    displayRecipes(recipesFiltre)
};

init();

