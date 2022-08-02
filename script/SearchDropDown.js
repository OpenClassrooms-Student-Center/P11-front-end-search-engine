import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
import Filter from "./Filter/Filter.js";
export default class DropDown {
  constructor(recipes) {
    //console.log('je suis ici  sorted', recipes.length)
    this.recipes = recipes;
    this.tagIngredient = document.getElementById("thumbnail-tags-container");
    this.inputIngredient = document.getElementById("search-ingredients");
    this.inputAppliance = document.getElementById("search-appliances");
    this.dropIngredient = document.querySelector(".dropdown-list-ingredients");
    this.tags = [];
  }

  normalizeString(string) {
    const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
    const spaceRegex = new RegExp(/\s/, "g");
    return string
      .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
      .replace(diacriticRegex, "") // remove diacritics
      .toLowerCase()
      .replace(spaceRegex, ""); // remove all spaces
  }


removeListItem(types) {
    document.querySelector(`.dropdown-list-${types}`).innerHTML = "";
  }

toggle(type) {
    switch (type) {
      case "ingredients":
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.appliances`).classList.remove("expanded");
        document.querySelector(`.ustensils`).classList.remove("expanded");
        break;
      case "appliances":
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.ingredients`).classList.remove("expanded");
        document.querySelector(`.ustensils`).classList.remove("expanded");
        break;
      case "ustensils":
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.appliances`).classList.remove("expanded");
        document.querySelector(`.ingredients`).classList.remove("expanded");
        break;

      default:
        document.querySelector(`.${type}`).classList.remove("expanded");
        break;
    }
  }


  addTag(item, type) {
    //let bagdeDiv =
    // console.log(item, type, item)
    // Je crée le texte recherché
    console.log(this.tags)
    //this.tags.push(item);
    this.buildBadges(this.tags, type, item);
  }
  buildBadges(tags, filter, item) {
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
      const close = document.getElementsByClassName(`fa-times-circle`);
      for (let closeItem of close) {
        closeItem.addEventListener("click", (e) => {
          const isInclude =
            e.currentTarget.parentNode.getAttribute("data-value");
          const tagType = e.currentTarget.getAttribute("data-type");
          //const viewCard = new CardRecipesFactory(this.recipes);
          // viewCard.Recipes();

          this.tags = this.tags.filter((tag) => tag != isInclude);
          console.log(this.tags);

          // appel des CARD avec des fonctions filtrer par rapport au this.tags selectionné / Je boucle sur toute les recipes et je regarde si recipies.ingredient inclus dans tableau des tags view card avec filerRecipes

          if (this.tags.length !== 0) {
            this.tags.forEach((tag) => {
              const recipiesFiltered = this.recipes.filter((recette) => {
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
                  console.log(recette.appliance)
                  for (let i = 0; i < recette.appliance.length; i++) {
                    if (recette.appliance[i].toLowerCase() == tag) {
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
            });
          } else {
            const viewCard = new CardRecipesFactory(this.recipes);
            viewCard.Recipes();
          }

          //  console.log("filtre", filterRecipes);
          //tags.pop(filterTagBadge)
          //buildBages(filter, item)
          e.currentTarget.parentNode.remove();
        });
      }
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
      listDOM.innerText = item;
      //console.log(listDOM)
      listDOM.addEventListener("click", () => this.addTag(item, type));
      this.filterBySelect(type);
      return domBlock.append(listDOM);
    });
  }
  buildList(type, item) {
    const list = document.createElement("li");
    list.classList.add("list-items", `${type}-item`);
    list.setAttribute("id", "tag");
    list.setAttribute("data-item", type);
    list.setAttribute("data-type", `${type}`);
    list.innerText = item[0].toUpperCase() + item.slice(1);
    list.addEventListener("click", () => this.addTag(item, type));
    this.badgeEvent(type);
    return document.querySelector(`.dropdown-list-${type}`).append(list);
  }

  displayItem(types) {
    let tableauIngredients = [];
    let itemToDisplay = [];
    switch (types) {
      case "ingredients":
        document
          .querySelector(".ingredients")
          .addEventListener("click", (e) => {
            console.log("ici");

            e.preventDefault();
            e.stopPropagation();

            this.toggle("ingredients");

            
            this.recipes.forEach((recipe) => {
              const recipeIngredients = recipe.ingredients;
              recipeIngredients.forEach((ingredients) => {
                //  console.log(ingredients)
                const ingredient = ingredients.ingredient.toLowerCase();
                if (!tableauIngredients.includes(ingredient)) {
                  tableauIngredients.push(ingredient);
                  tableauIngredients.sort()
                  return this.buildList("ingredients", ingredient);
                }
              });
            });
            this.badgeEvent("ingredients");
          });

        this.inputIngredient.oninput = (e) => {
          const searchString = e.target.value;
          this.toggle("ingredients");
          this.recipes.forEach((recipe) => {
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach((ingredients) => {
              //  console.log(ingredients)
              const ingredient = ingredients.ingredient.toLowerCase();
              if (!tableauIngredients.includes(ingredient)) {
                tableauIngredients.push(ingredient);
                tableauIngredients.sort()
                return this.generateItems(
                  itemToDisplay,
                  this.dropIngredient,
                  "ingredients"
                );
              }
              itemToDisplay = tableauIngredients.filter((item) =>
                item.startsWith(e.target.value)
              );
             this.removeListItem("ingredients");
             this.generateItems(
                itemToDisplay,
                this.dropIngredient,
                "ingredients"
              );
            });
          });
          console.log(tableauIngredients);
          console.log(itemToDisplay);
          if (searchString.length > 2) {
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
            const appliFiltre = new DropDown(filteredRecipe);
            appliFiltre.displayItem("appliances");
            const ustFiltre = new DropDown(filteredRecipe);
            ustFiltre.displayItem("ustensils");
          } else {
            const appliFiltre = new DropDown(this.recipes);
            appliFiltre.displayItem("appliances");
            const ustFiltre = new DropDown(this.recipes);
            ustFiltre.displayItem("ustensils");
          }
        };
        break;
      case "appliances":
        this.inputAppliance.oninput = (e) => {
          const searchString = e.target.value;

          if (searchString.length > 2) {
            const filteredRecipe = this.recipes.filter((result) => {
              if (
                result.appliance.find((items) => {
                  return items.toLowerCase().includes(searchString);
                }) != undefined
              ) {
                return result;
              }
            });
          }
        };
        document.querySelector(".appliances").addEventListener("click", (e) => {
          this.removeListItem("appliances");
          e.preventDefault();
          e.stopPropagation();

          this.toggle("appliances");
          console.log("this RR", this.recipes);
        
          const tableauAppliances = [];
          this.recipes.forEach((recipe) => {
            const recipeAppliance = recipe.appliance.toLowerCase();
            if (!tableauAppliances.includes(recipeAppliance)) {
              tableauAppliances.push(recipeAppliance);
              tableauAppliances.sort()

              return this.buildList("appliances", recipeAppliance);
            }
          });
          this.badgeEvent("appliances");
        });
        break;
      case "ustensils":
        document.querySelector(".ustensils").addEventListener("click", (e) => {
         this.removeListItem("ustensils");
          e.preventDefault();
          e.stopPropagation();

          this.toggle("ustensils");
         
          const tableauUstensils = [];
          this.recipes.forEach((itemUstensils) => {
            itemUstensils.ustensils.forEach((ustensil) => {
              const ustensilItem = ustensil.toLowerCase();
              // console.log(toLower)
              if (!tableauUstensils.includes(ustensilItem)) {
                tableauUstensils.push(ustensilItem);
                return this.buildList("ustensils", ustensilItem);
              }
            });
          });
          this.badgeEvent("ustensils");
        });
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
              currentItem = e.currentTarget.textContent.toLowerCase();
              filterIngreByTag.filterType(
                this.tags,
                currentItem,
                "ingredients"
              );
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
