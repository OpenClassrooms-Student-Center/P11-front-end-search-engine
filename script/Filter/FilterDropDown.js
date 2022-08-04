import {removeListItem, normalizeString} from "../utils/utils.js"; 
import SearchDropDown from "../SearchDropDown.js";
export default class FilterDropDown {
  constructor(recipes) {
    //console.log('je suis ici  sorted', recipes.length)
    this.recipes = recipes;
    this.tagIngredient = document.getElementById("thumbnail-tags-container");
    this.inputIngredient = document.getElementById("search-ingredients");
    this.inputAppliance = document.getElementById("search-appliances");
    this.inputUstensils = document.getElementById("search-ustensils");
    this.dropIngredient = document.querySelector(".dropdown-list-ingredients");
    this.dropAppliance = document.querySelector(".dropdown-list-appliances");
    this.dropUstensils = document.querySelector(".dropdown-list-ustensils");
   this.tags = [];
  }
  generateListItems(tab, domBlock, type) {
    tab.forEach((item) => {
      const itemNormalized = normalizeString(item);
      const listDOM = document.createElement("li");
      listDOM.classList.add("list-items", `${type}-item`);
      listDOM.setAttribute("id", "tag");
      listDOM.setAttribute("data-item", `${itemNormalized}`);
      listDOM.setAttribute("data-type", `${itemNormalized}`);
      listDOM.innerText = item[0].toUpperCase() + item.slice(1);
      //console.log(listDOM)
      listDOM.addEventListener("click", () => this.listFactory.buildBadges(this.tags, type, item));

      const SearchDropDown = new SearchDropDown(this.recipes)
      SearchDropDown.badgeEvent(type);
      return domBlock.append(listDOM);
    });
  }

  searchItem(types) {
    let tableauIngredients = [];
    let tableauUstensils = [];
    let tableauAppliances = [];
    let itemToDisplay = [];
    switch (types) {
      case "ingredients":
      this.inputIngredient.oninput = (e) => {
          this.filter.onfocusInput("ingredients")
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
                return this.generateListItems(
                  itemToDisplay,
                  this.dropIngredient,
                  "ingredients"
                );
              }
              itemToDisplay = tableauIngredients.filter((item) =>
                item.startsWith(e.target.value)
              );
             removeListItem("ingredients");
             this.generateListItems(
                itemToDisplay,
                this.dropIngredient,
                "ingredients"
              );
            });
          });
       
          if (!searchString.length == 0) {
            const filteredRecipe = this.recipes.filter((result) => {
              console.log("RR", searchString.length);
              if (
                result.ingredients.find((items) => {
                  return items.ingredient.toLowerCase().includes(searchString);
                }) != undefined
              ) {
                return result;
              }
            });
            const appliFiltre = new SearchDropDown(filteredRecipe);
            appliFiltre.displayItem("appliances");
            const ustFiltre = new SearchDropDown(filteredRecipe);
            ustFiltre.displayItem("ustensils");
          } else {
           
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("appliances");
            const ustFiltre = new SearchDropDown(this.recipes);
            ustFiltre.displayItem("ustensils");
          }
        };
        break;
      case "appliances":
        this.inputAppliance.oninput = (e) => {
          this.filter.onfocusInput("appliances")
          e.preventDefault()
          e.stopPropagation()
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const recipeAppliance = recipe.appliance
            if (!tableauAppliances.includes(recipeAppliance)) {
              tableauAppliances.push(recipeAppliance);
              return this.generateListItems(
                itemToDisplay,
                this.dropAppliance,
                "appliances"
              );
            } 
              itemToDisplay = tableauAppliances.filter((item) =>
                item.startsWith(e.target.value)
              );
             removeListItem("appliances");
             this.generateListItems(
              itemToDisplay,
              this.dropAppliance,
              "appliances"
            );
            });
        
          console.log(itemToDisplay);
          if (!searchString.length == 0) {
            const filteredRecipe = this.recipes.filter((result) => {
              if (result.appliance.toLowerCase().includes(searchString)) {
                return result;
              }
            });
          
            const ingreFiltre = new SearchDropDown(filteredRecipe);
            ingreFiltre.displayItem("ingredients");
            const appliFiltre = new SearchDropDown(filteredRecipe);
            appliFiltre.displayItem("ustensils");
           
          } else {
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("ustensils");
            const ingreFiltre = new SearchDropDown(this.recipes);
            ingreFiltre.displayItem("ingredients");
          }
        };
        break;
      case "ustensils":
        this.inputUstensils.oninput = (e) => {
          this.filter.onfocusInput("ustensils")
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const  itemUstensils = recipe.ustensils;
            itemUstensils.forEach((ustensil) => {
              const ustensilItem = ustensil.toLowerCase();
              if (!tableauUstensils.includes(ustensilItem)) {
                tableauUstensils.push(ustensilItem);
                return this.generateListItems(
                  itemToDisplay,
                  this.dropUstensils,
                  "ustensils"
                );
              }
              itemToDisplay = tableauUstensils.filter((item) =>
                item.startsWith(e.target.value)
              );
             removeListItem("ustensils");
             this.generateListItems(
                itemToDisplay,
                this.dropUstensils,
                "ustensils"
              );
            });
          });
          console.log(tableauUstensils);
          console.log(itemToDisplay);
          if (!searchString.length == 0) {
            const filteredRecipe = this.recipes.filter((result) => {
              console.log("RR", searchString.length);
              if (
                result.ustensils.find((items) => {
                  return items.toLowerCase().includes(searchString);
                }) != undefined
              ) {
                return result;
              }
            });
            const ingreFiltre = new SearchDropDown(filteredRecipe);
            ingreFiltre.displayItem("ingredients");
            const appliFiltre = new SearchDropDown(filteredRecipe);
            appliFiltre.displayItem("appliances");
           
          } else {
            
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("appliances");
            const ingreFiltre = new SearchDropDown(this.recipes);
            ingreFiltre.displayItem("ingredients");
          }
        };
        break;
      default:
        break;
    }
  }
}
