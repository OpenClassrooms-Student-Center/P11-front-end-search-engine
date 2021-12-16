const renderFilterIngredients = (ingredients) => {
    const recipeIngredient = document.getElementById('recipeIngredient')
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result

    function tagDetails() {
        const templateTagIng = document.querySelector('#tag');
        const resultsTag = document.getElementById('localTags');
        const detailTagNameIng = document.querySelector('#tagDetails');
        const detailTagIng = document.createTextNode(detailTagNameIng)
        resultsTag.appendChild(document.importNode(templateTagIng, true));
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
