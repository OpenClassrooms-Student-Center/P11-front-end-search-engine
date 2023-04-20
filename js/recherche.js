
function rechercheRecettes(recettes) {
  const rechercheInput = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  const recettesFiltrees = recettes.filter((recette) =>
    [recette.name, recette.description].some((texte) => texte.toLowerCase().includes(rechercheInput)) ||
    recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(rechercheInput))
  );

  if (rechercheInput.length > 2) {
    if (recettesFiltrees.length === 0) {
      // Aucune recette ne correspond à la recherche
      document.querySelector(".boxRecettes").innerHTML = `
        <div class="messageErreurRecette"> 
        Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>`;
  
      document.querySelector(".boxRecettes").style.justifyContent = "center";
      
    } else {
      // Afficher les recettes filtrées
      document.querySelector(".boxRecettes").style.justifyContent = "space-between";
  
      recettesData(recettesFiltrees);
      ingredientsData(recettesFiltrees);
      appareilsData(recettesFiltrees);
      ustencilesData(recettesFiltrees);
    }
  } else {
    recettesData(recettes);
    ingredientsData(recettes);
    appareilsData(recettes);
    ustencilesData(recettes);
  }
}
