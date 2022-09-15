function listingAllKeywords(arrayOfRecipes){

        // RECUPERE LA LISTE DE TOUS LES INGREDIENTS

    // contiendra ts les ingrédients y compris les doublons
    const allIngredients = [];
   
    for (let i=0; i<arrayOfRecipes.length; i++) {
   
        let ingredients = arrayOfRecipes[i].ingredients; 
   
        ingredients.map(({ingredient}) => {
         
            allIngredients.push(`${ingredient.toLowerCase()}`);
            
        });
    }

    const ingredientsNoDuplicates = Array.from(new Set(allIngredients));


    // RECUPERE LA LISTE DE TOUS LES APPAREILS

    const allAppliances = [];
    for (let i=0; i<arrayOfRecipes.length; i++) {
        let appliances = arrayOfRecipes[i].appliance;
        allAppliances.push(appliances.toLowerCase());
    }
    const appliancesNoDuplicates = Array.from(new Set(allAppliances));


    // RECUPERE LA LISTE DE TOUS LES USTENSILES

    const allUstensils = [];
    for (let i=0; i<arrayOfRecipes.length; i++) {
        let ustensils = arrayOfRecipes[i].ustensils;

        ustensils = ustensils.map((ustensil)=>{

                return ustensil.toLowerCase();

        });

        allUstensils.push(ustensils);
    };

    const ustensilsNoDuplicates = Array.from(new Set(allUstensils.flat()));


    function fillIngredients(ingredientsArray){

        return new Promise((resolve)=>{


                let html = "";

                ingredientsArray.forEach((ingredient)=>{
        
                    html+= `<li>${ingredient}</li>`;
        
                });
        
                document.querySelector("#liste-ingredients").innerHTML = html;

                resolve("Ingredients ajoutés");


        });

    }

    function fillAppliances(appliancesArray){


        return new Promise((resolve)=>{


            let html = "";

            appliancesArray.forEach((appliance)=>{

                html+= `
                
                        <li>${appliance}</li>
                
                `;

            });

            document.querySelector("#liste-appareils").innerHTML = html;

            resolve("Appareils ajoutés");


    });

    }

    function fillUstensils(ustensilsArray){


        return new Promise((resolve)=>{

            let html = "";

            ustensilsArray.forEach((ustensil)=>{

                html+= `
                
                        <li>${ustensil}</li>
                
                `;

            });

            document.querySelector("#liste-ustensiles").innerHTML = html;

            resolve("Ustensiles ajoutés");


    });

    }


    Promise.all([fillIngredients(filterByTitle(ingredientsNoDuplicates)), fillAppliances(filterByTitle(appliancesNoDuplicates)), fillUstensils(filterByTitle(ustensilsNoDuplicates))]).then((result)=>{         
            
        const arrayOfAllElements = [ingredientsNoDuplicates, appliancesNoDuplicates, ustensilsNoDuplicates];

            handleTags(arrayOfAllElements, arrayOfRecipes);

    });


}