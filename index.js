import {
  Api
} from "./scripts/api/api.js";
import {
  Recipe
} from "./scripts/templates/Recipe.js";
import {
  Filter
} from "./scripts/templates/searchAlgo1.js";

class App {
  static async init() {
    const globalDataApi = new Api("/data/recipes.json");
    const globalData = await globalDataApi.getData();
    new App(globalData);
  }
  constructor(globalData) {
    this.globalData = globalData;
    this.setIngredients = new Set();
    this.setAppareils = new Set();
    this.setUstensiles = new Set();
    this.filteredRecipes = globalData.recipes;
    this.searchWord = "";
    this.ingredientsSelected = new Set();
    this.appareilsSelected = new Set();
    this.ustensilesSelected = new Set();
    this.displayRecipes();
    this.attachListnerGlobalSearch();
    this.attachListnerSearchIngDropdown();
    this.attachListnerSearchAppDropdown();
    this.attachListnerSearchUstDropdown();
  }
  // RECUPERE LA DATA ET HYDRATE LES COMPOSANTS, paramettre un array de recipes
  displayRecipes() {
    document.getElementById("filtered-empty").style.display = "none";
    // message error hidden
    const recipesSection = document.querySelector(".recipe_section");
    recipesSection.innerHTML = "";

    this.filteredRecipes.forEach((recipe) => {
      const recipeCard = new Recipe(recipe);
      recipesSection.appendChild(recipeCard.createRecipesCard());
    });
    //display message error
    if (this.filteredRecipes.length == 0) {
      document.getElementById("filtered-empty").style.display = "block";
    }
    App.createListIngredients(
      this.filteredRecipes,
      this.setIngredients,
      this.ingredientsSelected
    );
    App.createListAppareils(
      this.filteredRecipes,
      this.setAppareils,
      this.appareilsSelected
    );
    App.createListUstensiles(
      this.filteredRecipes,
      this.setUstensiles,
      this.ustensilesSelected
    );
    this.attachListenerTagsIngredients();
    this.attachListenerTagsAppliances();
    this.attachListenerTagsUstensils();
  }

