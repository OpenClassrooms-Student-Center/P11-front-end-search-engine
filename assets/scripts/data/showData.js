import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';
import getData from './cleanData.js';

const { allIngredients, allAppliances, allUstensils } = getData();

export function showInputsSecondary() {
  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const inputSecondaryName = input.classList[1];
    let array = [];
    if (inputSecondaryName === 'ingredients') {
      array = allIngredients;
    } else if (inputSecondaryName === 'appliances') {
      array = allAppliances;
    } else if (inputSecondaryName === 'ustensils') {
      array = allUstensils;
    }
    inputLEC.replaceChildren();
    array
      .sort((a, b) => a.recurrence < b.recurrence)
      .slice(0, 30)
      .forEach((item) => {
        const div = document.createElement('div');
        div.className = 'input-secondary-ingredient';
        div.textContent =
          item.item.substring(0, 1).toUpperCase() + item.item.substring(1);
        inputLEC.appendChild(div);
      });
  });
}

export function showRecipes() {
  console.log(recipes[1]);
  recipes.forEach((recipe) => {
    console.log(recipe);
    const article = document.createElement('article');
    article.className = 'recipe';

    const img = document.createElement('img');
    img.className = 'recipe-img';
    img.src = 'assets/images/logos/logo.svg';
    img.alt = 'image empty logo';
    article.appendChild(img);

    domElements.allRecipes.appendChild(article);
  });
}
