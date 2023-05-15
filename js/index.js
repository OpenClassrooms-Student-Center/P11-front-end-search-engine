const resultsSection = document.querySelector(".results");
const tagsSection = document.querySelector(".tags-filtres")

const getTags = Array.of(document.getElementsByClassName("tags"))

const ddInputs = Array.from(document.querySelectorAll(".dd-input"))
const recipesFiltre = recipes
const chevronUp = Array.from(document.querySelectorAll(".fa-chevron-up"))
const dropdownsEl = Array.from(document.querySelectorAll(".fa-chevron-down"));
const articleBloc = Array.from(document.getElementsByClassName("article-bloc"))
let filterList = [];

//console.log(dropdownsEl);

let tags = []



dropdownsEl.forEach(dd =>
    dd.addEventListener("click", (e) => {
        ouvreListe(e.target)
        //console.log(e.target.id);

    }))


function ouvreListe(e) {
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

            let nameTarget = el.target.textContent;
            let div = document.createElement("div")
            div.classList.add('tags')
            div.classList.add(nom + 'Tags')
            div.innerText = nameTarget
            let i = document.createElement("i")
            i.classList.add("fa-solid")
            i.classList.add("fa-xmark")
            i.addEventListener("click", (clic) => {
                div.remove();
                //todo : appeler les fonctions de recherche par tags et dans la barre

            })
            div.appendChild(i)
            tagsSection.appendChild(div)
            RechercheParTags();

        })

    }) //fin du Foreach
}

let tagSearch

async function RechercheParTags() {
    //recuperer les trois listes de tags
    console.log(nom);
    console.log(getTags[0]);
    let tagsInsider = Array.from(getTags[0])
    console.log(tags[nom]);

    //filtrer la liste des recettes par rapport aux trois listes de tags
    tagsInsider.forEach((tag =>
        tagSearch = tags.filter(tag => tag.includes(tag.textContent))))

    console.log(tagSearch);

    //bien afficher DisplayRecipes puis Affichelist 
    displayRecipes(tagSearch)

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

};

//Pour chaque ustensile


async function init() {
    displayRecipes(recipesFiltre)
    dropdown("ingredients")
    dropdown("ustensils")
    dropdown("appareils")
};

init();

