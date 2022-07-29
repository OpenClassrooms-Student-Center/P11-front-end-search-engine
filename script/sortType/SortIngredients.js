import CardRecipesFactory from "../Factory/CardRecipesFactory.js"
export default class SortIngredients {

    constructor(recipes) {
        console.log('je suis ici  sorted', recipes.length)
        this.recipes = recipes
        
        this.tagIngredient = document.getElementById("thumbnail-tags-container")
        this.input = document.getElementById('search-ingredients')
        this.close = document.querySelector('.fa-times-circle')
    }
    buildListIngredient(ingredient){
            const listIngredients = document.createElement("li");
            listIngredients.classList.add(
            "list-items",
            "ingredient-item"
            );
            listIngredients.setAttribute('id', 'tag')
            listIngredients.setAttribute("data-item", ingredient)
            listIngredients.setAttribute("data-type", "ingredient")
            listIngredients.innerText = ingredient[0].toUpperCase() + ingredient.slice(1)
           // console.log(listOfIngredients)

            return document.querySelector('.dropdown-list-ingredients').append(listIngredients)
    }
   
    removeIngredients(){
           document.querySelector('.dropdown-list-ingredients').innerHTML = ''
        
    }
    
    displayIngredients() {
    this.filterInputIngradients()
    this.removeIngredients()

        document.querySelector(".ingredients ").addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()

            this.toogle()
             
          console.log("this RR", this.recipes)
         
            const tableauIngredients = []
            this.recipes.forEach(recipe => {
                const recipeIngredients = recipe.ingredients
                recipeIngredients.forEach((ingredients) => {
                    //  console.log(ingredients) 
                    const ingredient = ingredients.ingredient.toLowerCase()
                    if(!tableauIngredients.includes(ingredient)){ 
                        tableauIngredients.push(ingredient)
                        // const sortIngredient = sort(this.tableauIngredients)ingredient
                        return this.buildListIngredient(ingredient)
                        //console.log(listOfIngredients); 
                    }
                
                //const doubleDelete = tableauIngredients.filter((item, index, arr) => arr.indexOf(item) == index)
                })
            })
        })
    }
    toogle(){
        if (document.querySelector('.ingredients').classList.contains("expanded")) {
            document.querySelector('.dropdown-list-ingredients').style.display = "none"
            document.querySelector('.ingredients').classList.remove("expanded")
        } else {
            document.querySelector('.dropdown-list-ingredients').style.display = "flex"
            document.querySelector('.ingredients').classList.add("expanded")
            document.querySelector('.dropdown-list-ustensils').style.display = "none"
            document.querySelector('.ustensils').classList.remove("expanded")
            document.querySelector('.dropdown-list-appliances').style.display = "none"
            document.querySelector('.appliances').classList.remove("expanded")
        }
    }

    manageEventFilterItem(){
          this.removeIngredients()
            const tableauIngredients = []
            this.recipes.forEach(recipe => {
                console.log(recipe)
                this.removeIngredients()
                recipe.ingredients.forEach((ingredients) => {
                    //  console.log(ingredients) 
                    const ingredient = ingredients.ingredient.toLowerCase()
                    if(!tableauIngredients.includes(ingredient)){ 
                        tableauIngredients.push(ingredient)
                        // const sortIngredient = sort(this.tableauIngredients)ingredient
                        this.buildListIngredient(ingredient)
                    }
                
                //const doubleDelete = tableauIngredients.filter((item, index, arr) => arr.indexOf(item) == index)
         
                })
                this.filterInputIngradients(tableauIngredients)
                console.log(tableauIngredients)
            })
    
    }


    
    filterInputIngradients() {
        this.input.oninput = (e) => {
            
            const searchString = e.target.value
            console.log(searchString)
            const filterRecipe = this.recipes.filter(result => {
               
                if (this.input.value < 3) {
                    this.tagIngredient.classList.add("d-none")
                    const viewCard = new CardRecipesFactory(this.recipes)
                    viewCard.Recipes()

                    this.tagIngredient.innerHTML = ""
                }
                // show tag in DOM
                else {
                    this.tagIngredient.classList.remove("d-none")
                    document.getElementById("btnIngredient").innerText = this.input.value
                    const tagItem = `
                            <div id="tagItemIngredients" class="thumbnailTag thumbnail ingredients">
                            <button id="btnIngredients" >${this.input.value}</button>
                            <i class="far fa-times-circle pe-auto"></i>
                            </div>`
                    this.tagIngredient.innerHTML = tagItem
                }
               
                
                return (
                    result.ingredients.find(items => {
                        return items.ingredient.toLowerCase().includes(searchString)
                    }) != undefined
                )
             
            })
            
            const viewCard = new CardRecipesFactory(filterRecipe)
            viewCard.Recipes()  
        }
       

    }
   /* filterSelectIngredients() {
        this.tableauIngredients = []
        document
            .querySelectorAll(".dropdown-list-ingredients #tag")
            .forEach((ingredientsList) => {
                ingredientsList
                    .addEventListener("click", (e) => {
                        e.preventDefault()
                        const ingredient = e.currentTarget.textContent
                        const filterRecipe = this.recipes.filter(result => {
                            if (this.tableauIngredients.includes(ingredientsList) == false) {
                                this.tableauIngredients.push(ingredientsList)
                                const tagItem = `
                                    <div id="tagItemIngredients" class="thumbnailTag thumbnail ingredients" >
                                    <button id="btnIngredients" >${ingredient}</button>
                                    <i class="far fa-times-circle"></i>
                                    </div>`
                                this.tagIngredient.insertAdjacentHTML('beforeend', tagItem)
                                if (this.tagIngredient.innerHTML == "") {
                                    const viewCard = new CardRecipesFactory(this.recipes)
                                    viewCard.AllRecipes()
                                    this.tagIngredient.innerHTML = ""
                                } else {
                                    return (
                                        result.name.toLowerCase().includes(ingredient) ||
                                        result.description.toLowerCase().includes(ingredient) ||
                                        result.ingredients.find(items => {
                                            return items.ingredient.toLowerCase().includes(ingredient)
                                        }) != undefined
                                    )
                                }
                            }
                           
                            })
                            const viewCard = new CardRecipesFactory(filterRecipe)
                            viewCard.AllRecipes()
                    })



            })
    }*/
}