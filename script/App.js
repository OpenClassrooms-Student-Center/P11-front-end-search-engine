import recipes from "../data/recipes.js";
import CardReccipesFactory from "./Factory/CardReccipesFactory.js";
export default class App{
    constructor(){
        this.recipes = recipes
    }
    displayRecipes(){
        const viewCard =  new CardReccipesFactory()
        viewCard.AllRecipes()
    }
}

// affichage de View
const app = new App()
app.displayRecipes() 