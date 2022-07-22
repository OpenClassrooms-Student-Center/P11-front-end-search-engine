export default class SortAppliance {
    constructor(recipes, type) {
        this.recipes = recipes
        this.tableauAppliances = []
        this.type = type
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

            }
            this.tableauAppliances = []
            this.recipes.forEach(el => {
                    const toLower = el.appliance.toLowerCase()
                    if (this.tableauAppliances.includes(toLower) == false) {
                        this.tableauAppliances.push(toLower)
                        const items = `<li class="tag">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-appliances').insertAdjacentHTML('beforeend', items)
                    }
                })
            })


    }
}


