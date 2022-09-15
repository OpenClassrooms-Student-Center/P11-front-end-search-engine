function filterUstensiles(arrayOfRecipes, ustensilsToSearch){

    const filteredUstensils = [];

    const j = arrayOfRecipes.length;

    for(let i=0; i<j; i++){

         if(arrayOfRecipes[i].ustensils.includes(ustensilsToSearch) === true){

            filteredUstensils.push(arrayOfRecipes[i]);

         }

    }

    return filteredUstensils;
 
}