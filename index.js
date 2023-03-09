import { DisplayRecipe } from "./DisplayRecipe.js";
import { setArrayFilters } from "./DisplayListFilter.js";
import { searchInRecipes } from "./MainSearch.js";
import { filterSearch } from "./FilterSearch.js";

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
    searchInRecipes(e.target.value.toLowerCase().trim());
});


const inputIngredient = document.querySelector("#input-ingredients");
console.log(inputIngredient);
inputIngredient.addEventListener("input", (e) => {
    filterSearch(e.target.value.toLowerCase().trim(), allRecipes);
})
  




