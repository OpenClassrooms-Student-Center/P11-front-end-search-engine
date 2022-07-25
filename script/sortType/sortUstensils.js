import CardRecipesFactory from "../Factory/CardRecipesFactory.js"
import Filter from "../Filter/Filter.js"
export default class SortUstencils {
    constructor(recipes) {
        this.recipes = recipes
        this.tableauUstensils = []
        this.tag =  document.querySelector(".thumbnail-tags-container")
        this.input = document.getElementById("find")
    }
    normalizeString(string) {
        const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
        const spaceRegex = new RegExp(/\s/, "g");
        return string
            .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
            .replace(diacriticRegex, "") // remove diacritics
            .toLowerCase()
            .replace(spaceRegex, ""); // remove all spaces
    }


    init() {
        this.tableauUstensils = []
      
        document.querySelector(".ustensils").addEventListener("click", () => {
            if (document.querySelector('.ustensils').classList.contains("expanded")) {
                document.querySelector('.dropdown-list-ustensils').style.display = "none"
                document.querySelector('.ustensils').classList.remove("expanded")

            } else {
                document.querySelector('.dropdown-list-ustensils').style.display = "flex"
                document.querySelector('.ustensils').classList.add("expanded")
                document.querySelector('.dropdown-list-ingredients').style.display = "none"
                document.querySelector('.ingredients').classList.remove("expanded")
                document.querySelector('.dropdown-list-appliances').style.display = "none"
                document.querySelector('.appliances').classList.remove("expanded")
            }
            this.tableauUstensils = []
            this.recipes.forEach(el => {
                el.ustensils.forEach((ustensil) => {
                    const toLower = ustensil.toLowerCase()
                    // console.log(toLower)
                    if (this.tableauUstensils.includes(toLower) == false) {

                        this.tableauUstensils.push(toLower)
                        //  console.log(el.id)
                       
                        const items = `<li id="tag" data-id= ${this.normalizeString(toLower).split(" ").join("") + "-" + el.id}" onclick="${this.filterUstensils(this)}">${toLower[0].toUpperCase() + toLower.slice(1)}</li>`
                        document.querySelector('.dropdown-list-ustensils').insertAdjacentHTML('beforeend', items)
                       
                    }
                })
            })
        })
    }

    filterUstensils(){
        document
        .querySelectorAll(".dropdown-list-ustensils #tag")
        .forEach((ustensilDom) => {
            ustensilDom
            .addEventListener("click", ()=>{
                    // console.log(toLower)

                    if (this.tableauUstensils.includes(ustensilDom) == false) {

                        this.tableauUstensils.push(ustensilDom)
                       
            
                        //console.log(e.currentTarget)
                        const tagItem = `
                            <div id="tagItemUstensils" class="thumbnailTag thumbnail ustensils">
                            <button id="btnUstensils" >${ustensilDom.textContent}</button>
                            <i class="far fa-times-circle"></i>
                            </div>`
                            this.tag.insertAdjacentHTML('beforeend', tagItem) 
                       return this.input.value = ustensilDom.textContent.toLowerCase().concat(" ", this.input.value)
                     
                    }
                    const newFilter = new Filter(this.input.value)
                    newFilter.filterRecipes()
                    const viewCard = new CardRecipesFactory(this.input.value)
                    viewCard.AllRecipes()
                        
                })

                
        })
    }
    
}