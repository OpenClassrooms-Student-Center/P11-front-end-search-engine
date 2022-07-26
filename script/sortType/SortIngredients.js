export default class SortIngredients{
    constructor(recipes, type){
        this.recipes = recipes
        this.tableauIngredients = []
        this.type = type
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
                        const items = `<li id="tag" data-id= ${this.normalizeString(toLower).split(" ").join("") + "-" + el.id}" >${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ingredients').insertAdjacentHTML('beforeend', items)
                    }
                })
            })
        })
    }
}