document.addEventListener("DOMContentLoaded", ()=>{

    displayRecipes(recipes);

    const userInput = document.querySelector("#search");

    userInput.addEventListener("input", function(){

        // ici this vaut userInput - si la valeur est inférieur à 3 caractères

           if(this.value.length < 3){

                 return false;

           }

           searchFunctionnalProgramming(this.value).then((response)=>{

                displayRecipes(response) //même résultat en mettant displayRecipes(result) result est le même que celui en fin de la page searchFunctionnalProgramming.js

           });

       


    });
    
 
});