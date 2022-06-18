
//         FILTRE BARRE PRINCIPALE

const barreChamp = document.getElementById("barre_champ");


function filtreBarre(){
    const inputBarre = barreChamp.value;
    let resultat = [];

    if (inputBarre.length >= 3){    //filtre des recettes en relation avec les caractères tapés  

        resultat = recettes.filter(recette => recette.name.toLowerCase().includes(inputBarre.toLowerCase()) || recette.description.toLowerCase().includes(inputBarre.toLowerCase()) || recette.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(inputBarre.toLowerCase())));

        recettes = resultat; 
        
    }else{      //sinon affiche toutes les recettes avec un filtre correspondant aux tags selectionnes

        recettes = recipes;
        filtreTag();
        resultat = recettes;

    }
    if (resultat.length == 0){  //si il n'y a aucune correspondance, affiche un message

        pasDeRecette();

    }else{

        displayRecette(resultat);   //j'affiche le resultat de ce filtre au niveau des recettes
    }

    displayListe(resultat);     //j'affiche le resultat de ce filtre au niveau des listes btn
    
}

barreChamp.addEventListener("input", filtreBarre);




