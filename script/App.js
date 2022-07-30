import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
import DropDown from "./dropdown.js";


export default class App {
    constructor() {
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
        this.close = document.querySelector('.fa-times-circle')
       
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
        const dropdowningre = new DropDown(this.recipes)
        dropdowningre.displayIngredients()
        const dropdownappl = new DropDown(this.recipes)
        dropdownappl.displayAppliances()
        const dropdownusten = new DropDown(this.recipes)
        dropdownusten.displayUstensils()
    }

}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySortInput()
app.displayDropDown()