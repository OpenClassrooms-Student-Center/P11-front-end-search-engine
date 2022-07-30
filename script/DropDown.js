import CardRecipesFactory from "./Factory/CardRecipesFactory.js";
export default class DropDown {
  constructor(recipes) {
    //console.log('je suis ici  sorted', recipes.length)
    this.recipes = recipes;
    this.tagIngredient = document.getElementById("thumbnail-tags-container");
    this.badgeList = []
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

  buildListIngredient(ingredient) {
    const listIngredients = document.createElement("li");
    listIngredients.classList.add("list-items", "ingredients-item");
    listIngredients.setAttribute("id", "tag");
    listIngredients.setAttribute("data-item", ingredient);
    listIngredients.setAttribute("data-type", "ingredient");
    listIngredients.innerText =
      ingredient[0].toUpperCase() + ingredient.slice(1);

    return document
      .querySelector(".dropdown-list-ingredients")
      .append(listIngredients);
  }
  buildListAppliances(appliance) {
    const listAppliances = document.createElement("li");
    listAppliances.classList.add("list-items", "appliances-item");
    listAppliances.setAttribute("id", "tag");
    listAppliances.setAttribute("data-item", appliance);
    listAppliances.setAttribute("data-type", "appliance");
    listAppliances.innerText = appliance[0].toUpperCase() + appliance.slice(1);

    return document
      .querySelector(".dropdown-list-appliances")
      .append(listAppliances);
  }
  buildListUstensils(ustensil) {
    const listUstensils = document.createElement("li");
    listUstensils.classList.add("list-items", "ustensils-item");
    listUstensils.setAttribute("id", "tag");
    listUstensils.setAttribute("data-item", ustensil);
    listUstensils.setAttribute("data-type", "ustensil");
    listUstensils.innerText = ustensil[0].toUpperCase() + ustensil.slice(1);

    return document
      .querySelector(".dropdown-list-ustensils")
      .append(listUstensils);
  }

  displayIngredients() {
    document.querySelector(".ingredients").addEventListener("click", (e) => {
      this.removeListItem("ingredients");
      e.preventDefault();
      e.stopPropagation();

      this.toggle("ingredients");

      console.log("this RR", this.recipes);

      const tableauIngredients = [];
      this.recipes.forEach((recipe) => {
        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach((ingredients) => {
          //  console.log(ingredients)
          const ingredient = ingredients.ingredient.toLowerCase();
          if (!tableauIngredients.includes(ingredient)) {
            tableauIngredients.push(ingredient);
            return this.buildListIngredient(ingredient);
          }

          //const doubleDelete = tableauIngredients.filter((item, index, arr) => arr.indexOf(item) == index)
        });
      });
      this.filterBySelect("ingredients");
    });
  }
  displayAppliances() {
    document.querySelector(".appliances").addEventListener("click", (e) => {
      this.removeListItem("appliances");
      e.preventDefault();
      e.stopPropagation();

      this.toggle("appliances");
      this.filterBySelect("appliances");
      console.log("this RR", this.recipes);
      const tableauAppliances = [];
      this.recipes.forEach((recipe) => {
        const recipeAppliance = recipe.appliance.toLowerCase();
        if (!tableauAppliances.includes(recipeAppliance)) {
          tableauAppliances.push(recipeAppliance);
          return this.buildListAppliances(recipeAppliance);
        }
      });
    });
  }
  displayUstensils() {
    document.querySelector(".ustensils").addEventListener("click", (e) => {
      this.removeListItem("ustensils");
      e.preventDefault();
      e.stopPropagation();

      this.toggle("ustensils");
      this.filterBySelect("ustensils");
      console.log("this RR", this.recipes);

      const tableauUstensils = [];
      this.recipes.forEach((itemUstensils) => {
        itemUstensils.ustensils.forEach((ustensil) => {
          const ustensilItem = ustensil.toLowerCase();
          // console.log(toLower)
          if (!tableauUstensils.includes(ustensilItem)) {
            tableauUstensils.push(ustensilItem);
            return this.buildListUstensils(ustensilItem);
          }
        });
      });
    });
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
              const currentIngre = e.currentTarget.textContent.toLowerCase();
              if (this.tagIngredient) {
                const filteredRecipe = this.recipes.filter((result) => {
                  if (
                    result.name.toLowerCase().includes(currentIngre) ||
                    result.description.toLowerCase().includes(currentIngre) ||
                    result.ingredients.find((items) => {
                      return items.ingredient
                        .toLowerCase()
                        .includes(currentIngre);
                    }) != undefined
                  ) {
                    return result;
                  }
                });
                this.createFilterBadge(currentIngre, "ingredient" )

                // fermeture du badge
                document
                  .querySelectorAll("#tagItemIngredients")
                  .forEach((badge) => {
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
                  });
                // filtre des
                const viewCard = new CardRecipesFactory(filteredRecipe);
                viewCard.Recipes();

                this.displayIngredients();
                this.displayAppliances();
                this.displayUstensils();
              } else {
                const viewCard = new CardRecipesFactory(this.recipes);
                viewCard.Recipes();

                this.displayIngredients();
                this.displayAppliances();
                this.displayUstensils();
              }
            });
          });

        break;
      case "appliances":
        console.log("dans l'appliances");
        break;
      case "ustensils":
        console.log("dans l'ustensils");
        break;
      default:
        break;
    }
  }
  createFilterBadge(filter, textContent) {
    
    const tagItem = `
                    <div id="tagItemIngredients" class="thumbnailTag thumbnail ingre" >
                        <button id="btnIngredients" >${
                          filter[0].toUpperCase() + filter.slice(1)
                        }</button>
                        <i class="far fa-times-circle"></i>
                        </div>`;
    this.tagIngredient.insertAdjacentHTML("beforeend", tagItem);

    let badgeClose =  document.querySelector(".fa-times-circle")
    this.badgeList.push(textContent)
    console.log(this.badgeList)
    badgeClose.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Je suis ici", e.target);
        
        this.badgeList.pop(e.target)
    };
  }
}
