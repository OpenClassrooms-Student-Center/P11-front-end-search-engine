// avant d'éxécuter le code JS, on s'assure que le dom est chargé( que le html est bien chargé)

document.addEventListener("DOMContentLoaded", ()=>{

    displayRecipes(recipes);

    const userInput = document.querySelector("#search");


// écouteur d'évènement pour récupérer tous ce qui sera saisi dans l'input. 
    userInput.addEventListener("input", function(){
        // test : concole.log(this.value) 

        // ici this vaut userInput - si la valeur est inférieur à 3 caractères, on ne fait rien
           if(this.value.length < 3){

                 return false;

           }

       
           searchFunctionnalProgramming(this.value).then((response)=>{

            if(response === "Pas de recettes trouvées"){
                const resultMessage = "<p>La recette que vous cherchez n'existe pas</p>"
                return displayNoRecipes(resultMessage)
            }

               return  displayRecipes(response) //même résultat en mettant displayRecipes(result) result est le même que celui en fin de la page searchFunctionnalProgramming.js

           });

       


    });
    
 
});