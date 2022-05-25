document.addEventListener("DOMContentLoaded", ()=>{

    displayRecipes(recipes);

    const userInput = document.querySelector("#search");

    userInput.addEventListener("input", function(){


           if(this.value.length < 3){

                 return false;

           }

           searchFunctionnalProgramming(this.value).then((response)=>{

                displayRecipes(response)

           });

       


    });
    
 
});