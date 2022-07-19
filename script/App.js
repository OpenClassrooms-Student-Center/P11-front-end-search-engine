import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";

export default class App {
    constructor() {
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
        this.close = document.querySelector('.fa-times-circle')
    }
    displayAllRecipes() {
        const viewCard = new CardRecipesFactory(this.recipes)
        viewCard.AllRecipes()

    }

    displaySort() {
        const sort = new Filter(this.recipes)
        sort.filterRecipes()
    }
}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySort()