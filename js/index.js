const resultsSection = document.querySelector(".results");

let filterList

const ddInputs = document.querySelectorAll("dd-input")
const recipesFiltre = recipes
const chevronUp = Array.from(document.querySelectorAll(".fa-chevron-up"))
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));
const ingredientsFilter = document.getElementById("ingredients-filter")

//console.log(dropdownsEl);

let tags = []



dropdownsEl.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        dropdown(e.srcElement.id);
        console.log(e.srcElement.id);
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
    let filterList = document.getElementById("ul-" + nom)


        let eleAffiche = tags[nom]

        let uniqueArray = [...new Set(eleAffiche)];
        console.log(uniqueArray);
        
    
                //sort les listes deroulantes
        uniqueArray.forEach((e) => {
            if(chevronUp[0] != undefined){

            let filterList = document.getElementById("ul-" + nom)
            //console.log(filterList);
            filterList.innerHTML += '<li class="${nom}_open">' + e + '</li>';
            
           /* const li = document.createElement('li')
            li.classList.add(nom + '_open')
            li.textContent = e
            console.log(li);
    
            filterList.appendChild('li')  
             */
        } else {
            console.log("dropdown vidé");
            li = document.getElementsByTagName("li")
            filterList.removeChild(li);
            filterList.innerHTML = ""
        } 
        })
        
        console.log("dropdown effectué");


}

async function recipeUnique(recipes){
    console.log(recipes);
    const uniqueRecipe = [...new Set(recipes)]
    console.log(uniqueRecipe);

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
            //remplissage des tableaux
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
    recipeUnique(recipes)
    displayRecipes(recipesFiltre)
};

init();

