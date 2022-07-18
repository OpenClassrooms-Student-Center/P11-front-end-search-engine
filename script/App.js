import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";

export default class App{
    constructor(){
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.wrapper = document.getElementById('cardRecipes')
    }
    displayAllRecipes(){
        const viewCard =  new CardRecipesFactory(this.recipes)
        viewCard.AllRecipes()
    }
    
    filterRecipes(){
        console.log(this.recipes)
        this.input.addEventListener("keyup", (e)=>{
                const searchString = e.target.value
                const filterRecipe = this.recipes.filter(result =>{
                  
                   return (
                    result.name.toLowerCase().includes(searchString) || 
                    result.description.toLowerCase().includes(searchString) ||
                    result.ingredients.find(element => {
                        return element.ingredient.toLowerCase().includes(searchString)
                    }) != undefined
                    )
                })
               
                const viewCard =  new CardRecipesFactory(filterRecipe)
                viewCard.AllRecipes()
            })
   
    }
}

// affichage dans la View
const app = new App()
app.displayAllRecipes() 
app.filterRecipes()