const resultsTag = document.getElementById('localTags');
const recipeIngredient = document.getElementById('recipeIngredient')

function tagDetails(name) {
    const templateTag = document.querySelector('#tag');
// Populate the src at runtime.
    templateTag.content.querySelector('.label').text = 'name';

    const newTag = document.importNode(templateTag.content, true);


    console.log(newTag)
    resultsTag.appendChild(newTag);
}

const renderIngredients = (ingredients) => {
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result
console.log(ingredients)
    ingredients.forEach((ingredient) => {
        const newDivIngredient = document.createElement("button");
        newDivIngredient.innerText = `${ingredient}`;
        newDivIngredient.className = `filter__position-label`;
        newDivIngredient.onclick = () => tagDetails(ingredient);
        recipeIngredient.appendChild(newDivIngredient);
    })
}



export default renderIngredients;
