function searchFunctionnalProgramming(userInput){
// Une promesse est un objet renvoyé par une fonction asynchrone et qui représente l'état courant de l'opération.Ojectif : rapidité en lançant plusieurs recherches simultanément.
     return new Promise((resolve, reject)=> {

        userInput = normalizeString(userInput);

        function resultRecipesName(){
    
    
            return new Promise((resolve, reject)=>{
            // filter renvoie toujours un tableau
    
                const resultRecipesName = recipes.filter((recipe)=>{
    
        // toLowercase méthode qui converti une chaine en minuscule
        // .includes si les caractères saisis par l'utilisateur (=userInput) est inclu ds les noms des recettes = true 
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

// on crée une variable pour qui verifie si les caractères saisis dans l'input figure dans les ingrédients. Par défault on déclare que cette variable est fausse. Sans cette étape il nous renvoie unuquement le tableau des ingrédient et non le tableau de toute la recette avec le nom,...
                    let isOnIngredients = false;
                    // dans le tableau des ingrédients pour chaque ingrédient 
                    recipe.ingredients.forEach((recipeIngredient)=>{
                        // si la valeur de linput est correspondant à la liste d'un ingrédient alors c'est égale à vrai.
                        if(recipeIngredient.ingredient.toLowerCase().includes(userInput) === true){
                             //est dans les ingrédients    
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
        //  operateur spread permet en ajoutant ... devant un tableau ou une itération de récupérer ts les éléments d'un tableau
        // ci-dessous concaténation des ts les éléments des tableaux result dont l'index est 0 1 et 2.
                result = [...result[0], ...result[1], ...result[2]];
    
                if(result.length === 0){
    
                     return resolve('Pas de recettes trouvées');
    
                }
// La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
                const jsonObject = result.map(JSON.stringify);
//Set(=ensemble) est un ensemble JS est une collection de valeurs uniques.Chaque valeur ne peut apparaître qu'une seule fois dans un ensemble. permet d'éviter les doublons.   
                const uniqueSet = new Set(jsonObject);
// La Array.from()méthode renvoie un tableau à partir de n'importe quel objet avec une propriété de longueur.
                result = Array.from(uniqueSet).map(JSON.parse);
      
                return resolve(result);
           
       });


     });


}