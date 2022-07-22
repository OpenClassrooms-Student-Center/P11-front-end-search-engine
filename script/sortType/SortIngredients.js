export default class SortIngredients{
    constructor(recipes){
        this.recipes = recipes
        this.tableauIngredients = []
    }
    
    init(){
    this.tableauIngredients = []
        this.recipes.forEach(el => {  

            console.log(el)
            
                el.ingredients.forEach(ingredients => {
                    const toLower = ingredients.ingredient.toLowerCase()
                    if ( this.tableauIngredients.includes(toLower) == false )
                    {
                        this.tableauIngredients.push(toLower)
                        const items = `<li class="tag">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list').insertAdjacentHTML('beforeend', items)
                    }
                console.log(toLower)
            })  
        })
    }
    
   
    


}