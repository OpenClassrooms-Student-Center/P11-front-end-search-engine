import { DisplayRecipe, recipesContainer } from "./DisplayRecipe.js";
import { setArrayFilters } from "./DisplayListFilter.js";
import { filterSearch } from "./FilterSearch.js";


const inputIngredient = document.querySelector("#input-ingredients");

const displayMessage = (recipesArray, value) => {
    const searchSection = document.querySelector(".search");
    let messageContainer = searchSection.querySelector(".search-message");
  
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
  
      switch (true) {
        case recipesArray.length === 1:
          messageContent.textContent = `${recipesArray.length} recette correspond à votre recherche`;
          break;
  
        case recipesArray.length === 0:
          messageContainer.classList.add("search-message_error");
          messageContent.textContent = `Désolé aucune recette ne correspond à votre recherche`;
          break;
  
        default:
          messageContent.textContent = `${recipesArray.length} recettes correspondent à votre recherche`;
      }
    } else if (messageContainer) {
      searchSection.removeChild(messageContainer);
    }
  };

export const searchInRecipes = (value, recipesArray) => {
  // Create a new array to stock filter recipes
  let filterByValueRecipes = [];

  if (value.length > 2) {
    for (let i = 0; i < recipesArray.length; i++) {
      // One recipe
      const recipe = recipesArray[i];

      // format name values
      const nameOfRecipes = recipe.name.toLowerCase().trim();

      // array of ingredients
      const ingredientsOfRecipes = recipe.ingredients;

      // array of ustensils
      const ustensilesOfRecipes = recipe.ustensils;

      // Search for name
      if (nameOfRecipes.includes(value)) {
        filterByValueRecipes.push(recipe);
      }

      // Search for ingredient
      for (let i = 0; i < ingredientsOfRecipes.length; i++) {
        let ingredient = ingredientsOfRecipes[i].ingredient
          .toLocaleLowerCase()
          .trim();
        ingredient.includes(value) && filterByValueRecipes.push(recipe);
      }

      // Search for ustentils
      for (let i = 0; i < ustensilesOfRecipes.length; i++) {
        let ustensile = ustensilesOfRecipes[i].toLocaleLowerCase().trim();
        ustensile.includes(value) && filterByValueRecipes.push(recipe);
      }

      //Delete recipes in double
      let uniqueRecipeInArray = [];
      for (let i = 0; i < filterByValueRecipes.length; i++) {
        let recipe = filterByValueRecipes[i];
        if (!uniqueRecipeInArray.includes(recipe)) {
          uniqueRecipeInArray.push(recipe);
        }
      }
      filterByValueRecipes = uniqueRecipeInArray;
    }
  } else {
    filterByValueRecipes = recipesArray;
  }


  inputIngredient.addEventListener("input", (e) => {
    filterSearch(e.target.value.toLowerCase().trim(), filterByValueRecipes, "ingredients", "ingredient", "filter-ingredient");
  })

  DisplayRecipe(filterByValueRecipes);
  setArrayFilters(
    filterByValueRecipes,
    "ingredients",
    "ingredient",
    "filter-ingredient"
  );
  setArrayFilters(
    filterByValueRecipes,
    "appliance",
    "appliance",
    "filter-appareils"
  );
  setArrayFilters(
    filterByValueRecipes,
    "ustensils",
    "ustensil",
    "filter-ustensiles"
  );
  displayMessage(filterByValueRecipes, value);
};
