import Filter from "./Filter/Filter.js";
import { normalizeString, closeAllFilter, removeListItem, toggle} from "./utils/utils.js";
import FilterBadge from "./Filter/FilterBagde.js";
export default class SearchDropDown {
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
    this.filter = new Filter(this.recipes);

    this.badge = new FilterBadge(this.recipes)
    closeAllFilter();
    this.tags = [];

  }

  addBagde(tags, filter, item) {
    //console.log(document.querySelector("#thumbnail-tags-container"))

    if (!this.tags.includes(item)) {
      this.tags.push(item);
      const tagBadge = `
      <div id="tagItem" class="thumbnailTag thumbnail ${filter}" data-value ="${item}">
          <button id="btn-${filter}" >${item}</button>
          <i class="far fa-times-circle" data-type="${filter}"></i>
      </div>`;

      let currentTag = document.querySelector("#thumbnail-tags-container");

      currentTag.innerHTML += tagBadge;
  
    }
  }

  generateItems(tab, domBlock, type) {
    tab.forEach((item) => {
      const itemNormalized = normalizeString(item);
      const listDOM = document.createElement("li");
      listDOM.classList.add("list-items", `${type}-item`);
      listDOM.setAttribute("id", "tag");
      listDOM.setAttribute("data-item", `${itemNormalized}`);
      listDOM.setAttribute("data-type", `${itemNormalized}`);
      listDOM.innerText = item[0].toUpperCase() + item.slice(1);
      //console.log(listDOM)
      listDOM.addEventListener("click", () =>
        this.addBagde(this.tags, type, item), 
        this.badge.removeBadge(this.tags, type)
      );
      
      return domBlock.appendChild(listDOM);
    });
  }


  displayItem(type, currentList) {
    let tableauIngredients = [];
    let tableauUstensils = [];
    let tableauAppliances = [];
    let itemToDisplay = [];
    switch (type) {
      case "ingredients":
        document.querySelector(".ingredients").onclick = (e) => {
          
          e.stopPropagation();

          //toggle("ingredients");
          toggle("ingredients");
         
          currentList.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
              }
            });
          });
          console.log("TABIN", tableauIngredients)
          this.generateItems(
            tableauIngredients,
            this.dropIngredient,
            "ingredients"
          );
          this.badge.badgeEvent( this.tags, "ingredients")
        };
       
        this.inputIngredient.oninput = (e) => {
           e.preventDefault()
          e.stopPropagation()
          this.filter.onfocusInput("ingredients");
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
                return this.generateItems(
                  itemToDisplay,
                  this.dropIngredient,
                  "ingredients"
                );
              }
              itemToDisplay = tableauIngredients.filter((item) =>
                item.startsWith(e.target.value)
              );
              removeListItem("ingredients");
              this.generateItems(
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
            appliFiltre.displayItem("appliances", filteredRecipe);
            const ustFiltre = new SearchDropDown(filteredRecipe);
            ustFiltre.displayItem("ustensils", filteredRecipe);
          } else {
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("appliances", this.recipes);
            const ustFiltre = new SearchDropDown(this.recipes);
            ustFiltre.displayItem("ustensils", this.recipes);
          }
        };
        break;
      case "appliances":
        document.querySelector(".appliances").onclick = (e) => {
          toggle("appliances");

          e.preventDefault();
          e.stopPropagation();
        //  console.log("ici");
        console.log("IndisplayITEM RECIPES", this.recipes.length)
          this.recipes.forEach((recipe) => {
            const appliance = recipe.appliance.toLowerCase();
            if (!tableauAppliances.includes(appliance)) {
              tableauAppliances.push(appliance);
          
            }
          });
          this.generateItems(
            tableauAppliances,
            this.dropAppliance,
            "appliances"
          );
          this.badge.badgeEvent( this.tags, "appliances")
        };



        this.inputAppliance.oninput = (e) => {
          this.filter.onfocusInput("appliances");
          e.preventDefault();
          e.stopPropagation();
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const recipeAppliance = recipe.appliance;
            if (!tableauAppliances.includes(recipeAppliance)) {
              tableauAppliances.push(recipeAppliance);
              return this.generateItems(
                itemToDisplay,
                this.dropAppliance,
                "appliances"
              );
            }
            itemToDisplay = tableauAppliances.filter((item) =>
              item.startsWith(e.target.value)
            );
            removeListItem("appliances");
            this.generateItems(itemToDisplay, this.dropAppliance, "appliances");
          });

       //   console.log(itemToDisplay);
          if (!searchString.length == 0) {
            const filteredRecipe = this.recipes.filter((result) => {
              if (result.appliance.toLowerCase().includes(searchString)) {
                return result;
              }
            });

            const ingreFiltre = new SearchDropDown(filteredRecipe);
            ingreFiltre.displayItem("ingredients", filteredRecipe);
            const appliFiltre = new SearchDropDown(filteredRecipe);
            appliFiltre.displayItem("ustensils", filteredRecipe);
          } else {
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("ustensils", this.recipes);
            const ingreFiltre = new SearchDropDown(this.recipes);
            ingreFiltre.displayItem("ingredients", this.recipes);
          }
        };
        break;
      case "ustensils":
        document.querySelector(".ustensils").onclick = (e) => {
          toggle("ustensils");

          e.preventDefault();
          e.stopPropagation();
     //     console.log("ici");

          this.recipes.forEach((recipe) => {
            const itemUstensils = recipe.ustensils;
            itemUstensils.forEach((ustensil) => {
              const ustensilItem = ustensil.toLowerCase();
              if (!tableauUstensils.includes(ustensilItem)) {
                tableauUstensils.push(ustensilItem);
              }
            });
          });
          this.generateItems(
            tableauUstensils,
            this.dropUstensils,
            "ustensils"
          );
          this.badge.badgeEvent( this.tags, "ustensils")
        };

        this.inputUstensils.oninput = (e) => {
          this.filter.onfocusInput("ustensils");
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const itemUstensils = recipe.ustensils;
            itemUstensils.forEach((ustensil) => {
              const ustensilItem = ustensil.toLowerCase();
              if (!tableauUstensils.includes(ustensilItem)) {
                tableauUstensils.push(ustensilItem);
                return this.generateItems(
                  itemToDisplay,
                  this.dropUstensils,
                  "ustensils"
                );
              }
              itemToDisplay = tableauUstensils.filter((item) =>
                item.startsWith(e.target.value)
              );
              removeListItem("ustensils");
              this.generateItems(
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
            ingreFiltre.displayItem("ingredients", filteredRecipe);
            const appliFiltre = new SearchDropDown(filteredRecipe);
            appliFiltre.displayItem("appliances", filteredRecipe);
          } else {
            const appliFiltre = new SearchDropDown(this.recipes);
            appliFiltre.displayItem("appliances", this.recipes);
            const ingreFiltre = new SearchDropDown(this.recipes);
            ingreFiltre.displayItem("ingredients", this.recipes);
          }
        };
        break;
      default:
        break;
    }
  }

  
}