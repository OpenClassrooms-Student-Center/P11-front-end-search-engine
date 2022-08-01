import CardRecipesFactory from "./Factory/CardRecipesFactory.js";

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

  toggle(types) {
    document.querySelector(`.${types}`).classList.toggle("expanded");
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
      this.tags.push(item)
      const tagBadge = `
      <div id="tagItem" class="thumbnailTag thumbnail ${filter}" data-value ="${item}">
          <button id="btn-${filter}" >${item}</button>
          <i class="far fa-times-circle" ></i>
      </div>`;

    
        let currentTag = document.querySelector("#thumbnail-tags-container");
        currentTag.innerHTML += tagBadge;
        console.log('Before Recipes', this.recipes)
        const close = document.getElementsByClassName(`fa-times-circle`);
        for(let closeItem of close){
        closeItem.addEventListener("click", (e) => {
      
          console.log('ici et la', e.currentTarget.parentNode.getAttribute('data-value'));

          const isInclude = e.currentTarget.parentNode.getAttribute('data-value')

           
            //const viewCard = new CardRecipesFactory(this.recipes);
           // viewCard.Recipes();
           let arrayTag = this.tags
           console.log(isInclude)
  

           this.tags = this.tags.filter(tag => tag != isInclude)
           console.log(this.tags)
           
           //tags.pop(filterTagBadge)
           //buildBages(filter, item)
           e.currentTarget.parentNode.remove();
           console.log('Recipes', this.recipes)
        });
      }
       
   }

   
  }

  generateItems(tab, domBlock, type) {
    tab.forEach((item) => {
      const itemNormalized = this.normalizeString(item);
      const listDOM = document.createElement("li");
      listDOM.classList.add("list-items", `${type}-item`);
      listDOM.setAttribute("id", "tag");
      listDOM.setAttribute("data-item", `${itemNormalized}`);
      listDOM.setAttribute("data-type", `${itemNormalized}`);

      listDOM.innerText = item;
      domBlock.append(listDOM);
      //console.log(listDOM)
      listDOM.addEventListener("click", () => this.addTag(item, type));
    });
  }
  buildList(types, item) {
    const list = document.createElement("li");
    list.classList.add("list-items", `${types}-item`);
    list.setAttribute("id", "tag");
    list.setAttribute("data-item", types);
    list.setAttribute("data-type", `${types}`);
    list.innerText = item[0].toUpperCase() + item.slice(1);
    list.addEventListener("click", () => this.addTag(item, types));
    return document.querySelector(`.dropdown-list-${types}`).append(list);
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

            this.filterBySelect("ingredients");

            this.recipes.forEach((recipe) => {
              const recipeIngredients = recipe.ingredients;
              recipeIngredients.forEach((ingredients) => {
                //  console.log(ingredients)
                const ingredient = ingredients.ingredient.toLowerCase();
                if (!tableauIngredients.includes(ingredient)) {
                  tableauIngredients.push(ingredient);
                  return this.buildList("ingredients", ingredient);
                }
              });
            });
          });

        this.inputIngredient.oninput = (e) => {
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
            const viewCard = new CardRecipesFactory(filteredRecipe);
            viewCard.Recipes();
            this.displayItem("appliances");
            this.displayItem("ustensils");
          } else {
            const viewCard = new CardRecipesFactory(this.recipes);
            viewCard.Recipes();
            this.displayItem("appliances");
            this.displayItem("ustensils");
          }

          /* if(itemToDisplay.map(item => tableauIngredients.filter(elt => elt == item))){
   
       }else{
        this.generateItems(tableauIngredients,this.dropIngredient, "ingredients" )
       }*/

          //  const viewCard = new CardRecipesFactory(filteredRecipe);
          //
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
            const viewCard = new CardRecipesFactory(filteredRecipe);
            viewCard.Recipes();

            this.buildList("ingredients", searchString);
            this.buildList("appliances", searchString);
            this.buildList("ustensils", searchString);
            const dropdowningre = new DropDown(filteredRecipe);
            dropdowningre.displayItem("ingredients");
            const dropdownappl = new DropDown(filteredRecipe);
            dropdownappl.displayItem("appliances");
            const dropdownusten = new DropDown(filteredRecipe);
            dropdownusten.displayItem("ustensils");
          } else {
            const viewCard = new CardRecipesFactory(this.recipes);
            viewCard.Recipes();

            const dropdowningre = new DropDown(this.recipes);
            dropdowningre.displayItem("ingredients");
            const dropdownappl = new DropDown(this.recipes);
            dropdownappl.displayItem("appliances");
            const dropdownusten = new DropDown(this.recipes);
            dropdownusten.displayItem("ustensils");
          }
        };
        document.querySelector(".appliances").addEventListener("click", (e) => {
          this.removeListItem("appliances");
          e.preventDefault();
          e.stopPropagation();

          this.toggle("appliances");
          console.log("this RR", this.recipes);
          this.filterBySelect("appliances");
          const tableauAppliances = [];
          this.recipes.forEach((recipe) => {
            const recipeAppliance = recipe.appliance.toLowerCase();
            if (!tableauAppliances.includes(recipeAppliance)) {
              tableauAppliances.push(recipeAppliance);
              return this.buildList("appliances", recipeAppliance);
            }
          });
        });
        break;
      case "ustensils":
        document.querySelector(".ustensils").addEventListener("click", (e) => {
          this.removeListItem("ustensils");
          e.preventDefault();
          e.stopPropagation();

          this.toggle("ustensils");
          console.log("this RR", this.recipes);
          this.filterBySelect("ustensils");
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
        });
        break;
      default:
        break;
    }
  }

  filterBySelect(types) {
    switch (types) {
      case "ingredients":
        document
          .querySelectorAll(`.dropdown-list-${types} .${types}-item`)
          .forEach((ingredientsList) => {
            ingredientsList.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              let currentItem = e.currentTarget.textContent.toLowerCase();
              if (this.tagIngredient) {
                const filteredRecipe = this.recipes.filter((result) => {
                  if (
                    result.ingredients.find((items) => {
                      return items.ingredient
                        .toLowerCase()
                        .includes(currentItem);
                    }) != undefined
                  ) {
                    return result;
                  }
                });
                console.log(currentItem);
                console.log(this.tags);
                this.buildBadges()

                const viewCard = new CardRecipesFactory(filteredRecipe);
                viewCard.Recipes();

                this.displayItem(filteredRecipe);
              } else {
                const viewCard = new CardRecipesFactory(this.recipes);
                viewCard.Recipes();

                this.displayItem(this.recipes);
              }
            });
          });

        break;
      case "appliances":
        document
          .querySelectorAll(`.dropdown-list-${types} .${types}-item`)
          .forEach((ingredientsList) => {
            ingredientsList.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              currentItem = e.currentTarget.textContent.toLowerCase();
              if (this.tagIngredient) {
                const filteredRecipe = this.recipes.filter((result) => {
                  if (
                    result.ingredients.find((items) => {
                      return items.ingredient
                        .toLowerCase()
                        .includes(currentItem);
                    }) != undefined
                  ) {
                    return result;
                  }
                });
                console.log(currentItem);
                this.buildBadges(currentItem, "ingredient");
                console.log(filteredRecipe);
                // fermeture du badge
                /*document.querySelectorAll("#tagItem").forEach((badge) => {
                  document
                    .querySelector(".fa-times-circle")
                    .addEventListener("click", (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Je suis ici", e);
                      badge.remove();

                      const viewCard = new CardRecipesFactory(this.recipes);
                      viewCard.Recipes();
                    });
                });*/

                const viewCard = new CardRecipesFactory(filteredRecipe);
                viewCard.Recipes();

                this.displayItem(filteredRecipe);
              } else {
                const viewCard = new CardRecipesFactory(this.recipes);
                viewCard.Recipes();

                this.displayItem(this.recipes);
              }
            });
          });
        break;
      case "ustensils":
        document
          .querySelectorAll(`.dropdown-list-${types} .${types}-item`)
          .forEach((ustensilsList) => {
            ustensilsList.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              currentItem = e.currentTarget.textContent.toLowerCase();
              if (this.tagIngredient) {
                const filteredRecipe = this.recipes.filter((result) => {
                  if (
                    result.ustensils.find((items) => {
                      return items.ustensils
                        .toLowerCase()
                        .includes(currentItem);
                    }) != undefined
                  ) {
                    return result;
                  }
                });
                console.log(currentItem);
                this.createFilterBadge(currentItem, "ustensils");
                console.log(filteredRecipe);
                // fermeture du badge
               /* document.querySelectorAll("#tagItem").forEach((badge) => {
                  document
                    .querySelector(".fa-times-circle")
                    .addEventListener("click", (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Je suis ici", e);
                      badge.classList.add("d-none");

                      const viewCard = new CardRecipesFactory(this.recipes);
                      viewCard.Recipes();
                    });
                });*/

                const viewCard = new CardRecipesFactory(filteredRecipe);
                viewCard.Recipes();

                this.displayItem(filteredRecipe);
              } else {
                const viewCard = new CardRecipesFactory(this.recipes);
                viewCard.Recipes();

                this.displayItem(this.recipes);
              }
            });
          });
        break;
      default:
        break;
    }
  }
}
