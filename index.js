import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";
//import { search } from "../../search.js";

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
    this.createListAppareils();
    this.createListUstensiles();
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
    this.globalData.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        //toLowerCase()- returns the calling string value converted to lower case.
        //trim()- removes whitespace from both ends of a string and returns a new string, without modifying the original string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters
        //.sort()-sorts the elements of an array in place and returns the sorted array.
        setIngredients.add(ingredient.ingredient.toLowerCase().trim());
      });
    });
    this.createItemsIngredient(setIngredients);
  }

  //
  createItemsIngredient(set) {
    const items = document.querySelector("#drop-ingredients_open");
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("ingredient");
      itemHtml.innerHTML = `<li class="ingredient-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }

  createListAppareils() {
    ////Set n'autorise pas les doublons.
    let setAppareils = new Set();
    this.globalData.recipes.forEach((recipe) => {
      setAppareils.add(recipe.appliance.toLowerCase().trim());
    });
    this.createItemsAppareils(setAppareils);
  }

  //
  createItemsAppareils(set) {
    const items = document.querySelector("#drop-appareils_open");
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("appareil");
      itemHtml.innerHTML = `<li class="appareil-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }

  createListUstensiles() {
    ////Set n'autorise pas les doublons.
    let setUstensiles = new Set();
    this.globalData.recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        setUstensiles.add(ustensil.toLowerCase().trim().sort());
      });
    });
    this.createItemsUstensiles(setUstensiles);
  }

  //
  createItemsUstensiles(set) {
    const items = document.querySelector("#drop-ustensiles_open");
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("ustensile");
      itemHtml.innerHTML = `<li class="ustensile-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }
}
App.init();
