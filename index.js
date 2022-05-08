import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";
import { Filter } from "./scripts/templates/searchAlgo1.js";
//import { Tags } from "./scripts/templates/displayTags.js";

class App {
  static async init() {
    const globalDataApi = new Api("/data/recipes.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    this.setIngredients = new Set();
    this.ingredientsSelected = ["Oignon", "Ail"];
    this.appareilsSelected = ["Mixer"];
    this.ustensilesSelected = ["casserolle"];
    //console.log(this.globalData);
    App.displayRecipes(globalData.recipes, this.setIngredients);
    this.filterRecipes(globalData.recipes);
    this.attachListenerTags();
  }
  // RECUPERE LA DATA ET HYDRATE LES COMPOSANTS, paramettre un array de recipes
  static displayRecipes(dataToDisplay, setIngredients) {
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
    App.createListIngredients(dataToDisplay, setIngredients);
    App.createListAppareils(dataToDisplay);
    App.createListUstensiles(dataToDisplay);
  }

  static createListIngredients(dataToDisplay, setIngredients) {
    ////Set n'autorise pas les doublons.
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
    array.sort();
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("li");
      itemHtml.classList.add("ingredient-tag");
      itemHtml.innerHTML = array[i];
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

  attachListenerTags() {
    const items = document.getElementById("tagIngr");
    const ingredientsHTMLCollection =
      document.getElementsByClassName("ingredient-tag");

    const ingredientsParrentNode = document.getElementById(
      "drop-ingredients_open"
    );
    let setIngredients = this.setIngredients;
    for (let i = 0; i < ingredientsHTMLCollection.length; i++) {
      let ing = ingredientsHTMLCollection[i];
      ing.addEventListener("click", function () {
        let itemHtml = document.createElement("i");
        itemHtml.classList.add("tag");
        itemHtml.innerHTML =
          ing.innerText +
          `<span class="tags__close">
        <img src="./images/remove-icon.png" alt=""/></span>`;
        itemHtml.addEventListener("click", function () {
          items.removeChild(itemHtml);
          ingredientsParrentNode.appendChild(ing);
          setIngredients.add(ing.innerText);
          App.createItemsIngredient(setIngredients);
        });
        items.appendChild(itemHtml);
        setIngredients.delete(ing.innerText);
        App.createItemsIngredient(setIngredients);
      });
    }
  }
}
App.init();
