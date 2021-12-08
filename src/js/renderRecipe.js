// function qui build depuis le template les card de recette, 
const renderRecipe = (recipes) => {
    const resultsDiv = document.getElementById('results')
    resultsDiv.innerHTML = ""; // vide le contenue de la div result

    recipes.map(recipe => {
        const template = document.querySelector('#recipeCard');
        const clone = template.content.cloneNode(true);
        const recipeName = clone.querySelector('#recipeName');
        const recipeTime = clone.querySelector('#recipeTime');
        /* const recipeIngredients = clone.querySelector('#recipeIngredients'); */
        const recipeIngredientsList = clone.querySelector('#recipeIngredientsList');
        /* const recipeQuantities = clone.querySelector('#recipeQuantities'); */
        const recipeDetail = clone.querySelector('#recipeDetail');


        recipeName.textContent = recipe.name
        recipeTime.textContent = recipe.time
        recipeName.textContent = recipe.name
        recipeDetail.textContent = recipe.description

        recipe.ingredients.forEach((ingredient) => {
            const newDiv = document.createElement("div");
            newDiv.innerText = `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`;
            recipeIngredientsList.appendChild(newDiv);
        })

        resultsDiv.appendChild(clone) // ajoute dans la div result la card depuis le template
    })
    renderRecipe(recipes)
}
