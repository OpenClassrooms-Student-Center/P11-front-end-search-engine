const resultsSection = document.querySelector(".results");

let filterList

const ddInputs = Array.from(document.querySelectorAll(".dd-input"))
const recipesFiltre = recipes
const chevronUp = Array.from(document.querySelectorAll(".fa-chevron-up"))
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));


//console.log(dropdownsEl);

let tags = []



dropdownsEl.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        
        //console.log(e.target.id);
        document.getElementById("chev-up-" + e.target.id).style.display = "flex";
        document.getElementById(e.target.id + "-filter").style.maxHeight = "450px"
        e.target.style.display = "none"
        document.getElementById(e.target.id + "-filter").style.width = "600px"
        
        document.getElementById("ul-" + e.target.id).style.display = "flex"
    }))

chevronUp.forEach(dd =>
    dd.addEventListener("click" , (e) => {
        //console.log(e.target.id);
        document.getElementById(e.target.id.split('-')[2]).style.display = "flex";
        document.getElementById(e.target.id.split('-')[2] + "-filter").style.maxHeight = "75px"
        e.target.style.display = "none";
        document.getElementById(e.target.id.split('-')[2] + "-filter").style.width ="auto"
        document.getElementById("ul-" + e.target.id.split('-')[2]).style.display = "none"
    }))


console.log(ddInputs);
    
    


//fonction dropdown
async function dropdown(nom) {
    let filterList = document.getElementById("ul-" + nom)

        let eleAffiche = tags[nom]

            //sort les listes deroulantes
        eleAffiche.forEach((e) => {
            
            const li = document.createElement('li')
            li.classList.add(nom + '_open')
            li.textContent = e
               
            filterList.appendChild(li)  
            

            //rapporte le listener aux tags
            li.addEventListener("click", (el) => {
                
                let nameTarget = el.target.textContent;
                console.log(nameTarget);
                
            })

            //filtre dans l'input
            ddInputs.forEach((dd) => 
            dd.addEventListener("input", (e) => {
                const inputSelector = e
                const inputValue = e.target.value
                //const liSearch = li.textContent.search(inputvalue)

                //console.log(li.textContent);
                //console.log(e.target.id);
                //console.log(inputValue);
                //console.log(eleAffiche);
                
                function filtreTexte(eleAffiche, requete) {
                    eleAffiche.filter(function (el) {
                        //console.log(inputValue);
                        //console.log(li.textContent);
                        return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
                        //li.textContent === inputValue
                        //const liResults = li.textContent.search(inputValue)
                    })
                  }

                filtreTexte(e);
            }))

            
        }) //fin du Foreach


}



//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    //tableaux vides
    //console.log(recipesFiltre);
    let appliances = [];
    let ustensils = []
    let ingredients = [];

    tags['ustensils'] = [];
    //console.log(tags['ustensils']);
    tags['appareils'] = [];
    
    tags['ingredients'] = []; 


    
    recipesDisplay.forEach((recipe) => {

            //remplissage des tableaux
            //console.log(recipe.appliance)
            appliances = appliances.concat(recipe.appliance)
            //tags['appareils'] = [...[recipe.appliance]];
                    
            ustensils = ustensils.concat(recipe.ustensils)

            recipe.ingredients.forEach(ingredient => {
                ingredients.push(ingredient.ingredient)

            })

            //factory d'affichages des blocs
        const recipeEngine = recipesFactory(recipe);
        const recipeDOM = recipeEngine.getRecipeDOM();
        resultsSection.appendChild(recipeDOM);
        
        
    });
    tags['ingredients'] = [...new Set(ingredients)];
    tags['appareils'] = [...new Set(appliances)];
    tags['ustensils'] = [...new Set(ustensils)];

    tags['ingredients'].sort()
    
    tags['appareils'].sort()
    tags['ustensils'].sort()
    //console.log(tags);
    
};

//Pour chaque ustensile


async function init() {
    displayRecipes(recipesFiltre)
    dropdown("ingredients")
    dropdown("ustensils")
    dropdown("appareils")
};

init();

