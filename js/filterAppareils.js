function filterAppareils(arrayOfRecipes, applianceToSearch){

       const filteredAppliances = [];

       const j = arrayOfRecipes.length;

       for(let i=0; i<j; i++){

            if(arrayOfRecipes[i].appliance.toLowerCase().includes(applianceToSearch) === true){

                   filteredAppliances.push(arrayOfRecipes[i]);

            }

       }

       return filteredAppliances;

}