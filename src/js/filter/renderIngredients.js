import { tagDetails } from './filterTag'

const recipeIngredient = document.getElementById('recipeIngredient')

const renderIngredients = (ingredients) => {
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result
    ingredients.forEach((ingredient) => {
        const newDivIngredient = document.createElement("button");
        newDivIngredient.innerText = `${ingredient}`;
        newDivIngredient.className = `filter__position-label`;
        newDivIngredient.name = "ingredientButton"
        newDivIngredient.onclick = () => tagDetails(ingredient, 'ingredient');
        recipeIngredient.appendChild(newDivIngredient);
    })
}



export default renderIngredients;
