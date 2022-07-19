import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";

export default class App{
    constructor(){
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
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
                    if (this.input.value === "")
                    {
                        this.tag.classList.add("d-none")
                    }
                    // show tag in DOM
                    else
                    {
                        this.tag.classList.remove("d-none")
                        document.getElementById("btnIngredient").innerText = this.input.value
                    }  
                    document.querySelector('.fa-times-circle').addEventListener('click', (e)=>{
                        this.tag.classList.add("d-none")
                        this.input.value = ""
                    })
                    
                   return (
                    result.name.toLowerCase().includes(searchString) || 
                    result.description.toLowerCase().includes(searchString) ||
                    result.ingredients.find(items => {
                        return items.ingredient.toLowerCase().includes(searchString)
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