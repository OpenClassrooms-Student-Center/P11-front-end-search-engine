import recipes from '../data/recipes.js';

export default class Home {
    constructor() {
        this.RecipesData = recipes
    }
    /**
     * @param {Arrray} Arrray media of data
     * affichage des vignettes des photographes avec leurs informations
     */
    async displayRecipes() {
         console.log(this.RecipesData)

       
    }
    
}
// affichage de View
const app = new Home()
app.displayRecipes() 