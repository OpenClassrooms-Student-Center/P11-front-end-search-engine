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
    const items = document.querySelector(".tagsIngr");
    let list = new Set();
    this.filtered.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        const ingredient = new ListOfFiltre(item);
        items.appendChild(ingredient.createListIngredients());
        list.add(item.ingredient);
      });
    });
    return list;

    /* let html = "";
    const items = document.querySelector(".tagsIngr");
    this.globalData.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        const ingredient = new ListOfFiltre(item);
        items.appendChild(ingredient.createListIngredients());
        //items.add(item.ingredient);
      });
    });
    document.querySelector(".tagsIngr").innerHTML = html; */
  }
}
App.init();
