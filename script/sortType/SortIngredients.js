import CardRecipesFactory from "../Factory/CardRecipesFactory.js"
export default class SortIngredients {
    constructor(recipes, type) {
        this.recipes = recipes
        this.tableauIngredients = []
        this.type = type
        this.tagIngredient = document.getElementById("thumbnail-tags-container")
        this.input = document.getElementById('ingredients')
        this.close = document.querySelector('.fa-times-circle')
    }
    normalizeString(string) {
        const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
        const spaceRegex = new RegExp(/\s/, "g");
        return string
            .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
            .replace(diacriticRegex, "") // remove diacritics
            .toLowerCase()
            .replace(spaceRegex, ""); // remove all spaces
    }
    init() {
        this.tableauIngredients = []
        this.filterInputIngradients()
        document.querySelector(".ingredients ").addEventListener("click", () => {
            if (document.querySelector('.ingredients').classList.contains("expanded")) {
                document.querySelector('.dropdown-list-ingredients').style.display = "none"
                document.querySelector('.ingredients').classList.remove("expanded")
            } else {
                document.querySelector('.dropdown-list-ingredients').style.display = "flex"
                document.querySelector('.ingredients').classList.add("expanded")
                document.querySelector('.dropdown-list-ustensils').style.display = "none"
                document.querySelector('.ustensils').classList.remove("expanded")
                document.querySelector('.dropdown-list-appliances').style.display = "none"
                document.querySelector('.appliances').classList.remove("expanded")

            }
            this.tableauIngredients = []
            this.recipes.forEach(el => {
                el.ingredients.forEach(ingredients => {
                    const toLower = ingredients.ingredient.toLowerCase()
                    if (this.tableauIngredients.includes(toLower) == false) {
                        this.tableauIngredients.push(toLower)
                        const items = `<li id="tag" data-id= ${this.normalizeString(toLower).split(" ").join("") + "-" + el.id}" onclick="${this.filterSelectIngredients(this)}" >${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ingredients').insertAdjacentHTML('beforeend', items)

                    }
                })
            })
        })
    }
    filterInputIngradients() {
        this.input.addEventListener("keyup", (e) => {
            const searchString = e.target.value
            const filterRecipe = this.recipes.filter(result => {
                if (this.input.value === "") {
                    this.tagIngredient.classList.add("d-none")
                    const viewCard = new CardRecipesFactory(this.recipes)
                    viewCard.AllRecipes()

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
                this.close.addEventListener('click', () => {
                    this.input.value = ""
                    this.tagIngredient.classList.add("d-none")
                    document.querySelectorAll("#card").forEach((elt) => {
                        elt.remove()
                        const viewCard = new CardRecipesFactory(this.recipes)
                        viewCard.AllRecipes()
                    })
                })

                return (
                    result.name.toLowerCase().includes(searchString) ||
                    result.description.toLowerCase().includes(searchString) ||
                    result.ingredients.find(items => {
                        return items.ingredient.toLowerCase().includes(searchString)
                    }) != undefined
                )

            })
            const viewCard = new CardRecipesFactory(filterRecipe)
            viewCard.AllRecipes()
        })


    }
    filterSelectIngredients() {
        document
            .querySelectorAll(".dropdown-list-ingredients #tag")
            .forEach((ingredientsList) => {
                ingredientsList
                    .addEventListener("click", () => {
                        // console.log(toLower)

                        if (this.tableauIngredients.includes(ingredientsList) == false) {

                            this.tableauIngredients.push(ingredientsList)
                           
                            //console.log(e.currentTarget)
                            const tagItem = `
                            <div id="tagItemIngredients" class="thumbnailTag thumbnail ingredients">
                            <button id="btnIngredients" >${ingredientsList.textContent}</button>
                            <i class="far fa-times-circle"></i>
                            </div>`
                            this.tagIngredient.insertAdjacentHTML('beforeend', tagItem)
                            console.log(document.getElementById("btnIngredients"))
                            // this.input.value = ingredientsList.textContent.toLowerCase().concat(" ", this.input.value)

                        }
                    })
            })
    }
}