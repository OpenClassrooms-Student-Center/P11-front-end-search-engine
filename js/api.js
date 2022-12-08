import * as index from "../index.js";

// GET DATA
   export const getRecipes = (async () =>
   await fetch("./data/recipes.json")
   .then((response) => {
      return response.json();
      })
   .then((data) => {
      console.log(data);
      index.GetRecipesHydrate(data.recipes);
      })
   .catch((error) => {
      console.log(error);
      }
   )
   )();

   // FUNCTION CONSTRUCTEUR
   export function renderRecipes(data) {
   // console.log(data);
   this.data = data;
   this.returnRecipes = function (data) {
     console.log(data);
     return data;
   };
 }
