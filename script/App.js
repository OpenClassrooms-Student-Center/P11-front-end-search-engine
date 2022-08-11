import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
import SearchDropDown from './SearchDropDown.js'
import { SearchResultMessage } from "./utils/SearchResultMessage.js";

export default class App {
    constructor() {
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
        this.close = document.querySelector('.fa-times-circle')
        this.errorMessage = new SearchResultMessage(this.recipes);

    }
 
   

    displayAllRecipes() {
        const viewCard = new CardRecipesFactory(this.recipes)
        viewCard.Recipes()

    }

    displaySortInput() {
        const sort = new Filter(this.recipes)
        sort.FilterDisplayRecipes()
    }

    displayDropDown(){
        return new SearchDropDown(this.recipes)
    }

}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySortInput()
app.displayDropDown()