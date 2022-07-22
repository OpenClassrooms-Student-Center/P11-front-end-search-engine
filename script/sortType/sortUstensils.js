export default class SortUstencils{
    constructor(recipes, type){
        this.recipes = recipes
        this.tableauIngredients = []
        this.type = type
    }
    
    init(){
        document.querySelector(".ustensils").addEventListener("click", () => {
            if(document.querySelector('.ustensils').classList.contains("expanded")){
                document.querySelector('.dropdown-list-ustensils').style.display = "none"
                document.querySelector('.ustensils').classList.remove("expanded")  
            }else{
                document.querySelector('.dropdown-list-ustensils').style.display = "flex"
                document.querySelector('.ustensils').classList.add("expanded")
                
            }
            this.tableauIngredients = []
            this.recipes.forEach(el => {  
            el.ingredients.forEach(ingredients => {
                    const toLower = ingredients.ingredient.toLowerCase()
                    if ( this.tableauIngredients.includes(toLower) == false )
                    {
                        this.tableauIngredients.push(toLower)
                        const items = `<li class="tag">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ingredients').insertAdjacentHTML('beforeend', items)
                    }
            })  
        })
        })
        
    
    }
}