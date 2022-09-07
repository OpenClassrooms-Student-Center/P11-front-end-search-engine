function searchFunctionnalProgramming(userInput){
     return new Promise((resolve, reject)=> {
        userInput = normalizeString(userInput);
        function resultRecipesName(){    
            return new Promise((resolve, reject)=>{
                const resultRecipesName = recipes.filter((recipe)=>{       
                    if(recipe.name.toLowerCase().includes(userInput) === true){            
                        return recipe;            
                    }    
                });    
                return resolve(resultRecipesName);                
            })   
        }        
        function resultRecipesIngredients(){      
            return new Promise((resolve, reject)=>{    
                const resultRecipesIngredients = recipes.filter((recipe)=>{
                    let isOnIngredients = false;
                    recipe.ingredients.forEach((recipeIngredient)=>{
                        if(recipeIngredient.ingredient.toLowerCase().includes(userInput) === true){
                            isOnIngredients = true;           
                        }           
                    });
           
                    if(isOnIngredients === true){           
                        return recipe;         
                    }           
                });                 
                return resolve(resultRecipesIngredients);    
            });    
        }    
        function resultRecipesDescription(){     
              return new Promise((resolve, reject)=>{    
                    const resultRecipesDescription = recipes.filter((recipe)=>{    
                        if(recipe.description.toLocaleLowerCase().includes(userInput) === true){                
                            return recipes;                
                        }                
                    });    
                    return resolve(resultRecipesDescription);     
              });      
        }    
       Promise.all([resultRecipesName(), resultRecipesIngredients(), resultRecipesDescription()]).then((result)=>{      
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