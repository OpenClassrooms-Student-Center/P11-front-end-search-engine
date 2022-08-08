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
        sort.filterRecipes()
    }

    displayDropDown(){
        const dropdowningre =new SearchDropDown(this.recipes)
        dropdowningre.displayItem("ingredients", this.recipes)
        const dropdownappl =new SearchDropDown(this.recipes)
        dropdownappl.displayItem("appliances", this.recipes)
        const dropdownusten =new SearchDropDown(this.recipes)
        dropdownusten.displayItem("ustensils", this.recipes)
    }

}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySortInput()
app.displayDropDown()