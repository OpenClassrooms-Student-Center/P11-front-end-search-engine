export default class SortAppliance {
    constructor(recipes, type) {
        this.recipes = recipes
        this.tableauIngredients = []
        this.type = type
    }

    init() {
        document.querySelector(".appliances ").addEventListener("click", () => {
            if (document.querySelector('.appliances').classList.contains("expanded")) {
                document.querySelector('.dropdown-list-appliances').style.display = "none"
                document.querySelector('.appliances').classList.remove("expanded")
            } else {
                document.querySelector('.dropdown-list-appliances').style.display = "flex"
                document.querySelector('.appliances').classList.add("expanded")

            }
            this.tableauIngredients = []
            this.recipes.forEach(el => {
                el.ingredients.forEach(ingredients => {
                    const toLower = ingredients.ingredient.toLowerCase()
                    if (this.tableauIngredients.includes(toLower) == false) {
                        this.tableauIngredients.push(toLower)
                        const items = `<li class="tag">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ingredients').insertAdjacentHTML('beforeend', items)
                    }
                })
            })
        })


    }
}


