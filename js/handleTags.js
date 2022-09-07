function handleTags(arrayOfAllElements, arrayOfRecipes){

    const parentListeIngredients = document.querySelector("#liste-ingredients");

    const parentListeAppareils = document.querySelector("#liste-appareils");

    const parentListeUstensiles = document.querySelector("#liste-ustensiles");
    
    // Récupération de l'ancienne valeur du tableau des recettes avant la recherche.
    let oldValueArrayOfRecipes;

      console.log(selectedTags)

   /* ArrayOfAllElements[0] c'est le tableau des ingredients

      ArrayOfAllElements[1]  c'est le tableau des appareils

      ArrayOfAllElements[2] c'est le tableau des ustensiles
   */

   parentListeIngredients.onclick = (event)=>{

         if(event.target !== event.currentTarget){

             const ingredient = event.target.textContent;

             displayTag(ingredient, "Ingredients"); 

             oldValueArrayOfRecipes = [...arrayOfRecipes];

             arrayOfRecipes = filterIngredients(arrayOfRecipes,ingredient);

             displayRecipes(arrayOfRecipes) 

             listingAllKeywords(arrayOfRecipes);

             deleteTag();
         }       
   };   

   parentListeAppareils.onclick = (event)=>{
     
       if(event.target !== event.currentTarget){

           const appareil = event.target.textContent;

           displayTag(appareil, "Appareils");

           oldValueArrayOfRecipes = [...arrayOfRecipes];

           arrayOfRecipes = filterAppareils(arrayOfRecipes, appareil);

           displayRecipes(arrayOfRecipes);

           listingAllKeywords(arrayOfRecipes);

           deleteTag();
       }     
   };

   parentListeUstensiles.onclick = (event)=>{
     
       if(event.target !== event.currentTarget){

           const ustensile = event.target.textContent;

           displayTag(ustensile, "Ustensiles");

           oldValueArrayOfRecipes = [...arrayOfRecipes];

           arrayOfRecipes = filterUstensiles(arrayOfRecipes, ustensile);

           displayRecipes(arrayOfRecipes) 

           listingAllKeywords(arrayOfRecipes);

           deleteTag();
       }     
   };

   function displayTag(tagName, tagCategory){

       // On vérifie si le tag que l'on veut ajouter a  deja été selectionné ou pas.

       if(selectedTags.includes(tagName.toLowerCase()) === true){

           return false;

       }
       
       let color = "";

       if(tagCategory === "Ingredients"){

           color = "#3282F7";
       }

       if(tagCategory === "Appareils"){

           color = "#68D9A4";
       }

       if(tagCategory === "Ustensiles"){

            color = "#ED6454";
       }

       const tag = `
       
       <div class="tag" style= "background-color:${color}" data-category="${tagCategory}">
         
           <span>${tagName}</span>
      
           <img class="img_croix" src="img/icone-croix-annuler.png" alt="croix pour annuler">
       
       </div>
       
       `;

       selectedTags.push(tagName);

       document.querySelector("#tags").insertAdjacentHTML("beforeend", tag);
   }

// FERMETURE DES TAGS
   function deleteTag(){

       document.querySelector("#tags").onclick = (event)=>{

            if(event.target !== event.currentTarget){

                  if(event.target.className === "img_croix"){

                       const tag = event.target.parentNode;

                       // Ici on enlève le tag du tableau des tags déjà selectionnés

                      const tagName = tag.querySelector("span").textContent;
                      
                      const tagIndex = selectedTags.findIndex((tag)=>{

                            return tag.toLowerCase() === tagName.toLowerCase();

                      });

                      selectedTags.splice(tagIndex, 1);
                  
                       tag.remove();

                       if(document.querySelectorAll(".tag").length === 0){

                           displayRecipes(recipes);

                           return listingAllKeywords(recipes);
                       } 
                              
                       displayRecipes(oldValueArrayOfRecipes);

                       return listingAllKeywords(oldValueArrayOfRecipes);

                  }

            }

       }

   }



   function getTheUserinput(){

        const allinputs = document.querySelectorAll(".filters-tags-area-input");


        allinputs.forEach((input, index)=>{

               input.addEventListener("input", ()=>{

                     const filteredArray = filterDetails(input.value, arrayOfAllElements[index]);

                     const inputNextSiblingUl = input.nextElementSibling;

                     displayDetails(filteredArray, inputNextSiblingUl);

               });

        });

   } 

   getTheUserinput();

}