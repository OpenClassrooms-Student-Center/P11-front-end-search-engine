import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";
import { ListOfFiltre } from "./scripts/templates/dropIngredAparUstens.js";

class App {
  static async init() {
    const globalDataApi = new Api("/data/recipes.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    //console.log(this.globalData);
    this.displayRecipes();
    this.createListIngredients();
  }
  // RECUPERE LA DATA ET HYDRATE LES COMPOSANTS
  displayRecipes() {
    const recipesSection = document.querySelector(".recipe_section");
    this.globalData.recipes.forEach((recipe) => {
      const recipeCard = new Recipe(recipe);
      recipesSection.appendChild(recipeCard.createRecipesCard());
    });
  }

  createListIngredients() {
    ////Set n'autorise pas les doublons.
    let setIngredients = new Set();
    this.globalData.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        setIngredients.add(ingredient.ingredient);
      });
    });
    createItemsIngredient(setIngredients);
  }

  //
  createItemsIngredient(set) {
    const items = document.querySelector("#drop-ingredients_open");
    let array = set.entries();
    for (i = 0; i < array.lenght; i++) {
      items.appendChild(` 
        <li class="ingredient-tag">${array[i]}</li>
      `);
    }
  }
}
App.init();
