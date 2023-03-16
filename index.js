import { DisplayRecipe } from "./DisplayRecipe.js";
import { setArrayFilters } from "./DisplayListFilter.js";
import { searchInRecipes } from "./MainSearch.js";
import { filterSearch } from "./FilterSearch.js";
import { displayTag, filterArrayByTag } from "./FilterTag.js";
const filterBtn = document.querySelectorAll('.search-filter_drop');

filterBtn.forEach(item => {
    item.addEventListener('click', () => {
        const openContainer = document.querySelector('.search-filter_container-open');
        const filterContainer = item.closest('div.search-filter_container');
        openContainer && openContainer !== filterContainer && openContainer.classList.remove('search-filter_container-open');
        filterContainer.classList.toggle('search-filter_container-open');
    })
})

let allRecipes = recipes;

// Init DOM Element;
DisplayRecipe(allRecipes);
setArrayFilters(allRecipes, "ingredients", "ingredient", "filter-ingredient");
setArrayFilters(allRecipes, "appliance", "appliance", "filter-appareils");
setArrayFilters(allRecipes, "ustensils", "ustensil", "filter-ustensiles");


// Main search bar
const inputMainSearch = document.querySelector("#search");

inputMainSearch.addEventListener("input", (e) => {
    searchInRecipes(e.target.value.toLowerCase().trim(), allRecipes);
});

// Filter tags when main search is empty
const inputIngredient = document.querySelector("#input-ingredients");
const inputAppareils = document.querySelector("#input-appareils");
const inputUstensiles = document.querySelector("#input-ustensiles");

inputIngredient.addEventListener("input", (e) => {
    filterSearch(e.target.value.toLowerCase().trim(), allRecipes, "ingredients", "ingredient", "filter-ingredient");
  })

inputAppareils.addEventListener("input", (e) => {
    filterSearch(e.target.value.toLowerCase().trim(), allRecipes, "appliance", "null", "filter-appareils");
  })

inputUstensiles.addEventListener("input", (e) => {
    filterSearch(e.target.value.toLowerCase().trim(), allRecipes, "ustensils", "null", "filter-ustensiles");
  })

  const allTagBtn = document.querySelector('.search-filter');
  let filteredArray = [];
  let tagClicked = [];

  allTagBtn.addEventListener('click', (e) => {
    if (e.target.matches('.search-filter_list-btn')) {
      filteredArray = filterArrayByTag(e.target.innerText, allRecipes, filteredArray);
      let tagCategory = e.target.closest('ul').id.split("-")[1];

      tagClicked.push({category: tagCategory, name: e.target.innerText});
      console.log(tagClicked);
        displayTag(tagClicked);
      
     
      DisplayRecipe(filteredArray)
       
      setArrayFilters(
        filteredArray,
        "ingredients",
        "ingredient",
        "filter-ingredient"
      );
      setArrayFilters(
        filteredArray,
        "appliance",
        "appliance",
        "filter-appareils"
      );
      setArrayFilters(
        filteredArray,
        "ustensils",
        "ustensil",
        "filter-ustensiles"
      );
    }
  });

  




