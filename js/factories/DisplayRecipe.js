import { setArrayFilters } from "../search/handleFilter.js";

// Select DOM element
export const recipesContainer = document.querySelector(".recipe-container");

/**
 * 
 * @param {array} array of recipes 
 */
export function DisplayRecipe(recipes) {

    recipesContainer.innerHTML = ""

    recipes.forEach(recipe => {
        // Card
    const recipeCard = document.createElement('section');
    recipeCard.classList.add('recipe-card');
    recipesContainer.appendChild(recipeCard);

    // Card Header
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('recipe-card_header');
    recipeCard.appendChild(cardHeader);

    // Recipe Image
    const recipeImg = document.createElement('img');
    recipeImg.classList.add('recipe-card_header-img');
    recipeImg.setAttribute("src", `./assets/${recipe.picture}`);
    recipeImg.setAttribute("alt", `${recipe.name}`);
    cardHeader.appendChild(recipeImg);

    //Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('recipe-card_body');
    recipeCard.appendChild(cardBody);

    //Card Body Header
    const cardBodyHeader = document.createElement('div');
    cardBodyHeader.classList.add('recipe-card_body-header');
    cardBody.appendChild(cardBodyHeader);

        // Card Body Header Element
        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = `${recipe.name}`
        cardBodyHeader.appendChild(recipeTitle);

        const recipeTime = document.createElement('h3');
        const recipeTimeIcon = document.createElement('i');
        recipeTime.textContent = `${recipe.time} mn`
        recipeTimeIcon.classList.add('fa-regular');  
        recipeTimeIcon.classList.add('fa-clock');  
        recipeTime.appendChild(recipeTimeIcon);
        cardBodyHeader.appendChild(recipeTime);

    //Card Body Content
    const cardBodyContent = document.createElement('div');
    cardBodyContent.classList.add('recipe-card_body-content');
    cardBody.appendChild(cardBodyContent);
        
        //Card Body Content Element
        const ingredientList = document.createElement('ul');
        cardBodyContent.appendChild(ingredientList);

        recipe.ingredients.forEach(ingredient => {
            const listElement = document.createElement('li');
            listElement.textContent = `${ingredient.ingredient} ${ingredient.quantity ? `: ${ingredient.quantity}` : ''} ${ingredient.unit ? ingredient.unit : ''}`
            ingredientList.appendChild(listElement)
        });

        const recipeDescription = document.createElement('p'); 
        recipeDescription.textContent = `${recipe.description}`;
        cardBodyContent.appendChild(recipeDescription); 
    })
    
};


/**
 * 
 * @param {array} recipesArray array of recipes
 * @param {string} value of input search
 */
export const displayMessage = (recipesArray, value) => {

    // select element in DOM
      const searchSection = document.querySelector(".search");
      let messageContainer = searchSection.querySelector(".search-message");
  
  
      // create message element in DOM
      if (value.length > 2) {
        if (!messageContainer) {
          messageContainer = document.createElement("div");
          messageContainer.classList.add("search-message");
          searchSection.appendChild(messageContainer);
        }
    
        let messageContent = messageContainer.querySelector(
          ".search-message_content"
        );
        if (!messageContent) {
          messageContent = document.createElement("p");
          messageContent.classList.add("search-message_content");
          messageContainer.appendChild(messageContent);
        }
  
        // Update element message in DOM
        switch (true) {
          case recipesArray.length === 1:
            messageContent.textContent = `${recipesArray.length} recette correspond à votre recherche`;
            messageContainer.classList.remove("search-message_error");
            break;
    
          case recipesArray.length === 0:
            messageContainer.classList.add("search-message_error");
            messageContent.textContent = `« Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson »`;
            break;
    
          default:
            messageContent.textContent = `${recipesArray.length} recettes correspondent à votre recherche`;
            messageContainer.classList.remove("search-message_error");
  
        }
      } else if (messageContainer) {
        searchSection.removeChild(messageContainer);
      }
    };


// Function to display all recipes and filters lists
export const displayAllElements = (arrayOfRecipes) => {
  DisplayRecipe(arrayOfRecipes);
  setArrayFilters(
    arrayOfRecipes,
    "ingredients",
    "ingredient",
    "filter-ingredient"
  );
  setArrayFilters(arrayOfRecipes, "appliance", "appliance", "filter-appareils");
  setArrayFilters(arrayOfRecipes, "ustensils", "ustensil", "filter-ustensiles");
};
