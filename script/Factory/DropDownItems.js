import Filter from "../Filter/Filter.js"
let currentRecipies = []
let tags = []

const tagsFilters = [
    "ingredients", 
    "appliances", 
    "ustensils"
]
let dropIngredients = document.querySelector(".dropdown-list-ingredients")
let dropAppliances  = document.querySelector(".dropdown-list-appliances")
let dropUstensils   = document.querySelector(".dropdown-list-ustensils")


// je récupere le champ de recherche ingredient
let inputIngredient = document.querySelector("#search-ingredients")

// je récupere le champ de recherche appareil
let inputAppareils = document.querySelector("#search-appliances")

// je récupere le champ de recherche ustensile
let inputUstensiles = document.querySelector("#search-ustensils")


// j'initialise un tableau vide qui contiendra la liste des ingrédients
let tabIngredients = []

// j'initialise un tableau vide qui contiendra les appareils
let tabAppareils = []

// j'initialise un tableau vide qui contiendra les ustensiles
let tabUstensiles = []



function normalizeString(string) {
    const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
    const spaceRegex = new RegExp(/\s/, "g");
    return string
      .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
      .replace(diacriticRegex, "") // remove diacritics
      .toLowerCase()
      .replace(spaceRegex, ""); // remove all spaces
}


export function DropDownList(currentRecipies, types, tagFiltered)
{
    //console.log(currentRecipies)
    switch(types)
    {
        // affichage des ingredients
        case "ingredients":

            tabIngredients = []
            
           
            // je boucle sur chaque recette
            currentRecipies.forEach(recette => {
               
                // Je re-boucle sur les tableaux d'ingrédients pour les concatener 
                recette.ingredients.forEach((ingredient) => {
                   // console.log("ingredient",ingredient.length)
                    // j'uniformise tout en minuscule
                    ingredient = ingredient.ingredient.toLowerCase()
                    let ingredientIsFiltered = tagFiltered.find( tag => tag.value === ingredient )
                   
                        
                    // je remet seulement la 1ere lettre en majuscule
                    ingredient = ingredient[0].toUpperCase() + ingredient.slice(1)

                    // Je remplis le tableau et evite les doublons
                    if (tabIngredients.includes(ingredient) == false && ingredientIsFiltered == undefined)
                    {
                        
                        tabIngredients.push(ingredient)
                        generateItems(tabIngredients, dropIngredients, 'ingredients')

                    }
                })
            })

            // je classe par ordre alphabétique
            tabIngredients = tabIngredients.sort()
            
            // je supprime les items affichés avant de reboucler dessus et refaire un affrichage filtré 
         
            document.querySelectorAll(`.dropdown-list-${types} .${types}-item`).forEach( (elt)=>{ elt.remove() } )

            // je boucle sur chaque ingrédient et je reaffiche les ingrédients triés par nom
         
            generateItems(tabIngredients, dropIngredients, 'ingredients')

        break

        // affichage des appareils
        case "appareils":

            tabAppareils = []

            // je boucle sur chaque recette
            currentRecipies.forEach(recette => {

                let appareil = recette.appliance

                // j'uniformise tout en minuscule
                appareil = appareil.toLowerCase()

                let appareilIsFiltered = tagFiltered.find( tag => tag.value === appareil )

                // je remet seulement la 1ere lettre en majuscule
                appareil = appareil[0].toUpperCase() + appareil.slice(1)

                // Je remplis le tableau et evite les doublons
                if ( tabAppareils.includes(appareil) == false && appareilIsFiltered == undefined )
                {
                    tabAppareils.push(appareil)
                    generateItems(tabAppareils, dropAppliances, 'appareils')
                }
            })

            // je classe par ordre alphabétique
            tabAppareils = tabAppareils.sort()

            // je supprime les items affichés avant de reboucler dessus et refaire un affrichage filtré 
           
            document.querySelectorAll(`.dropdown-list-${types} .${types}-item`).forEach( (elt)=>{ elt.remove() } )

            // je boucle sur chaque ingrédient et je reaffiche les ingrédients triés par nom
         
            generateItems(tabAppareils, dropAppliances, 'appareils')

        break

        // affichage des ustensiles
        case "ustensiles":

            tabUstensiles = []

            // je boucle sur chaque recette
            currentRecipies.forEach(recette => {

                let ustensiles = recette.ustensils.map(name => name.toLowerCase())

                // je capitalise la 1ere lettre 
                ustensiles.forEach( ustensile => {
                            
                    ustensile = ustensile[0].toUpperCase() + ustensile.slice(1) 

                    let ustensileIsFiltered = tagFiltered.find( tag => tag.value === ustensile.toLowerCase() )

                    // Je remplis le tableau et evite les doublons
                    if ( tabUstensiles.includes(ustensile) == false && ustensileIsFiltered == undefined )
                    {
                        tabUstensiles.push(ustensile)
                         generateItems(tabUstensiles, dropUstensils, 'ustensiles')
                    }
                })
            })

            // je classe par ordre alphabétique
            tabUstensiles = tabUstensiles.sort()

            // je supprime les items affichés avant de reboucler dessus et refaire un affrichage filtré 
            document.querySelectorAll("#ustensiles div").forEach( (elt)=>{ elt.remove() } )

            // je boucle sur chaque ustensile
            generateItems(tabUstensiles, dropUstensiles, 'ustensiles')

        break
    }
}

