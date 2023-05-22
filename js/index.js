const resultsSection = document.querySelector(".results");
const tagsSection = document.querySelector(".tags-filtres")


const ddInputs = Array.from(document.querySelectorAll(".dd-input"))
let recipesFiltre = recipes
const chevronUp = Array.from(document.querySelectorAll(".fa-chevron-up"))
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));
const articleBloc = Array.from(document.getElementsByClassName("article-bloc"))

let ingredientsTags = []
let appareilsTags = []
let ustensilsTags = []


//console.log(dropdownsEl);

let tags = []



dropdownsEl.forEach(dd =>
    dd.addEventListener("click", (e) => {
        ouvreListe(e.target)
        //console.log(e.target.id);

    }))




function ouvreListe(e) {
    //fermer toutes les listes
    chevronUp.forEach(dd => {
        console.log();
        document.getElementById(dd.id.split('-')[2]).style.display = "flex";
        document.getElementById(dd.id.split('-')[2] + "-filter").style.maxHeight = "75px"
        dd.style.display = "none";
        document.getElementById(dd.id.split('-')[2] + "-filter").style.width = "auto"
        document.getElementById("ul-" + dd.id.split('-')[2]).style.display = "none"
    })
    //ouvrir la liste cliquée
    document.getElementById("chev-up-" + e.id).style.display = "flex";
    document.getElementById(e.id + "-filter").style.maxHeight = "450px"
    e.style.display = "none"
    document.getElementById(e.id + "-filter").style.width = "600px"

    document.getElementById("ul-" + e.id).style.display = "flex"
}


chevronUp.forEach(dd =>
    dd.addEventListener("click", (e) => {
        //console.log(e.target.id);
        document.getElementById(e.target.id.split('-')[2]).style.display = "flex";
        document.getElementById(e.target.id.split('-')[2] + "-filter").style.maxHeight = "75px"
        e.target.style.display = "none";
        document.getElementById(e.target.id.split('-')[2] + "-filter").style.width = "auto"
        document.getElementById("ul-" + e.target.id.split('-')[2]).style.display = "none"

    }))


//fonction dropdown
async function dropdown(nom) {

    //filtre dans l'input
    document.getElementById('in-' + nom).addEventListener("input", (e) => {
        let filterList = document.getElementById(nom)
        const inputValue = e.target.value
        if (inputValue.length > 1) {

            let tagsResults = tags[nom].filter(el => el.includes(inputValue.toLowerCase()))

            afficheList(nom, tagsResults)
            ouvreListe(filterList)
        } else if (true) { //TODO : verifier backspace // DONE 
            afficheList(nom, tags[nom])
        }

    })
    afficheList(nom, tags[nom]);
}


async function afficheList(nom, eleAffiche) {
    let filterList = document.getElementById("ul-" + nom)
    filterList.innerHTML = "" //vide la liste

    //sort les listes deroulantes
    eleAffiche.forEach((e) => {

        const li = document.createElement('li')
        li.classList.add(nom + '_open')
        li.classList.add("col-md-3")
        li.textContent = e

        filterList.appendChild(li)


        //rapporte le listener aux tags
        li.addEventListener("click", (el) => {
            //TODO if/else vérifier si l'lélment créé n'est pas dans la catégorie
                //recuperer les trois listes de tags
            ingredientsTags = Array.from(document.getElementsByClassName("ingredientsTags")).map(el => el.textContent)
            appareilsTags = Array.from(document.getElementsByClassName("appareilsTags")).map(el => el.textContent)
            ustensilsTags = Array.from(document.getElementsByClassName("ustensilsTags")).map(el => el.textContent)

            let nameTarget = el.target.textContent;
            //verifier si l'element existe
            
            if(!(ingredientsTags.includes(nameTarget) || appareilsTags.includes(nameTarget) || ustensilsTags.includes(nameTarget))){
                let div = document.createElement("div")
                div.classList.add('tags')
                div.classList.add(nom + 'Tags')
                div.innerText = nameTarget
                let i = document.createElement("i")
                i.classList.add("fa-solid")
                i.classList.add("fa-xmark")
                i.addEventListener("click", (clic) => {
                    div.remove();
                    //appele les fonctions de recherche par tags et dans la barre
                    recipesFiltre = recipes
                    rechercheParTags();
                    displayRecipes(recipesFiltre)
                })
                div.appendChild(i)
                tagsSection.appendChild(div)
                rechercheParTags();
                displayRecipes(recipesFiltre)
            }
            // créer chaue éléments de la liste
            

        })

    }) //fin du Foreach
}

//async function searchBar

let tagSearch

async function rechercheParTags() {
    ingredientsTags = Array.from(document.getElementsByClassName("ingredientsTags")).map(el => el.textContent)
    appareilsTags = Array.from(document.getElementsByClassName("appareilsTags")).map(el => el.textContent)
    ustensilsTags = Array.from(document.getElementsByClassName("ustensilsTags")).map(el => el.textContent)
    
    //filtrer la liste des recettes par rapport aux trois listes de tags

    recipesFiltre = recipesFiltre.filter(recette => 
        ingredientsTags.every(tagIng => recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tagIng))) && 
        ustensilsTags.every(tagUst => recette.ustensils.some(ustensils => ustensils.toLowerCase().includes(tagUst))) &&

        appareilsTags.every(tagApp => recette.appliance.toLowerCase().includes(tagApp)))


    //bien afficher DisplayRecipes puis Affichelist 
    
}


//montre les recettes en bloc
async function displayRecipes(recipesDisplay) {
    //tableaux vides
    //console.log(recipesFiltre);
    resultsSection.innerText = ''
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
        appliances = appliances.concat(recipe.appliance.toLowerCase())
        //tags['appareils'] = [...[recipe.appliance]];

        ustensils = ustensils.concat(recipe.ustensils.map(e => e.toLowerCase()))

        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase())

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

    afficheList('ingredients', tags['ingredients'])
    afficheList('ustensils', tags['ustensils'])
    afficheList('appareils', tags['appareils'])
};

//Pour chaque ustensile


async function init() {
    displayRecipes(recipesFiltre)
    dropdown("ingredients")
    dropdown("ustensils")
    dropdown("appareils")
};

init();

