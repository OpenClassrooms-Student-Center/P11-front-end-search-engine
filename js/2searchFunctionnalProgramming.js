// BARRE DE RECHERCHE ECOUTEUR D'EVENEMENT SUR PRESSION DU CLAVIER
const searchInput = document.querySelector("#search");

// la méthode .keyup() permet de mettre l'écouteur d'événement dès qu'une touche est pressée- (e) pour évèvement(ds la console il correspond à un tableau de bord avec de nombreux élément dont value qui sera les caractères saisis)
searchInput.addEventListener("keyup",(e) => { 
    // target est l'un des élément de l'évènement(e), ici c'est l'input
    // console.log(e)
    const searchedLetters = e.target.value;
    console.log(searchedLetters)
    // récupère toutes les cartes de recettes 
    const cardsRecipes = document.querySelectorAll(".recipe_article");
    // console.log(cardsRecipes)
    const recipesName = recipes.name.textContent.toLowerCase();
    // console.log(recipesName)
    filterElements(searchedLetters, cardsRecipes)
    resultSearchRecipesName (searchedLetters, recipesNames, cardsRecipes)
    resultRecipesDescription (searchedLetters, recipesDescription, cardsRecipes)
    resultRecipesIngredient (searchedLetters, recipesIngredient, cardsRecipes)
});

// elements correspond aux cartes et letters aux lettres saisies
function filterElements (searchedLetters, elements) {
    // la fct se déclenchera uniquement lorsque l'utilisateur auras saisi plus de 2 caractèress.
    if (searchedLetters.length >2) {
        for (let i=0; 1<elements.length; i++){
            // si les lettres saisies est inclut dans les cartes de recettes 
            if(elements[i].textContent.toLowerCase().includes(searchedLetters)) {
                elements[i].style.display = "block";        
            }else {
                elements[i].style.display = "none";
            }
        }
    }
}


function resultSearchRecipesName (){

    // if (letters.length >2) {
    //     for (let i=0; 1<recipesName.length; i++){
    //         if (recipesName[i].textContent.toLowerCase().includes(searchedLetters)) {
    //             cardsRecipes[i].style.display = "block";
    //         }else {
    //             cardsRecipes[i].style.display = "none";
    //         }
    //     }        
    // }

    const resultRecipesName = [];

    return new Promise((resolve, reject)=>{

          const j = recipes.length;

         for(let i=0; i<j; i++){

             if(recipes[i].name.toLowerCase().includes(userInput) === true){

                    resultRecipesName.push(recipes[i]);

             }

         }

         resolve(resultRecipesName);

    });
    
}

function resultRecipesDescription(searchedLetters, recipesDescription) {
    // la fct se déclenchera uniquement lorsque l'utilisateur auras saisi plus de 2 caractèress.
    if (letters.length >2) {
        for (let i=0; 1<elements.length; i++){
            // si les lettres saisies est inclut dans les cartes de recettes 
            if(recipesDescription[i].textContent.toLowerCase().includes(searchedLetters)) {
                cardsRecipes[i].style.display = "block";        
            }else {
                cardsRecipes[i].style.display = "none";
            }
        }
    }
}

function resultRecipesIngredient (searchedLetters, recipesIngredients) {
    // la fct se déclenchera uniquement lorsque l'utilisateur auras saisi plus de 2 caractèress.
    if (letters.length >2) {
        for (let i=0; 1<recipesDescription.length; i++){
            // si les lettres saisies est inclut dans les cartes de recettes 
            if(recipesDescription[i].textContent.toLowerCase().includes(searchedLetters)) {
                cardsRecipes[i].style.display = "block";        
            }else {
                cardsRecipes[i].style.display = "none";
            }
        }
    }
}

