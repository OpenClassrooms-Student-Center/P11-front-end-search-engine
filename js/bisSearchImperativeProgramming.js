function searchImperativeProgramming(userInput){

    return new Promise((resolve, reject)=> {
         
        userInput = normalizeString(userInput);

        function resultRecipesName (){

            const resultRecipesName = [];

            return new Promise((resolve, reject)=>{

                const j = recipes.length;

                for(let i=0; i<j; i++){

                    if(recipes[i].name.toLowerCase().includes(userInput) === true) {
// La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.

                        return resultRecipesName.push(recipes[i]);

                    }

                }

                return resolve(resultRecipesName)

                
            })
        }
        
        function resultRecipesIngredients(){

            return new Promise((resolve, reject)=>{

                const resultRecipesIngredients = [];

                const j = recipes.length;

                for(let i=0; i<j; i++){

                    let isOnIngredients = false;

                    const recipeIngredient = recipe.ingredients.length;
                    
                    // const recipeIngredient = recipe.ingredient.length;

                    for(let i=0; i<recipeIngredient; i++){

                        if (recipeIngredient.ingredient.toLowerCase().include(userInput) === true){

                            isOnIngredients = true;
                        }
                    }; 
                    
                    if(isOnIngredients === true) {

                        return resultRecipesIngredients.push(recipes[i]);
                    }
                }
                
                });
            
                return  resolve(resultRecipesIngredients);
            
        }

        function resultRecipesDescription(){

            const resultRecipesDescription = [];

            return new Promise((resolve, reject)=>{
    
                const j = recipes.length;
    
                for(let i=0; i<j; i++){
                    if(recipes[i].description.toLowerCase().includes(userInput) === true){

                        resultRecipesDescription.push(recipes[i]);
                        }

                    }

                    resolve(resultRecipesDescription);
            
                });
        }

        Promise.all([resultRecipesName(), resultRecipesIngredients(), resultRecipesDescription()]).then((result)=>{
            //  operateur spread permet en ajoutant ... devant un tableau ou une itération de récupérer ts les éléments d'un tableau
            // ci-dessous concaténation des ts les éléments des tableaux result dont l'index est 0 1 et 2.
                result = [...result[0], ...result[1], ...result[2]];
    
                if(result.length === 0){
    
                        return resolve('Pas de recettes trouvées');
    
                }

                const jsonObject = result.map(JSON.stringify);
        
                const uniqueSet = new Set(jsonObject);

                result = Array.from(uniqueSet).map(JSON.parse);
        
                return resolve(result);
            
        });
    
    
    });
}