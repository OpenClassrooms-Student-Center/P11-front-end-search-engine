import CardRecipesFactory from "../Factory/CardRecipesFactory.js";
import SearchDropDown from "../SearchDropDown.js";
import { removeListItem, toggle } from "../utils/utils.js";
export default class FilterBadge {
  constructor(recipes) {
    this.recipes = recipes;
    this.dropIngredient = document.querySelector(".dropdown-list-ingredients");
    this.dropAppliance = document.querySelector(".dropdown-list-appliances");
    this.dropUstensils = document.querySelector(".dropdown-list-ustensils");
  }
  

 addBagde(tags, filter, item) {
    //console.log(document.querySelector("#thumbnail-tags-container"))

    if (!tags.includes(item)) {
      tags.push(item);
      const tagBadge = `
      <div id="tagItem" class="thumbnailTag thumbnail ${filter}" data-value ="${item}">
          <button id="btn-${filter}" >${item}</button>
          <i class="far fa-times-circle" data-type="${filter}"></i>
      </div>`;

      let currentTag = document.querySelector("#thumbnail-tags-container");

      currentTag.innerHTML += tagBadge;
  
    }
  }
  badgeEvent(tags, type) {
    let tableauIngredients = [];
    let tableauAppliances = [];
    let tableauUstensils = [];
    document
      .querySelectorAll(`.dropdown-list-${type} .${type}-item`)
      .forEach((selectBadge) => {
        selectBadge.addEventListener("click", (e) => {
          const isInclude = e.currentTarget.getAttribute("data-value");
          tags = tags.filter((tag) => tag != isInclude);
          e.preventDefault();
          e.stopPropagation();
          if (tags.length !== 0) {
          switch (type) {
            case "ingredients":

                toggle("ingredients");
           
                tags.forEach((tag) => {
                  const recipiesFiltered = this.recipes.filter((recette) => {
                    // je fais un lowercase sur tag.value pour bien comparer ensuite
                    tag = tag.toLowerCase();
                    // INGREDIENTS
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
                      return recette;
                    }
                  });
                 
                  removeListItem("ingredients");
                  recipiesFiltered.forEach((recipe) => {
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
                  console.log("je suis dedans");
                  const viewCard = new CardRecipesFactory(recipiesFiltered);
                  viewCard.Recipes();
                  const search = new SearchDropDown(this.recipes);
                  search.generateItems(
                    tableauIngredients,
                    this.dropIngredient,
                    "ingredients"
                  );
                  const dropdownappl = new SearchDropDown(recipiesFiltered);
                  dropdownappl.displayItem("appliances", recipiesFiltered);
                  const dropdownusten = new SearchDropDown(recipiesFiltered);
                  dropdownusten.displayItem("ustensils", recipiesFiltered);
                });
              
              break;
            case "appliances":

                toggle("appliances");
              console.log("ici dans appareils");
    
                tags.forEach((tag) => {
                  const recipiesFiltered = this.recipes.filter((recette) => {
                    // je fais un lowercase sur tag.value pour bien comparer ensuite
                    tag = tag.toLowerCase();
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
                      return recette;
                    }
                  });
                  const viewCard = new CardRecipesFactory(recipiesFiltered);
                  viewCard.Recipes();

                  console.log(recipiesFiltered);
                  removeListItem("appliances");
                  recipiesFiltered.forEach((recipe) => {
                    const appliance = recipe.appliance.toLowerCase();
                    if (!tableauAppliances.includes(appliance)) {
                      tableauAppliances.push(appliance);
                     
                    }
                  });

                  const search = new SearchDropDown(this.recipes);
                  search.generateItems(
                    tableauAppliances,
                    this.dropAppliance,
                    "appliances"
                  );
                  console.log(tableauUstensils)
                  const dropdowningre = new SearchDropDown(recipiesFiltered);
                  dropdowningre.displayItem("ingredients", recipiesFiltered);
                  const dropdownusten = new SearchDropDown(recipiesFiltered);
                  dropdownusten.displayItem("ustensils", recipiesFiltered);
                });
              
              break;
            case "ustensils":
                toggle("ustensils");
         
                tags.forEach((tag) => {
                  const recipiesFiltered = this.recipes.filter((recette) => {
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
                  });
                  const viewCard = new CardRecipesFactory(recipiesFiltered);
                  viewCard.Recipes();
                  removeListItem("ustensils");
                  recipiesFiltered.forEach((recipe) => {
                    const itemUstensils = recipe.ustensils;
                    itemUstensils.forEach((ustensil) => {
                      const ustensilItem = ustensil.toLowerCase();
                      if (!tableauUstensils.includes(ustensilItem)) {
                        tableauUstensils.push(ustensilItem);
                      }
                    });
                  });
                  console.log(tableauUstensils)
                  const search = new SearchDropDown(this.recipes);
                  search.generateItems(
                    tableauUstensils,
                    this.dropUstensils,
                    "ustensils"
                  );
                  const dropdowningre = new SearchDropDown(recipiesFiltered);
                  dropdowningre.displayItem("ingredients", recipiesFiltered);
                  const dropdownappl = new SearchDropDown(recipiesFiltered);
                  dropdownappl.displayItem("appliances", recipiesFiltered);
                });
            
              break;
            default:
               
              break;
          }
        }else{
            const viewCard = new CardRecipesFactory(this.recipes);
            viewCard.Recipes();
            const dropdowningre = new SearchDropDown(this.recipes);
            dropdowningre.displayItem("ingredients", this.recipes);
            const dropdownappl = new SearchDropDown(this.recipes);
            dropdownappl.displayItem("appliances", this.recipes);
            const dropdownusten = new SearchDropDown(this.recipes);
            dropdownusten.displayItem("ustensils", this.recipes);
        }
        });
      });
  }

  removeBadge(tags, tagType) {
    const close = document.getElementsByClassName(`fa-times-circle`);
    for (let closeItem of close) {
      closeItem.addEventListener("click", (e) => {
        const isInclude = e.currentTarget.parentNode.getAttribute("data-value");
        tagType = e.currentTarget.getAttribute("data-type");

        tags = tags.filter((tag) => tag != isInclude);
        console.log("tag close", tags);

        // appel des CARD avec des fonctions filtrer par rapport au tags selectionné / Je boucle sur toute les recipes et je regarde si recipies.ingredient inclus dans tableau des tags view card avec filerRecipes

         /*if (tags.length !== 0) {
         
          tags.forEach((tag) => {
            const recipiesFiltered = this.recipes.filter((recette) => {
              // je fais un lowercase sur tag.value pour bien comparer ensuite
              tag = tag.toLowerCase();

              // INGREDIENTS

            if (tagType == "ingredients") {
                console.log("dedans")
                let ingredientfounded = false;

                for (let i = 0; i < recette.ingredients.length; i++) {
                  if (recette.ingredients[i].ingredient.toLowerCase() == tag) {
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
            const viewCard = new CardRecipesFactory(recipiesFiltered);
            viewCard.Recipes();
          });
          console.log("recette filtrer", recipiesFiltered);
        } else {
          const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
        }*/

        e.currentTarget.parentNode.remove();
      });
    }
  }
}
