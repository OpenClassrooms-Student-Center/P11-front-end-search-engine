const renderFilterIngredients = (ingredients) => {
    const recipeIngredient = document.getElementById('recipeIngredient')
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result

    function tagDetails() {
        const resultsTag = document.getElementById('localTags');
        const templateTagIng = document.querySelector('#tag');
        const detailTagNameIng = document.querySelector('#tagDetails');
        const detailTagIng = document.createTextNode(detailTagNameIng)
        resultsTag.appendChild(templateTagIng);
    }

    ingredients.forEach((ingredient) => {
        
        const newDivIngredient = document.createElement("button");
        newDivIngredient.innerText = `${ingredient}`;
        newDivIngredient.className = `filter__position-label`;
        newDivIngredient.onclick = tagDetails;
        recipeIngredient.appendChild(newDivIngredient);
    })

}

export default renderFilterIngredients;
