export default class SortAppliance {
    constructor(recipes, type) {
        this.recipes = recipes
        this.tableauAppliances = []
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
        this.tableauAppliances = []
        document.querySelector(".appliances ").addEventListener("click", () => {
            if (document.querySelector('.appliances').classList.contains("expanded")) {
                document.querySelector('.dropdown-list-appliances').style.display = "none"
                document.querySelector('.appliances').classList.remove("expanded")
            } else {
                document.querySelector('.dropdown-list-appliances').style.display = "flex"
                document.querySelector('.appliances').classList.add("expanded")
                document.querySelector('.dropdown-list-ingredients').style.display = "none"
                document.querySelector('.ingredients').classList.remove("expanded")
                document.querySelector('.dropdown-list-ustensils').style.display = "none"
                document.querySelector('.ustensils').classList.remove("expanded") 

            }
            this.tableauAppliances = []
            this.recipes.forEach(el => {
                    const toLower = el.appliance.toLowerCase()
                    if (this.tableauAppliances.includes(toLower) == false) {
                        this.tableauAppliances.push(toLower)
                        const items = `<li id="tag" data-id= ${this.normalizeString(toLower).split(" ").join("") + "-" + el.id}">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-appliances').insertAdjacentHTML('beforeend', items)
                    }
                })
            })


    }
}


