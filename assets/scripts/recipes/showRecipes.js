import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';

const showRecipes = () => {
  recipes.forEach((recipe) => {
    const article = document.createElement('article');
    article.className = 'recipe';
    article.classList.add('show');
    article.dataset.id = recipe.id;

    const imgMain = document.createElement('img');
    imgMain.className = 'recipe-img';
    imgMain.src = 'assets/images/logos/logo.svg';
    imgMain.alt = 'image empty logo';
    article.appendChild(imgMain);

    const description = document.createElement('div');
    description.className = 'recipe-description';

    const descriptionHead = document.createElement('div');
    descriptionHead.className = 'recipe-description-head';

    const descriptionHeadLeft = document.createElement('h4');
    descriptionHeadLeft.textContent = recipe.name;

    descriptionHead.appendChild(descriptionHeadLeft);

    const descriptionHeadRight = document.createElement('div');
    const imgTime = document.createElement('img');
    imgTime.src = 'assets/images/icons/time.svg';
    imgTime.alt = ' icon time';
    descriptionHeadRight.appendChild(imgTime);

    const time = document.createElement('h5');
    time.textContent = `${recipe.time} min`;
    descriptionHeadRight.appendChild(time);

    descriptionHead.appendChild(descriptionHeadRight);

    description.appendChild(descriptionHead);

    const descriptionBody = document.createElement('div');
    descriptionBody.className = 'recipe-description-body';

    const ingredients = document.createElement('div');

    recipe.ingredients.forEach((ingredient) => {
      const ingredientDiv = document.createElement('div');
      ingredientDiv.className = '';
      const ingredientTitle = document.createElement('h6');
      ingredientTitle.textContent = `${ingredient.ingredient} : `;
      const ingredientMesure = document.createElement('span');
      ingredientMesure.textContent = ` ${
        ingredient.quantity ? ingredient.quantity : 'non indiqué'
      } ${ingredient.unit ? ingredient.unit : ''}`;

      ingredientDiv.appendChild(ingredientTitle);
      ingredientDiv.appendChild(ingredientMesure);
      ingredients.appendChild(ingredientDiv);
    });
    descriptionBody.appendChild(ingredients);

    const descriptionBodyDescription = document.createElement('span');
    descriptionBodyDescription.textContent = recipe.description;

    descriptionBody.appendChild(descriptionBodyDescription);
    description.appendChild(descriptionBody);

    article.appendChild(description);

    domElements.allRecipes.appendChild(article);
  });
};

export default showRecipes;
