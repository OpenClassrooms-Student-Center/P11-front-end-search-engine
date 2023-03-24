import { displayTag } from "./factories/DisplayListFilter.js";
import { displayAllElements, displayMessage} from "./factories/DisplayRecipe.js";
import { filterSearch } from "./search/handleFilter.js";
import { searchInRecipes } from "./search/handleMainSearch.js";
import { filterArrayByTag } from "./search/handleTag.js";


// Declare variables
const filterBtn = document.querySelectorAll(".search-filter_drop");

// Array to stock tag clicked
let tagClicked = [];

// Init array to filtered recipes
let allRecipesFiltered = recipes;

// Handle drop list
filterBtn.forEach((item) => {
  item.addEventListener("click", () => {
    // Element in DOM
    const openContainer = document.querySelector(
      ".search-filter_container-open"
    );
    const filterContainer = item.closest("div.search-filter_container");

    // If one of item is open, close it
    openContainer &&
      openContainer !== filterContainer &&
      openContainer.classList.remove("search-filter_container-open");

    // Toggle drop down
    filterContainer.classList.toggle("search-filter_container-open");

    // Handle input, if list is closed, input is disabled
    const inputToAble = filterContainer.querySelector(
      ".search-filter_form-input"
    );
    inputToAble.toggleAttribute("disabled");

    // Handle when an other container is open
    if (openContainer) {
      const inputToDisable = openContainer.querySelector(
        ".search-filter_form-input"
      );
      console.log(inputToDisable);
      openContainer &&
        openContainer !== filterContainer &&
        inputToDisable.setAttribute("disabled", "");
    }
  });
});



displayAllElements(recipes);

// Reset search bar & tag when user focus on it
const mainSearchBar = document.querySelector("#search");
mainSearchBar.addEventListener("focus", (e) => {
  if (tagClicked.length > 0) {
    tagClicked = [];
    displayTag(tagClicked);
  }
});

// Input Search
window.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase().trim();

  // if input is main search bar
  if (e.target.matches("#search")) {
    // filtered recipes array
    allRecipesFiltered = searchInRecipes(searchValue, recipes);
    // display new array filtered of recipes
    displayAllElements(allRecipesFiltered);
    // display message with the number of recipes find
    displayMessage(allRecipesFiltered, searchValue);
  }

  // filter input part, use function filterSearch to only search in list element
  else if (e.target.matches("#input-ingredients")) {
    filterSearch(
      searchValue,
      allRecipesFiltered,
      "ingredients",
      "ingredient",
      "filter-ingredient"
    );
  } else if (e.target.matches("#input-appareils")) {
    filterSearch(
      searchValue,
      allRecipesFiltered,
      "appliance",
      "null",
      "filter-appareils"
    );
  } else if (e.target.matches("#input-ustensiles")) {
    filterSearch(
      searchValue,
      allRecipesFiltered,
      "ustensils",
      "null",
      "filter-ustensiles"
    );
  }

  // when user select a tag after search on main input
  filterByTag(allRecipesFiltered);
});

// handle tag clicked
function filterByTag(arrayOfRecipes) {
  window.addEventListener("click", (e) => {
    // init array to filter
    let recipesByTag = arrayOfRecipes;

    // stock content of the tag
    const searchValue = e.target.innerText;

    // when user click in the filter list
    if (e.target.matches(".search-filter_list-btn")) {
      // push in array of tags, category is used to display the right color tag
      !tagClicked.includes(searchValue) &&
        tagClicked.push({
          category: e.target.id.split("-")[1],
          name: searchValue,
        });

      // close list and input when user select a tag
      filterBtn.forEach((item) => {
        const filterContainer = item.closest("div.search-filter_container");
        const input = filterContainer.querySelector(
          ".search-filter_form-input"
        );
        filterContainer.classList.remove("search-filter_container-open");
        input.setAttribute("disabled", "");
        input.value = "";
      });
    }

    // when user remove a tag, filter tagClicked thanks to the value
    else if (e.target.matches(".search-tag_btn")) {
      tagClicked = tagClicked.filter((tag) => tag.name !== e.target.innerText);
    }

    // New array filtered with tags selected
    recipesByTag = filterArrayByTag(tagClicked, recipes, recipesByTag);

    // display tag under search bar
    displayTag(tagClicked);

    // Update recipes card and list filter
    displayAllElements(recipesByTag);

    // display message with number of recipes find
    displayMessage(recipesByTag, searchValue);
  });
}

filterByTag(recipes);
