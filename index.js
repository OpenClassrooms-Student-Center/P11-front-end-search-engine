import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";
import { Filter } from "./scripts/templates/searchAlgo1.js";

class App {
  static async init() {
    const globalDataApi = new Api("/data/recipes.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    this.ingredientsSelected = ["Oignon", "Ail"];
    this.appareilsSelected = ["Mixer"];
    this.ustensilesSelected = ["casserolle"];
    //console.log(this.globalData);
    App.displayRecipes(globalData.recipes);
    this.filterRecipes(globalData.recipes);
  }
  // RECUPERE LA DATA ET HYDRATE LES COMPOSANTS, paramettre un array de recipes
  static displayRecipes(dataToDisplay) {
    document.getElementById("filtered-empty").style.display = "none";
    // message error hidden
    const recipesSection = document.querySelector(".recipe_section");
    recipesSection.innerHTML = "";
    dataToDisplay.forEach((recipe) => {
      const recipeCard = new Recipe(recipe);
      recipesSection.appendChild(recipeCard.createRecipesCard());
    });
    //message error
    if (dataToDisplay.length == 0) {
      document.getElementById("filtered-empty").style.display = "block";
    }
    App.createListIngredients(dataToDisplay);
    App.createListAppareils(dataToDisplay);
    App.createListUstensiles(dataToDisplay);
  }

  static createListIngredients(dataToDisplay) {
    ////Set n'autorise pas les doublons.
    let setIngredients = new Set();
    dataToDisplay.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        //toLowerCase()- returns the calling string value converted to lower case.
        //trim()- removes whitespace from both ends of a string and returns a new string, without modifying the original string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters
        //.sort()-sorts the elements of an array in place and returns the sorted array.
        setIngredients.add(ingredient.ingredient.toLowerCase().trim());
      });
    });
    App.createItemsIngredient(setIngredients);
  }

  //
  static createItemsIngredient(set) {
    const items = document.querySelector("#drop-ingredients_open");
    items.innerHTML = "";
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("ingredient");
      itemHtml.innerHTML = `<li class="ingredient-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }

  static createListAppareils(dataToDisplay) {
    ////Set n'autorise pas les doublons.
    let setAppareils = new Set();
    dataToDisplay.forEach((recipe) => {
      setAppareils.add(recipe.appliance.toLowerCase().trim());
    });
    App.createItemsAppareils(setAppareils);
  }

  //
  static createItemsAppareils(set) {
    const items = document.querySelector("#drop-appareils_open");
    items.innerHTML = "";
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("appareil");
      itemHtml.innerHTML = `<li class="appareil-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }

  static createListUstensiles(dataToDisplay) {
    ////Set n'autorise pas les doublons.
    let setUstensiles = new Set();
    dataToDisplay.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        setUstensiles.add(ustensil.toLowerCase());
      });
    });
    App.createItemsUstensiles(setUstensiles);
  }

  //
  static createItemsUstensiles(set) {
    const items = document.querySelector("#drop-ustensiles_open");
    items.innerHTML = "";
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    //console.log(array);
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("ustensile");
      itemHtml.innerHTML = `<li class="ustensile-tag">${array[i]}</li>`;
      items.appendChild(itemHtml);
    }
  }

  //search
  filterRecipes(recipes) {
    let ingredientsSelected = this.ingredientsSelected;
    let appareilsSelected = this.appareilsSelected;
    let ustensilesSelected = this.ustensilesSelected;

    const itemSearch = document.getElementById("search-all");
    itemSearch.addEventListener("input", function () {
      //console.log(recipes.length);
      if (itemSearch.value.length < 3) {
        App.displayRecipes(recipes);
      }
      if (itemSearch.value.length >= 3) {
        let filteredList = Filter.search(
          this.value,
          ingredientsSelected,
          appareilsSelected,
          ustensilesSelected,
          recipes
        );
        //console.log(recipes);
        App.displayRecipes(filteredList);
      }
    });
  }

  filterAppliance(app) {
    //console.log(recipes);
    const itemSearch = document.getElementById("search-drop_app");
    itemSearch.addEventListener("input", function () {
      if (itemSearch.value.length < 1) {
        App.createListAppareils(app);
      }
      if (itemSearch.value.length >= 1) {
        let filteredList = Filter.searchAppMenu(this.value, app);
        //console.log(recipes);
        App.createListAppareils(filteredList);
      }
    });
  }
}
App.init();
