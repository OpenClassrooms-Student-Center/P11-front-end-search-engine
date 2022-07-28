import CardRecipesFactory from "../Factory/CardRecipesFactory.js";
import SortIngredients from "../sortType/sortIngredients.js";

export default class Filter {
    constructor(recipes) {
        this.recipes = recipes
        this.input = document.getElementById("find")
        this.tag = document.getElementById("tagItem")
        this.close = document.querySelector('.fa-times-circle')
    }
    
    filterRecipes() {
        this.input.oninput = (e) => {
            const searchString = e.target.value
            const filteredRecipe = this.recipes.filter(result => {
                if (this.input.value === "") {
                    this.tag.classList.add("d-none")
                    const viewCard = new CardRecipesFactory(this.recipes)
                    viewCard.Recipes()
                }
                // show tag in DOM
                else {
                    this.tag.classList.remove("d-none")
                    document.getElementById("btnIngredient").innerText = this.input.value
                }
              


                return (
                    result.name.toLowerCase().includes(searchString) ||
                    result.description.toLowerCase().includes(searchString) ||
                    result.ingredients.find(items => {
                        return items.ingredient.toLowerCase().includes(searchString)
                    }) != undefined
                )



            })

            console.log("filtred recip ", filteredRecipe)
            
               const viewCard = new CardRecipesFactory(filteredRecipe)
                viewCard.Recipes()

               

                 const dropdownIngredient = new SortIngredients(filteredRecipe)
                 dropdownIngredient.manageEventFilterItem()
               
        }

        this.close.addEventListener('click', () => {
            this.input.value = ""
            this.tag.classList.add("d-none")
            document.querySelectorAll("#card").forEach((elt) => {
                elt.remove()
                const viewCard = new CardRecipesFactory(this.recipes)
                viewCard.Recipes()
            })
        })
    }
}
