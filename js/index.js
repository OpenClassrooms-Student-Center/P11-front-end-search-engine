const resultsSection = document.querySelector(".results");



const ddInputs = document.querySelectorAll("dd-input")
const recipesFiltre = recipes
const chevronUp = document.querySelectorAll(".fa-chevron-up")
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));
const ingredientsFilter = document.getElementById("ingredients-filter")

//console.log(dropdownsEl);

let tags = []


dropdownsEl.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        dropdown(e.srcElement.id);
        chevronUp[0].style.display = "flex";
        dropdownsEl[0].style.display = "none"
        ingredientsFilter.style.width ="600px"
    }))

chevronUp.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        chevronUp[0].style.display = "none";
        dropdownsEl[0].style.display = "flex"
    }))

//fonction dropdown
async function dropdown(nom) {

    let eleAffiche = tags[nom]

    let uniqueArray = [...new Set(eleAffiche)];
    console.log(nom);
    
    

    
    //sort les listes deroulantes
    uniqueArray.forEach((e) => {
        console.log(e.srcElement);
        //console.log(eleAffiche);
        
        //console.log(nom);
        //console.log(e);
        let filterList = e.srcElement.id
        console.log(filterList);
        filterList.innerHTML += '<li class="${nom}_open">' + e + '</li>';
        
/*        const li = document.createElement('li')
        li.classList.add(nom + '_open')
        li.textContent = e
        console.log(li);
        console.log(filterList);
        filterList.appendChild('li')  */
        
        
    })
    

    console.log("dropdown effectué");
}



//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    //tableaux vides
    //console.log(recipesFiltre);
    let appliances = [];
    let ustensils = []
    let ingredientsArray = [];

    tags['ustensils'] = [];
    //console.log(tags['ustensils']);
tags['appareils'] = [];
    
tags['ingredients'] = []; 

  
    recipesDisplay.forEach((recipe) => {

            //remplissage des tableaux
            recipeArray = [recipes]

            appliances = [recipe.appliance]
            
            ustensils = [recipe.ustensils]

            recipe.ingredients.forEach(ingredient => {
                ingredientsArray = [...[ingredient.ingredient]]

            })

            totalIngredients = tags['ingredients'].push(ingredientsArray);
            totalAppareils = tags['appareils'].push(appliances);
            totalustensils = tags['ustensils'].push(ustensils);




            //factory d'affichages des blocs
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
        
        
    });
    tags['ingredients'] = [...new Set(tags['ingredients'])];
    tags['appareils'] = [...new Set(tags['appareils'])];
    tags['ustensils'] = [...new Set(tags['ustensils'])];
    console.log(tags);
    
};

//Pour chaque ustensile


async function init() {
    
    displayRecipes(recipesFiltre)
};

init();

