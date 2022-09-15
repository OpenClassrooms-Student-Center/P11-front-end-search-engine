function displayRecipes(data) {

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