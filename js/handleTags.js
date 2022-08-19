function handleTags(arrayOfAllElements, arrayOfRecipes){

     const parentListeIngredients = document.querySelector("#liste-ingredients");

     const parentListeAppareils = document.querySelector("#liste-appareils");

     const parentListeUstensiles = document.querySelector("#liste-ustensiles");
// ajout de cette variable pour pouvoir récupérer l'ancienne valeur tableau des ingrédients avant la recherche, ainsi lorsque l'on cliquera sur la croix du tag, ça entrainera en plus de fermeture du tag, l'affichage des recettes avant la recherche.

     let oldValueArrayOfRecipes;

     const copyArrayOfRecipes = [...arrayOfRecipes];

    /* ArrayOfAllElements[0] c'est le tableau des ingredients

       ArrayOfAllElements[1]  c'est le tableau des appareils

       ArrayOfAllElements[2] c'est le tableau des ustensiles

    */
// fonctionnement au clique sur la recherche des ingrédients
    parentListeIngredients.onclick = (event)=>{
// !== inégalité strite 
// La propriété currentTarget fait toujours référence à l'élément dont l'écouteur d'événement a déclenché l'événement, par opposition à la propriété target , qui renvoie l'élément qui a déclenché l'événement.  
          if(event.target !== event.currentTarget){
// récupération du texte de l'événement cible
              const ingredient = event.target.textContent;
// La méthode Element.remove() retire l'élément courant du DOM.
            //   event.target.remove();

              displayTag(ingredient, "Ingredients"); 

              oldValueArrayOfRecipes = [...arrayOfRecipes];

              arrayOfRecipes = filterIngredients(arrayOfRecipes,ingredient);

              displayRecipes(arrayOfRecipes) //même résultat en mettant displayRecipes(result) result est le même que celui en fin de la page searchFunctionnalProgramming.js

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

        document.querySelector("#tags").insertAdjacentHTML("beforeend", tag);

    }

// FERMETURE DES TAGS
    function deleteTag(){
// je place un clique sur le parent de tous les tags
        document.querySelector("#tags").onclick = (event)=>{
// si je clique sur le parent et que je touche un de ses enfant 
             if(event.target !== event.currentTarget){
// si ma cible est égale à "img_croix")
                   if(event.target.className === "img_croix"){
// / récupère le parent de la cible 
                        const tag = event.target.parentNode;
                        // je retire le tag 
                        tag.remove();
// j'affiche l'ancienne valeur du tableaux des recettes 
                        displayRecipes(oldValueArrayOfRecipes);
// retourne l'ancienne valeur de la liste des mots clefs
                        return listingAllKeywords(oldValueArrayOfRecipes);

                   }

             }

        }

    }


// getTheUserinput = obtenir l'entrée utilisateur
    function getTheUserinput(){

         const allinputs = document.querySelectorAll(".filters-tags-area-input");
// le deuxième paramètre index va permettre à la fctio filterDetails de savoir sur quel tableau il doit aller chez les éléments

         allinputs.forEach((input, index)=>{

                input.addEventListener("input", ()=>{
                    // input.value permet de récupérer les caractères saisies dans l'input

                      const filteredArray = filterDetails(input.value, arrayOfAllElements[index]);

                      const inputNextSiblingUl = input.nextElementSibling;

                      displayDetails(filteredArray, inputNextSiblingUl);

                });

         });

    } 

    getTheUserinput();

    


}