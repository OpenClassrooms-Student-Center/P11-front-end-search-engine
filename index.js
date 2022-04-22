import { Api } from "../api/api.js";

class App {
  static async init() {
    const globalDataApi = new Api("./data/recipes.js");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    this.displayRecipesCard();
  }
  displayRecipesCard() {
    const recipesSection = document.querySelector(".recipe_section");
    this.globalData.recipes.forEach((recipe) => {
      recipe.alt = recipe.name;
      const userCardDOM = new RecipeCard(recipe);
      recipesSection.appendChild(userCardDOM.createRecipeCard());
    });
  }
}

App.init();
