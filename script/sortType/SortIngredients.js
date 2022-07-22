export default class SortIngredients{
    constructor(recipes){
        this.recipes = recipes
       
    }
    init(){
    this.recipes.forEach(el => {  
        this.toggleDorpdown()
            el.ingredients.find(recipe => {
                const ingredients = `<li class="tag" data-category="${recipe.id}">${recipe.ingredient}</li>`
                document.querySelector('.dropdown-list').insertAdjacentHTML('beforeend', ingredients)
            })  
        })
    }
    toggleDorpdown(){
        if(!document.querySelector('.search-menu').classList.contains("expanded")){
            document.querySelector('.dropdown-list').style.display = "flex"
            document.querySelector('.search-menu').classList.add("expanded")
        }else{
            document.querySelector('.dropdown-list').style.display = "none"
            document.querySelector('.search-menu').classList.remove("expanded")  
        }
    }


}