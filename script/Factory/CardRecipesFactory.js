export default class CardRecipesFactory {
    constructor(recipesData) {
        this.recipesData = recipesData
        this.wrapper = document.getElementById('cardRecipes')
    }
    /**
     * @param {Arrray} Arrray media of data
     * affichage des cardRecipes avec leurs informations
     */
    async Recipes() {
        this.wrapper.innerHTML = ""
        
        this.recipesData.map(recipe => {
            let photo = "";
             photo = recipe.name.toLowerCase().replace(/\s/g, "");
             
            const card = `
                <article id="card" class="col-lg-3 col-md-6 m-4">
                <img class="card-img-top"  src="assets/images/${photo}.jpg" alt="default image" role="image"/>
                
                <div class="row infoDescription p-3">
                
                <h5 class="col-md-8 title mb-3 d-flex align-items-center">${recipe.name}</h5>
                
                <div class="col-md-4 time mb-3 d-flex justify-content-end">
                    <b class="d-flex align-items-center justify-content-between"> 
                        <span><i class="far fa-clock"></i>  ${recipe.time} min</span>
                    </b>
                </div>
                
                <ul class="col-md-6 mb-3" id="ingredients-${recipe.id}">
                
                </ul>
                
                <p id="description" class="col-md-6">${recipe.description.substring(0, 160) + "..."}</p>
                
                </div>
                
                </article>`


            // insert in DOM allCardRecipes
            this.wrapper.insertAdjacentHTML('beforeEnd', card)
            recipe.ingredients.map((ingredient) => {
                // console.log(ingredient)

                let listingredients = document.querySelector("#ingredients-" + recipe.id)

                let components = ingredient.ingredient
                let quantity = ingredient.quantity
                let unit = ingredient.unit

                if (quantity == undefined) {
                    quantity = ""
                }

                if (unit === undefined) {
                    unit = ""
                }

                const listeItem = `
                    <li><strong>${components} :</strong> ${quantity} ${unit}</li>
                    `

                listingredients.insertAdjacentHTML('beforeEnd', listeItem)
            })

        })
    }

}
