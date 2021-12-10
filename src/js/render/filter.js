const renderFilterIngredients = (ingredients) => {
    const recipeIngredient = document.getElementById('recipeIngredient')
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result

    ingredients.forEach((ingredient) => {
        const newDivIngredient = document.createElement("button");
        newDivIngredient.innerText = `${ingredient}`;
        newDivIngredient.className = `filter__position-label`;
        recipeIngredient.appendChild(newDivIngredient);
    })

}

export default renderFilterIngredients;
