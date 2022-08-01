import DropDown from "../dropdown.js";
import CardRecipesFactory from "../Factory/CardRecipesFactory.js";

export default class Filter {
  constructor(recipes) {
    this.recipes = recipes;
    this.input = document.getElementById("find");
   
    this.onfocusInput;
  }
  onfocusInput() {
    this.input.onfocus = () => {
      document
        .querySelector(".dropdown-list-ingredients")
        .classList.add("d-none");
      document.querySelector(".ingredients").classList.remove("expanded");
      document
        .querySelector(".dropdown-list-ingredients")
        .classList.remove("d-none");

      document
        .querySelector(".dropdown-list-appliances")
        .classList.add("d-none");
      document.querySelector(".appliances").classList.remove("expanded");
      document
        .querySelector(".dropdown-list-appliances")
        .classList.remove("d-none");

      document
        .querySelector(".dropdown-list-ustensils")
        .classList.add("d-none");
      document.querySelector(".ustensils").classList.remove("expanded");
      document
        .querySelector(".dropdown-list-ustensils")
        .classList.remove("d-none");
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

        const dropdowningre = new DropDown(filteredRecipe)
        dropdowningre.displayItem("ingredients")
        const dropdownappl = new DropDown(filteredRecipe)
        dropdownappl.displayItem("appliances")
        const dropdownusten = new DropDown(filteredRecipe)
        dropdownusten.displayItem("ustensils")
      } else {
        const viewCard = new CardRecipesFactory(this.recipes);
        viewCard.Recipes();
       
  
        const dropdowningre = new DropDown(this.recipes)
        dropdowningre.displayItem("ingredients")
        const dropdownappl = new DropDown(this.recipes)
        dropdownappl.displayItem("appliances")
        const dropdownusten = new DropDown(this.recipes)
        dropdownusten.displayItem("ustensils")
      }

     
    };
  }
}
