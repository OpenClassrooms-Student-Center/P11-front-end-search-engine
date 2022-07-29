import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
import SortIngredients from "./sortType/sortIngredients.js";
import SortAppliance from "./sortType/sortAppliance.js"
import SortUstencils from "./sortType/sortUstensils.js"


export default class App {
    constructor() {
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
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
   

    displayAllRecipes() {
        const viewCard = new CardRecipesFactory(this.recipes)
        viewCard.Recipes()

    }

    displaySortInput() {
        const sort = new Filter(this.recipes)
        sort.filterRecipes()
    }

    sortByButton(){
        // link with sort
       
        const dropdownIngredient = new SortIngredients(this.recipes)
        dropdownIngredient.displayIngredients()
      
        const dropdownAppliances = new SortAppliance(this.recipes)
        dropdownAppliances .init()
        const dropdownUstensils = new SortUstencils(this.recipes)
        dropdownUstensils.init()       
    }
}

// affichage dans la View
const app = new App()
app.displayAllRecipes()
app.displaySortInput()
app.sortByButton()