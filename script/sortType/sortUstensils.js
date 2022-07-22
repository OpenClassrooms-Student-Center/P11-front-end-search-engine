export default class SortUstencils{
    constructor(recipes, type){
        this.recipes = recipes
        this.tableauUstensils = []
        this.type = type
    }
    
    init(){
        this.tableauUstensils = []
        document.querySelector(".ustensils").addEventListener("click", () => {
            if(document.querySelector('.ustensils').classList.contains("expanded")){
                document.querySelector('.dropdown-list-ustensils').style.display = "none"
                document.querySelector('.ustensils').classList.remove("expanded")  
            }else{
                document.querySelector('.dropdown-list-ustensils').style.display = "flex"
                document.querySelector('.ustensils').classList.add("expanded")
                
            }
            this.tableauUstensils = []
            this.recipes.forEach(el => {  
            el.ustensils.forEach(ustensil => {
              
                    const toLower = ustensil.toLowerCase()
                    console.log(toLower)
                    if ( this.tableauUstensils.includes(toLower) == false )
                    {
                        this.tableauUstensils.push(toLower)
                        const items = `<li class="tag">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ustensils').insertAdjacentHTML('beforeend', items)
                    }
            })  
        })
        })
        
    
    }
}