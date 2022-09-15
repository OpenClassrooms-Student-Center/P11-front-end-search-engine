document.addEventListener("DOMContentLoaded", ()=>{

    displayRecipes(recipes);

    listingAllKeywords(recipes);

    const userInput = document.querySelector("#search");

    userInput.addEventListener("input", function(){
         
           if(this.value.length < 3 && this.value.length > 0){

                 return false;

           }

           if(this.value.length === 0){

                displayRecipes(recipes);

                return listingAllKeywords(recipes);

           }
       
           searchFunctionnalProgramming(this.value).then((response)=>{

            console.log(response)

            if(response === "Pas de recettes trouvées"){
                const resultMessage = `<p id="message_no_recipes">Aucune recette ne correspond à votre critère…    Vous pouvez
                chercher "tarte aux pommes", "poisson", etc.
                </p>`;
                return displayNoRecipes(resultMessage);
            }

               displayRecipes(response) //même résultat en mettant displayRecipes(result) result est le même que celui en fin de la page searchFunctionnalProgramming.js

               listingAllKeywords(response);


           });

       


    });
    
 
});