import CardRecipesFactory from "../Factory/CardRecipesFactory.js";
import SearchDropDown from "../SearchDropDown.js";
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
 

  FilterDisplayRecipes() {
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
        new SearchDropDown(filteredRecipe);
     
      } else {
        const viewCard = new CardRecipesFactory(this.recipes);
        viewCard.Recipes();
        new SearchDropDown(this.recipes);
      }
    };
  } 
}