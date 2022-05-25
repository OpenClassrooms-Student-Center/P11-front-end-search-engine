function displayRecipe (data) {

    let recipesHTML = "";

    data.forEach((recipe)=>{

        recipesHTML += `
    
        <article class="recipe_article">
            <a href="#">
                <div class="container_image_recipe"> </div>
                <div class="boxTitle_imgWatch_Time">
                    <span class="size_name_recipe">${recipe.name}</span>
                    <div>
                        <span><img class="size_watch" src="img/icone_horloge.png" ></span>
                        <span class="size_min">${recipe.time} min</span>
                    </div>
                </div>
                <div class="container_ingredients_description">
                    <span class="box_ingrédients">

                         ${recipe.ingredients.map((ingredient)=>{
// Méthode.map permet de returner un nouveau tableau à partir d'un tableau existant sur lequel on va appliquer une fonction sur chacun des éléments du tableau.



// L'opérateur de coalescence des nuls (??), est un opérateur logique qui renvoie son opérande de droite lorsque son opérande de gauche vaut null ou undefined et qui renvoie son opérande de gauche sinon.
                            let quantity = ingredient.quantity ?? ingredient.quantite;

                            let unit = ingredient.unit ?? ingredient.unite;

                            if(unit === undefined){

                                 unit = "";

                            }

                            if(quantity === undefined){

                                quantity = "";

                            }

                            return `
                            
                            <div>${ingredient.ingredient}: ${quantity} ${unit}</div>

                            `;

                         }).join("")}
                       
                    </span>                        
                    <span class="box_description_confection">${recipe.description}
                    </span>
                </div>
            </a>
        </article>    
    
    `;

    });

    document.querySelector("main").innerHTML = recipesHTML;
}
displayRecipe(recipes);