import recipes from "../data/recipes.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";

export default class App{
    constructor(){
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tag")
        this.showTag = document.getElementById("btnIngredient")
       
       
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
                    result.ingredients.find(items => {
                        return items.ingredient.toLowerCase().includes(searchString)
                    }) != undefined
                    )
                })
               /*this.recipes.filter(resultTag =>{
                    resultTag.ingredients.find(item =>{
                       
                        if(item.ingredients.indexOf(searchString)){     
                            const viewTag = ` 
                            <button id="btnIngredient" >${this.input.value}</button>
                            <i class="far fa-times-circle"></i>
                            `
                            this.tag.innerHTML = viewTag  
                            document.querySelector(".fa-times-circle").addEventListener('click', (e)=>{
                                e.setAttribute('.hidden')
                            }) 
                        }
                    })
                })/*
              
               
                
                const viewCard =  new CardRecipesFactory(filterRecipe)
                viewCard.AllRecipes()
                
            })

   
    }
}

// affichage dans la View
const app = new App()
app.displayAllRecipes() 
app.filterRecipes()