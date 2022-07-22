import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
import SortIngredients from "./sortType/sortIngredients.js";

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

    displaySortInput() {
        const sort = new Filter(this.recipes)
        sort.filterRecipes()
    }

    sortByIngredients(){
        // link with sort
        document.querySelector(".search-menu").addEventListener("click", () => {
            if(!document.querySelector('.search-menu').classList.contains("expanded")){
                document.querySelector('.dropdown-list').style.display = "flex"
                document.querySelector('.search-menu').classList.add("expanded")
            }else{
                document.querySelector('.dropdown-list').style.display = "none"
                document.querySelector('.search-menu').classList.remove("expanded")  
            }
            //const itemsRecipies = new TagFactory(this.recipes, "ingrédia")
            const dropdownIngredient = new SortIngredients(this.recipes)
            dropdownIngredient.init()
        })
       
    }
}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySortInput()
app.sortByIngredients()