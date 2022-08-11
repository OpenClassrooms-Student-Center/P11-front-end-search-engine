import Filter from "./Filter/Filter.js";
import { normalizeString, removeListItem, toggle } from "./utils/utils.js";
import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
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
    //this.filter = new Filter(this.recipes);
    this.displayItem("ingredients");
    this.displayItem("appliances");
    this.displayItem("ustensils");
    this.tags = [];
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
      listDOM.addEventListener("click", () => this.addBadge(type, item));

      return domBlock.appendChild(listDOM);
    });
  }

  displayItem(type) {
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

          this.recipes.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
              }
            });
          });
          console.log("TABIN", tableauIngredients);
          this.generateItems(
            tableauIngredients,
            this.dropIngredient,
            "ingredients"
          );
          //  this.badge.badgeEvent( this.tags, "ingredients")
        };

        this.inputIngredient.oninput = (e) => {
          e.preventDefault();
          e.stopPropagation();
         // this.filter.onfocusInput("ingredients");
          const searchString = e.target.value;
          this.recipes.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
                itemToDisplay = tableauIngredients.filter((item) =>
                  item.startsWith(e.target.value)
                );
                removeListItem("ingredients");
                this.generateItems(
                  itemToDisplay,
                  this.dropIngredient,
                  "ingredients"
                );
              }

              //  this.badge.badgeEvent( this.tags, "ingredients")
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
            new SearchDropDown(filteredRecipe);
          } else {
            new SearchDropDown(this.recipes);
          }
        };
        break;
      case "appliances":
        document.querySelector(".appliances").onclick = (e) => {
          toggle("appliances");

          e.preventDefault();
          e.stopPropagation();
          //  console.log("ici");
          console.log("IndisplayITEM RECIPES", this.recipes.length);
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
          //  this.badge.badgeEvent( this.tags, "appliances")
        };

        this.inputAppliance.oninput = (e) => {
         // this.filter.onfocusInput("appliances");
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
            //  this.badge.badgeEvent( this.tags, "appliances")
          });

          //   console.log(itemToDisplay);
          if (!searchString.length == 0) {
            const filteredRecipe = this.recipes.filter((result) => {
              if (result.appliance.toLowerCase().includes(searchString)) {
                return result;
              }
            });

           new SearchDropDown(filteredRecipe);
           
          } else {
           new SearchDropDown(this.recipes);
        
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
          this.generateItems(tableauUstensils, this.dropUstensils, "ustensils");
          //  this.badge.badgeEvent( this.tags, "ustensils")
        };

        this.inputUstensils.oninput = (e) => {
         // this.filter.onfocusInput("ustensils");
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
            //  this.badge.badgeEvent( this.tags, "ustensils")
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
            new SearchDropDown(filteredRecipe);
      
          } else {
            new SearchDropDown(this.recipes);
           
          }
        };
        break;
      default:
        break;
    }
  }
  addBadge(filter, badgeText) {
    // toggle(filter)
    let filtred = [];
    //console.log(document.querySelector("#thumbnail-tags-container"))
    console.log("filter , badgeText :", filter + " ", badgeText);

    if (!this.tags.includes(badgeText)) {
      this.tags.push(badgeText);
      const tagBadge = `
       <div id="tagItem" class="thumbnailTag thumbnail ${filter}" data-value ="${badgeText}">
           <button id="btn-${filter}" >${badgeText}</button>
           <i class="far fa-times-circle" data-type="${filter}"></i>
       </div>`;

      let currentTag = document.querySelector("#thumbnail-tags-container");

      currentTag.innerHTML += tagBadge;

      filtred = [...this.filterList(filter)];
      this.buildNewListRecipes(filtred);

      const close = document.getElementsByClassName(`fa-times-circle`);
      for (let closeItem of close) {
        closeItem.addEventListener("click", (e) => {
          const textContent =
            e.currentTarget.parentNode.getAttribute("data-value");
          const tagType = e.currentTarget.getAttribute("data-type");
          console.log("tagType: " + tagType + " " + textContent);

          this.tags = this.tags.filter((tag) => tag != textContent);

          // appel des CARD avec des fonctions filtrer par rapport au this.tags selectionné / Je boucle sur toute les recipes et je regarde si recipies.ingredient inclus dans tableau des tags view card avec filerRecipes

          filtred = [...this.filterList(tagType)];
          console.log("spread : ", filtred);

          this.buildNewListRecipes(filtred);

          e.currentTarget.parentNode.remove();
        });
      }
    }
  }

  // INITIALIZE LIST CARD_RECIPES
  buildNewListRecipes(filtred) {
    console.log("list filtrée est : ", filtred);
    if (this.tags == 0) {
      filtred = this.recipes;
    }
    const viewCard = new CardRecipesFactory(filtred);
    viewCard.Recipes();
    new SearchDropDown(filtred);
  }

  filterList(tagType) {
    let filtredRecipes = [];
    this.tags.forEach((tag) => {
      this.recipes.filter((recette) => {
        // je fais un lowercase sur tag.value pour bien comparer ensuite
        tag = tag.toLowerCase();

        // INGREDIENTS

        if (tagType == "ingredients") {
          let ingredientfounded = false;

          for (let i = 0; i < recette.ingredients.length; i++) {
            if (recette.ingredients[i].ingredient.toLowerCase() == tag) {
              ingredientfounded = true;
              break;
            }
          }
          if (ingredientfounded == true) {
            filtredRecipes.push(recette);
            return recette;
          }
        }
        // APPAREILS

        if (tagType == "appliances") {
          let appreilfounded = false;

          for (let i = 0; i < recette.appliance.length; i++) {
            if (recette.appliance.toLowerCase() == tag) {
              appreilfounded = true;
              break;
            }
          }
          if (appreilfounded == true) {
            filtredRecipes.push(recette);
            return recette;
          }
        }
        // USTENSILES
        if (tagType == "ustensils") {
          let ustensilsfounded = false;

          for (let i = 0; i < recette.ustensils.length; i++) {
            if (recette.ustensils[i].toLowerCase() == tag) {
              ustensilsfounded = true;
              break;
            }
          }
          if (ustensilsfounded == true) {
            filtredRecipes.push(recette);
            return recette;
          }
        }
      });
    });

    return filtredRecipes;
  }
}
