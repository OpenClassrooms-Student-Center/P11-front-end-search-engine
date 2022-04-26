import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";

class App {
  static async init() {
    const globalDataApi = new Api("/data/recipes.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    console.log(this.globalData);
    this.displayRecipes();
  }
  // RECUPERE LA DATA ET HYDRATE LES COMPOSANTS
  displayRecipes() {
    const recipesSection = document.querySelector(".recipe_section");
    this.globalData.recipes.forEach((recipe) => {
      const recipeCard = new Recipe(recipe);
      recipesSection.appendChild(recipeCard.createRecipesCard());
    });
  }
}
App.init();
