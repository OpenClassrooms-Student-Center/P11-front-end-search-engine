import SearchDropDown from '../SearchDropDown.js'
import CardRecipesFactory from "../Factory/CardRecipesFactory.js";

export default class Filter {
  constructor(recipes) {
    this.recipes = recipes;
    this.input = document.getElementById("find");
    this.arrIngredient = [];
    this.tags = [];
    this.onfocusInput;
  }
  onfocusInput(type) {
    this.input.onfocus = () => {
      if(type == "ingredients"){
      document
        .querySelector(`.dropdown-list-${type}`)
        .classList.add("d-none");
      document.querySelector(`.${type}`).classList.remove("expanded");
      document
        .querySelector(`.dropdown-list-${type}`)
        .classList.remove("d-none");
      }else if(type == "appliances"){
      document
        .querySelector(`.dropdown-list-${type}`)
        .classList.add("d-none");
      document.querySelector(`.${type}`).classList.remove("expanded");
      document
        .querySelector(`.dropdown-list-${type}`)
        .classList.remove("d-none");
      }else if(type == "ingredients"){
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
        const viewCard = new CardRecipesFactory(filteredRecipe);
        viewCard.Recipes();

        const dropdowningre = new SearchDropDown(filteredRecipe);
        dropdowningre.displayItem("ingredients");
        const dropdownappl = new SearchDropDown(filteredRecipe);
        dropdownappl.displayItem("appliances");
        const dropdownusten = new SearchDropDown(filteredRecipe);
        dropdownusten.displayItem("ustensils");
        console.log(filteredRecipe)
        console.log(dropdowningre.displayItem("ingredients"))
      } else {
        const viewCard = new CardRecipesFactory(this.recipes);
        viewCard.Recipes();

        const dropdowningre = new SearchDropDown(this.recipes);
        dropdowningre.displayItem("ingredients");
        const dropdownappl = new SearchDropDown(this.recipes);
        dropdownappl.displayItem("appliances");
        const dropdownusten = new SearchDropDown(this.recipes);
        dropdownusten.displayItem("ustensils");
      }
    };
  }

  filterType(tab, currentItem, type) {
    let currentRecipes = [];
    switch (type) {
      case "ingredients":
        if (!tab.length == 0) {
          currentRecipes = this.recipes.filter((result) => {
            if (
              result.ingredients.find((items) => {
                return items.ingredient.toLowerCase().includes(currentItem);
              }) != undefined
            ) {
              return result;
            }
          });
          //console.log(currentRecipes)
          const viewCard = new CardRecipesFactory(currentRecipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(currentRecipes);
        dropdowningre.displayItem("ingredients");
        const dropdownappl = new SearchDropDown(currentRecipes);
        dropdownappl.displayItem("appliances");
        const dropdownusten = new SearchDropDown(currentRecipes);
        dropdownusten.displayItem("ustensils");
          
         

        } else {
          const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(this.recipes);
         dropdowningre.displayItem("ingredients");
          const dropdownappl = new SearchDropDown(this.recipes);
          dropdownappl.displayItem("appliances");
            const dropdownusten = new SearchDropDown(this.recipes);
        dropdownusten.displayItem("ustensils");
        
        }

        break;
      case "appliances":
        if (!tab.length == 0) {
          currentRecipes = this.recipes.filter((result) => {
            if (result.appliance.toLowerCase().includes(currentItem)) {
              return result;
            }
          });
          const viewCard = new CardRecipesFactory(currentRecipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(currentRecipes);
        dropdowningre.displayItem("ingredients");
        const dropdownappl = new SearchDropDown(currentRecipes);
        dropdownappl.displayItem("appliances");
        const dropdownusten = new SearchDropDown(currentRecipes);
        dropdownusten.displayItem("ustensils");
        } else {
          const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(this.recipes);
         dropdowningre.displayItem("ingredients");
          const dropdownappl = new SearchDropDown(this.recipes);
          dropdownappl.displayItem("appliances");
            const dropdownusten = new SearchDropDown(this.recipes);
        dropdownusten.displayItem("ustensils");
       
        }

        break;
      case "ustensils":
        if (!tab.length == 0) {
        currentRecipes = this.recipes.filter((result) => {
        

          if (
            result.ustensils.find((ustensils) =>
              ustensils.toLowerCase().includes(currentItem)
            )
          ) {
            return result;
          }
        });
        const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(this.recipes);
         dropdowningre.displayItem("ingredients");
          const dropdownappl = new SearchDropDown(this.recipes);
          dropdownappl.displayItem("appliances");
            const dropdownusten = new SearchDropDown(this.recipes);
        dropdownusten.displayItem("ustensils");
        } else {
          const viewCard = new CardRecipesFactory(this.recipes);
          viewCard.Recipes();
          const dropdowningre = new SearchDropDown(this.recipes);
         dropdowningre.displayItem("ingredients");
          const dropdownappl = new SearchDropDown(this.recipes);
          dropdownappl.displayItem("appliances");
            const dropdownusten = new SearchDropDown(this.recipes);
        dropdownusten.displayItem("ustensils");
         
        }

        break;
      default:
        break;
    }
  }
}