  static createListIngredients(
    dataToDisplay,
    setIngredients,
    ingredientsSelected
  ) {
    ////Set n'autorise pas les doublons.
    setIngredients.clear();
    dataToDisplay.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        //toLowerCase()- returns the calling string value converted to lower case.
        //trim()- removes whitespace from both ends of a string and returns a new string, without modifying the original string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters
        //.sort()-sorts the elements of an array in place and returns the sorted array.
        let ingredientName = ingredient.ingredient.toLowerCase().trim();
        setIngredients.add(ingredientName);
      });
    });
    App.createItemsIngredient(setIngredients, ingredientsSelected);
  }

  //Display for the page the ingredients
  static createItemsIngredient(set, ingredientsSelected) {
    const items = document.querySelector("#drop-ingredients_open");
    items.innerHTML = "";
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    ////Set n'autorise pas les doublons.
    let array = Array.from(set);
    array.sort().flat();
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("li");
      itemHtml.classList.add("ingredient-tag");
      itemHtml.innerHTML = array[i];
      if (ingredientsSelected.has(array[i])) {
        itemHtml.classList.add("disabled");
      }
      items.appendChild(itemHtml);
    }
  }

  static createListAppareils(dataToDisplay, setAppareils, appareilsSelected) {
    //setAppareils.clear();
    dataToDisplay.forEach((recipe) => {
      let appareilName = recipe.appliance.toLowerCase().trim();
      setAppareils.add(appareilName);
    });
    App.createItemsAppareils(setAppareils, appareilsSelected);
  }

  //
  static createItemsAppareils(set, appareilsSelected) {
    const items = document.querySelector("#drop-appareils_open");
    items.innerHTML = "";
    //static method creates a new array, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    array.sort();
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("li");
      itemHtml.classList.add("appareil-tag");
      itemHtml.innerHTML = array[i];
      if (appareilsSelected.has(array[i])) {
        itemHtml.classList.add("disabled");
      }
      items.appendChild(itemHtml);
    }
  }

  static createListUstensiles(
    dataToDisplay,
    setUstensiles,
    ustensilesSelected
  ) {
    //setUstensiles.clear();
    dataToDisplay.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        let ustensileName = ustensil.toLowerCase().trim();
        setUstensiles.add(ustensileName);
      });
    });
    App.createItemsUstensiles(setUstensiles, ustensilesSelected);
  }

  //
  static createItemsUstensiles(set, ustensilesSelected) {
    const items = document.querySelector("#drop-ustensiles_open");
    items.innerHTML = "";
    //static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    let array = Array.from(set);
    array.sort().flat();
    for (let i = 0; i < array.length; i++) {
      let itemHtml = document.createElement("li");
      itemHtml.classList.add("ustensile-tag");
      itemHtml.innerHTML = array[i];
      if (ustensilesSelected.has(array[i])) {
        itemHtml.classList.add("disabled");
      }
      items.appendChild(itemHtml);
    }
  }

  //function for first search
  attachListnerGlobalSearch() {
    let self = this;
    const itemSearch = document.getElementById("search-all");
    itemSearch.addEventListener("input", function () {
      self.searchWord = this.value;
      self.filterRecipes();
    });
  }

  attachListnerSearchIngDropdown() {
    let self = this;
    const itemSearch = document.getElementById("search-drop_ing");
    itemSearch.addEventListener("input", function () {
      let searchText = this.value;
      let filteredSetOfIngr = Filter.searchText(
        searchText,
        self.setIngredients
      );
      App.createItemsIngredient(filteredSetOfIngr, self.ingredientsSelected);
      self.attachListenerTagsIngredients();
    });
  }

  attachListnerSearchAppDropdown() {
    let self = this;
    const itemSearch = document.getElementById("search-drop_app");
    itemSearch.addEventListener("input", function () {
      let searchText = this.value;
      let filteredSetOfApp = Filter.searchText(searchText, self.setAppareils);
      App.createItemsAppareils(filteredSetOfApp, self.appareilsSelected);
      self.attachListenerTagsAppliances();
    });
  }

  attachListnerSearchUstDropdown() {
    let self = this;
    const itemSearch = document.getElementById("search-drop_ust");
    itemSearch.addEventListener("input", function () {
      let searchText = this.value;
      let filteredSetOfUst = Filter.searchText(searchText, self.setUstensiles);
      App.createItemsUstensiles(filteredSetOfUst, self.ustensilesSelected);
      self.attachListenerTagsUstensils();
    });
  }

  filterRecipes() {
    this.filteredRecipes = Filter.search(
      this.searchWord,
      this.ingredientsSelected,
      this.appareilsSelected,
      this.ustensilesSelected,
      this.globalData.recipes
    );
    this.displayRecipes();
  }

  attachListenerTagsIngredients() {
    const items = document.getElementById("tagIngr");
    const ingredientsHTMLCollection =
      document.getElementsByClassName("ingredient-tag");
    const ingredientsParrentNode = document.getElementById(
      "drop-ingredients_open"
    );

    let self = this;
    for (let i = 0; i < ingredientsHTMLCollection.length; i++) {
      let ing = ingredientsHTMLCollection[i];
      ing.addEventListener("click", function () {
        //reset the value of input
        document.getElementById("search-drop_ing").value = "";
        let itemHtml = document.createElement("i");
        itemHtml.classList.add("tag");
        itemHtml.innerHTML =
          ing.innerText +
          `<span class="tags__close">
        <img src="./images/remove-icon.png" alt=""/></span>`;
        items.appendChild(itemHtml);
        self.setIngredients.delete(ing.innerText);
        self.ingredientsSelected.add(ing.innerText);
        self.filterRecipes();

        //listener to remove
        itemHtml.addEventListener("click", function () {
          items.removeChild(itemHtml);
          ingredientsParrentNode.appendChild(ing);
          self.setIngredients.add(ing.innerText);
          self.ingredientsSelected.delete(ing.innerText);
          self.filterRecipes();
        });
      });
    }
  }

  attachListenerTagsAppliances() {
    const items = document.getElementById("tagAppl");
    const appareilsHTMLCollection =
      document.getElementsByClassName("appareil-tag");
    const appareilsParrentNode = document.getElementById("drop-appareils_open");

    let self = this;
    for (let i = 0; i < appareilsHTMLCollection.length; i++) {
      let app = appareilsHTMLCollection[i];
      app.addEventListener("click", function () {
        document.getElementById("search-drop_app").value = "";
        let itemHtml = document.createElement("i");
        itemHtml.classList.add("tag");
        itemHtml.innerHTML =
          app.innerText +
          `<span class="tags__close">
        <img src="./images/remove-icon.png" alt=""/></span>`;

        itemHtml.addEventListener("click", function () {
          items.removeChild(itemHtml);
          appareilsParrentNode.appendChild(app);
          self.setAppareils.add(app.innerText);
          self.appareilsSelected.delete(app.innerText);
          self.filterRecipes();
        });
        items.appendChild(itemHtml);
        self.setAppareils.delete(app.innerText);
        self.appareilsSelected.add(app.innerText);
        self.filterRecipes();
      });
    }
  }

  attachListenerTagsUstensils() {
    const items = document.getElementById("tagUst");
    const ustensilsHTMLCollection =
      document.getElementsByClassName("ustensile-tag");
    const ustensilsParrentNode = document.getElementById(
      "drop-ustensiles_open"
    );

    let self = this;
    for (let i = 0; i < ustensilsHTMLCollection.length; i++) {
      let ust = ustensilsHTMLCollection[i];
      ust.addEventListener("click", function () {
        document.getElementById("search-drop_ust").value = "";
        let itemHtml = document.createElement("i");
        itemHtml.classList.add("tag");
        itemHtml.innerHTML =
          ust.innerText +
          `<span class="tags__close">
        <img src="./images/remove-icon.png" alt=""/></span>`;

        itemHtml.addEventListener("click", function () {
          items.removeChild(itemHtml);
          ustensilsParrentNode.appendChild(ust);
          self.setUstensiles.add(ust.innerText);
          self.ustensilesSelected.delete(ust.innerText);
          self.filterRecipes();
        });
        items.appendChild(itemHtml);
        self.setUstensiles.delete(ust.innerText);
        self.ustensilesSelected.add(ust.innerText);
        self.filterRecipes();
      });
    }
  }
}
App.init();