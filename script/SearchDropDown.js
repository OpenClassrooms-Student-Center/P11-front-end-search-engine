import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
import { normalizeString, closeAllFilter, removeListItem, toggle} from "./utils/utils.js";

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
    closeAllFilter();
    this.tags = [];
  }

  buildBadges(tags, filter, item) {
    //console.log(document.querySelector("#thumbnail-tags-container"))
    let recipiesFiltered = []
    if (!this.tags.includes(item)) {
      const close = document.getElementsByClassName(`fa-times-circle`);
      for (let closeItem of close) {
        
        closeItem.addEventListener("click", (e) => {
          const isInclude = e.currentTarget.parentNode.getAttribute("data-value");
          const tagType = e.currentTarget.getAttribute("data-type");
          //const viewCard = new CardRecipesFactory(this.recipes);
          // viewCard.Recipes();

          this.tags = this.tags.filter((tag) => tag != isInclude);
       //   console.log("tag close", this.tags);

          // appel des CARD avec des fonctions filtrer par rapport au this.tags selectionné / Je boucle sur toute les recipes et je regarde si recipies.ingredient inclus dans tableau des tags view card avec filerRecipes

          if (this.tags.length !== 0) {
            this.tags.forEach((tag) => {
              recipiesFiltered = this.recipes.filter((recette) => {
                // je fais un lowercase sur tag.value pour bien comparer ensuite
                tag = tag.toLowerCase();

                // INGREDIENTS

                if (tagType == "ingredients") {
                  let ingredientfounded = false;

                  for (let i = 0; i < recette.ingredients.length; i++) {
                    if (
                      recette.ingredients[i].ingredient.toLowerCase() == tag
                    ) {
                      ingredientfounded = true;
                      break;
                    }
                  }
                  if (ingredientfounded == true) {
                    console.log("ici trouvé");
                    return recette;
                  }
                }
                // APPAREILS

                if (tagType == "appliances") {
                  let appreilfounded = false;

                  console.log(recette);
                  for (let i = 0; i < recette.appliance.length; i++) {
                    console.log("dans la boucle appareil");
                    if (recette.appliance.toLowerCase() == tag) {
                      console.log("dans la boucle appareil");
                      appreilfounded = true;
                      break;
                    }
                  }
                  if (appreilfounded == true) {
                    console.log("ici trouvé");
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
                    console.log("ici trouvé");
                    return recette;
                  }
                }
              });
               console.log("recette filtrer", recipiesFiltered);
              const viewCard = new CardRecipesFactory(recipiesFiltered);
              viewCard.Recipes();
             /*const dropdowningre = new SearchDropDown(recipiesFiltered);
              dropdowningre.displayItem("ingredients");
              const dropdownappl = new SearchDropDown(recipiesFiltered);
              dropdownappl.displayItem("appliances");
              const dropdownusten = new SearchDropDown(recipiesFiltered);
              dropdownusten.displayItem("ustensils");*/
            });

          } else {
          const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
          }
         /* console.log("recette filtrer", this.recipes);
          
          const ingreFiltre = new SearchDropDown(this.recipes);
          ingreFiltre.displayItem("ingredient");
          const appliFiltre = new SearchDropDown(this.recipes);
          appliFiltre.displayItem("appliances");
          const ustFiltre = new SearchDropDown(this.recipes);
          ustFiltre.displayItem("ustensils");*/
          e.currentTarget.parentNode.remove();
         
        });       
      }
    }
  }

  generateItems(typelist, domBlock, type) {
   
   // console.log("generateITEM", domBlock)
   // console.log("generateITEM",  type)
    typelist.forEach((item) => {
      const itemNormalized = normalizeString(item);
      const listDOM = document.createElement("li");
      listDOM.classList.add("list-items", `${type}-item`);
      listDOM.setAttribute("id", "tag");
      listDOM.setAttribute("data-item", `${itemNormalized}`);
      listDOM.setAttribute("data-type", `${itemNormalized}`);
      listDOM.innerText = item[0].toUpperCase() + item.slice(1);
      //console.log(listDOM)
      listDOM.addEventListener("click", () =>
        this.buildBadges(this.tags, type, item)
      );
  
      return domBlock.appendChild(listDOM);
    });
  }
  /*buildList(type, item) {
    const list = document.createElement("li");
    list.classList.add("list-items", `${type}-item`);
    list.setAttribute("id", "tag");
    list.setAttribute("data-item", type);
    list.setAttribute("data-type", `${type}`);
    list.innerText = item[0].toUpperCase() + item.slice(1);
    list.addEventListener("click", () =>
      this.buildBadges(this.tags, type, item)
    );
    this.badgeEvent(type);
    return document.querySelector(`.dropdown-list-${type}`).append(list);
  }*/

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
          this.badgeEvent("ingredients");
          console.log("CL", currentList)
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

  badgeEvent(type) {
    document
      .querySelectorAll(`.dropdown-list-${type} .${type}-item`)
      .forEach((selectBadge) => {
        selectBadge.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          let currentItem = "";
          const filterIngreByTag = new Filter(this.recipes);

          this.tags.push(item);
          const tagBadge = `
          <div id="tagItem" class="thumbnailTag thumbnail ${filter}" data-value ="${item}">
              <button id="btn-${filter}" >${item}</button>
              <i class="far fa-times-circle" data-type="${filter}"></i>
          </div>`;
    
          let currentTag = document.querySelector("#thumbnail-tags-container");
    
          currentTag.innerHTML += tagBadge;
       
         
          switch (type) {
            case "ingredients":
              currentItem = e.currentTarget.textContent.toLowerCase();
              filterIngreByTag.filterType(
                this.tags,
                currentItem,
                "ingredients"
              );
              break;
            case "appliances":
              console.log("je suis ici");
              currentItem = e.currentTarget.textContent.toLowerCase();
              filterIngreByTag.filterType(this.tags, currentItem, "appliances");
              break;
            case "ustensils":
              currentItem = e.currentTarget.textContent.toLowerCase();
              filterIngreByTag.filterType(this.tags, currentItem, "ustensils");
              break;
            default:
              break;
          }
        });
      });
  }
}