function generateItems(tab, domBlock, type)
{
  
    tab.forEach(item => {
   
      const itemNormalized = normalizeString(item)
      const listDOM = document.createElement("li");
            listDOM.classList.add("list-items", `${type}-item`);
            listDOM.setAttribute("id", "tag");
            listDOM.setAttribute("data-item", `${itemNormalized}`);
            listDOM.setAttribute("data-type", `${itemNormalized}`);
            
            listDOM.innerText = item;
            domBlock.append(listDOM);
            //console.log(listDOM)
            listDOM.addEventListener("click", () => addTag(item, type))
    })
   
}

function addTag(item, type)
{
    //let bagdeDiv = 
   // console.log(item, type, item)
    // Je crée le texte recherché
 
   
    tags.push(item)
    buildBages(tags, type, item)
  
    
    console.log("Après",tags)
    

}   
function removeBadge(filter, item)
{ 
console.log('ici')
  const filterTagBadge = tags.filter(tag == item) 
  tags.pop(filterTagBadge)
  buildBages(filter, item)
}
function buildBages(tags, filter, item){


        console.log(filter)
        const tagBadge = `
        <div id="tagItem" class="thumbnailTag thumbnail ${filter}" >
            <button id="btn-${filter}" >${item}</button>
            <i class="far fa-times-circle" aria-hidden="false" ></i>
        </div>`;

        // je prends la div qui contiendra les tags
        let currentTag = document.querySelector("#thumbnail-tags-container")
      
       
        for(let item of tags){
            //console.log(tags)
            return currentTag.innerHTML += tagBadge
        }
        const close = document.getElementsByClassName(`fa-times.circle`)
        close.addEventListener('click', () => {
          
            this.tagItem.classList.add("d-none")
            document.querySelectorAll("#card").forEach((elt) => {
                elt.remove()
                const viewCard = new CardRecipesFactory(this.recipes)
                viewCard.AllRecipes()
            })
        })
}

/*function filterInputIngradients() {
    this.input.oninput = (e) => {
        const searchString = e.target.value
        console.log(searchString)
        const filterRecipe = this.recipes.filter(result => {
            if (this.input.value === "") {
                this.tagIngredient.classList.add("d-none")
                const viewCard = new CardRecipesFactory(this.recipes)
                viewCard.Recipes()

                this.tagIngredient.innerHTML = ""
            }
            // show tag in DOM
            else {
                this.tagIngredient.classList.remove("d-none")
                document.getElementById("btnIngredient").innerText = this.input.value
                const tagItem = `
                        <div id="tagItemIngredients" class="thumbnailTag thumbnail ingredients">
                        <button id="btnIngredients" >${this.input.value}</button>
                        <i class="far fa-times-circle pe-auto"></i>
                        </div>`
                this.tagIngredient.innerHTML = tagItem
            }
           

            return (
                result.ingredients.find(items => {
                    return items.ingredient.toLowerCase().includes(searchString)
                }) != undefined
            )

        })
        const viewCard = new CardRecipesFactory(filterRecipe)
        viewCard.Recipes()
    }


}

/*function removeBadge(){
    document.querySelector(".fa-times-circle").addEventListener("click", (e) =>{

        console.log("ici dans le div")
        e.stopPropagation();
        document.querySelector("#tagItem").remove()
    })
}*/
/*function tagFilter(tags)
{
    let recipiesFiltered = currentRecipies

    // si le tableau de tags n'est pas vide je filtre sur recipiesFiltered selon les tags
    if (tags.length !== 0 )
    {
        tags.forEach(tag => {

            recipiesFiltered = recipiesFiltered.filter(recette =>{

                // je fais un lowercase sur tag.value pour bien comparer ensuite
                tag.value = tag.value.toLowerCase()
    
                // INGREDIENTS
                if ( tag.type == "ingredients" )
                {
                    let ingredientfounded = false
    
                    for (let i = 0 ; i < recette.ingredients.length ; i++)
                    {
                        if ( recette.ingredients[i].ingredient.toLowerCase() == tag.value )
                        {
                            ingredientfounded = true
                            break
                        }
                    }
                    if ( ingredientfounded == true )
                    {
                        return recette   
                    }
                }
                // APPAREILS
                if ( tag.type == "appareils" )
                {
                    let apapreilfounded = false
    
                    if ( recette.appliance.toLowerCase() == tag.value )
                    {
                        apapreilfounded = true
                    }
                    if ( apapreilfounded == true )
                    {
                        return recette   
                    }
                }
                // USTENSILES
                if ( tag.type == "ustensiles" )
                {
                    let ustensilsfounded = false
    
                    for (let i = 0 ; i < recette.ustensils.length ; i++)
                    {
                        if ( recette.ustensils[i].toLowerCase() == tag.value )
                        {
                            ustensilsfounded = true
                            break
                        }
                    }
                    if ( ustensilsfounded == true )
                    {
                        return recette   
                    } 
                }
            })
        })
    }
    // si le tableau de tags est vide je réutilise current recipies
    else
    {
        touchFilterType= new Filter(recipiesFiltered)
        touchFilterType.filterRecipes()
    }
}*/
