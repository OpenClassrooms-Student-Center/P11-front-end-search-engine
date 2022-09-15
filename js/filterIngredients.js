function filterIngredients(arrayOfRecipes, ingredientToSearch){

        const filteredIngredients = [];

        const j = arrayOfRecipes.length;

        for(let i=0; i<j; i++){


            let isOnIngredients = false;

            const l = arrayOfRecipes[i].ingredients.length;

            for(let k=0; k<l; k++){

                  if(arrayOfRecipes[i].ingredients[k].ingredient.toLowerCase().includes(ingredientToSearch) === true){

                      isOnIngredients = true;

                  }

            }

            if(isOnIngredients === true){

                        
                 filteredIngredients.push(arrayOfRecipes[i]);

            }

          

        }

        return filteredIngredients;
    
}