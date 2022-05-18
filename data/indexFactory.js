function recipeFactory(data){

    const { id, name, servings, ingredients, ingredient, times, description, appliance, ustensils} = data;

    const recipeHTML = `

        <article class="recipe_article">
            <a href="#">
                <div class="container_image_recipe"> </div>
                <div class="boxTitle_imgWatch_Time">
                    <span class="size_name_recipe">${name}</span>
                    <div>
                        <span><img class="size_watch" src="img/icone_horloge.png" ></span>
                        <span class="size_min">${times} min</span>
                    </div>
                </div>
                <div class="container_ingredients_description">
                    <span class="box_ingrédients">
                        <div>${ingredient}</div>
                        <div>${ingredient}</div>
                        <div>${ingredient}</div>
                        <div>${ingredient}</div>
                        <div>${ingredient}</div>
                        <div>${ingredient}</div>
                    </span>                        
                    <span class="box_description_confection">${description}
                    </span>
                </div>
            </a>
        </article>    
    `;
    document.querySelector("main").innerHTML = recipeHTML;
}
recipeFactory(data);