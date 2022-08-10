import {updatePage } from "../utils/utils.js";

export default class Filter {
  constructor(recipes) {
    this.recipes = recipes;
    this.input = document.getElementById("find");
    this.arrIngredient = [];
    this.tags = [];
    this.onfocusInput;
    this.inputIngredient = document.getElementById("search-ingredients");
    this.inputAppliance = document.getElementById("search-appliances");
    this.inputUstensils = document.getElementById("search-ustensils");
    
  }
  onfocusInput(type) {
    this.input.onfocus = () => {
      if (type == "ingredients") {
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.add("d-none");
        document.querySelector(`.${type}`).classList.remove("expanded");
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.remove("d-none");
      } else if (type == "appliances") {
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.add("d-none");
        document.querySelector(`.${type}`).classList.remove("expanded");
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.remove("d-none");
      } else if (type == "ingredients") {
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.add("d-none");
        document.querySelector(`.${type}`).classList.remove("expanded");
        document
          .querySelector(`.dropdown-list-${type}`)
          .classList.remove("d-none");
      }
    };
  }

  filterRecipes() {
    this.onfocusInput();
    this.input.oninput = (e) => {
      const searchString = e.target.value;
      console.log(searchString);

      if (searchString.length > 2) {
        const filteredRecipe = this.recipes.filter((result) => {
          console.log("RR", searchString.length);

          if (
            result.name.toLowerCase().includes(searchString) ||
            result.description.toLowerCase().includes(searchString) ||
            result.ingredients.find((items) => {
              return items.ingredient.toLowerCase().includes(searchString);
            }) != undefined
          ) {
            return result;
          }
        });
        updatePage(filteredRecipe)
     
      } else {
       updatePage(this.recipes)
      }
    };
  }

  filterType(tags, currentItem, type) {
   // console.log("TAGS", tags)
    let currentRecipes = [];
    switch (type) {
      case "ingredients":
        if (!tags.length == 0) {
          //console.log("FT", tags)
          currentRecipes = this.recipes.filter((result) => {
       
            if (
              result.ingredients.find((items) => {
                return items.ingredient.toLowerCase().includes(currentItem);
              }) != undefined
            ) {
             
              return result;
            }
          });
          console.log("FT", currentRecipes.length)
          updatePage(currentRecipes)
        } else {
          updatePage(this.recipes)
        }

        break;
      case "appliances":
        if (!tags.length == 0) {
          currentRecipes = this.recipes.filter((result) => {
            if (result.appliance.toLowerCase().includes(currentItem)) {
              return result;
            }
          });
          updatePage(currentRecipes)
        } else {
          updatePage(this.recipes)
        }

        break;
      case "ustensils":
        if (!tags.length == 0) {
          currentRecipes = this.recipes.filter((result) => {
            if (
              result.ustensils.find((ustensils) =>
                ustensils.toLowerCase().includes(currentItem)
              )
            ) {
              return result;
            }
          });
          updatePage(currentRecipes)
        } else {
          updatePage(this.recipes)
        }

        break;
      default:
        break;
    }
  }


  
}
