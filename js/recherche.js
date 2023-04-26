function rechercheInput(recettes) {
  const rechercheInput = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  if (rechercheInput.length > 2) {
    rechercheRecettes(recettes)
  } else {
    rechercheRecettes(recettes)
  }
}

function rechercheRecettes(recettes) {
  const rechercheInput = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  const recettesFiltrees = recettes.filter((recette) =>
    [recette.name, recette.description].some((texte) => texte.toLowerCase().includes(rechercheInput)) ||
    recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(rechercheInput))
  );

    if (recettesFiltrees.length === 0) {
      // Aucune recette ne correspond à la recherche
      document.querySelector(".boxRecettes").innerHTML = `
        <div class="messageErreurRecette"> 
        Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>`;
  
      document.querySelector(".boxRecettes").style.justifyContent = "center";
      
    } else {
      // Afficher les recettes filtrées
      document.querySelector(".boxRecettes").style.justifyContent = "space-between";
  
      const ingredients = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ingredients], []);
      const appareils = recettesFiltrees.reduce((resultats, recette) => [...resultats, recette.appliance], []);
      const ustensiles = recettesFiltrees.reduce((resultats, recette) => [...resultats, ...recette.ustensils], []);
    
      recettesData(recettesFiltrees);
      rechercheIngredients(ingredients, (ingredient) => creaTagsIngredient(ingredient, recettes));
      rechercheAppareils(appareils, (appareil) => creaTagsAppareil(appareil, recettes));
      rechercheUstensiles(ustensiles, (ustensile) => creaTagsUstensile(ustensile, recettes));
    }
}

function creaTagsIngredient(ingredient, recettes) {
  const boxTags = document.querySelector(".boxTags");
  const tagText = ingredient;
  // Vérifier si le tag existe déjà
  if (boxTags.querySelector(`span.tag[title="${tagText}"]`)) {
    return;
  }
  const tag = document.createElement("span");
  tag.textContent = tagText;
  tag.setAttribute("title", tagText); // Ajouter un titre pour faciliter la recherche
  tag.classList.add("tag", "tagIngredient");
  tag.style.backgroundColor = "#3282f7";

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");
  closeIcon.style.backgroundColor = "#3282f7";

  closeIcon.addEventListener("click", () => {
    tag.remove();
    closeIcon.remove();
    rechercheTags(recettes);
  });

  boxTags.appendChild(tag);
  boxTags.appendChild(closeIcon);

  rechercheTags(recettes)
}

function creaTagsAppareil(appareil, recettes) {
  const boxTags = document.querySelector(".boxTags");
  const tagText = appareil;
  // Vérifier si le tag existe déjà
  if (boxTags.querySelector(`span.tag[title="${tagText}"]`)) {
    return;
  }

  const tag = document.createElement("span");
  tag.textContent = tagText;
  tag.setAttribute("title", tagText); // Ajouter un titre pour faciliter la recherche
  tag.classList.add("tag", "tagAppareil");
  tag.style.backgroundColor = "#68d9a4";

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");
  closeIcon.style.backgroundColor = "#68d9a4";

  closeIcon.addEventListener("click", () => {
    tag.remove();
    closeIcon.remove();
    rechercheTags(recettes);
  });

  boxTags.appendChild(tag);
  boxTags.appendChild(closeIcon);

  rechercheTags(recettes)
}

function creaTagsUstensile(ustensil, recettes) {
  const boxTags = document.querySelector(".boxTags");
  const tagText = ustensil;
  // Vérifier si le tag existe déjà
  if (boxTags.querySelector(`span.tag[title="${tagText}"]`)) {
    return;
  }
  const tag = document.createElement("span");
  tag.textContent = tagText;
  tag.setAttribute("title", tagText); // Ajouter un titre pour faciliter la recherche
  tag.classList.add("tag", "tagUstensile");
  tag.style.backgroundColor = "#ed6454";

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");
  closeIcon.style.backgroundColor = "#ed6454";

  closeIcon.addEventListener("click", () => {
    tag.remove();
    closeIcon.remove();
    rechercheTags(recettes)
  });

  boxTags.appendChild(tag);
  boxTags.appendChild(closeIcon);

  rechercheTags(recettes)
}

function rechercheTags(recettes) {
  const listeTags = document.querySelectorAll(".tag");
  
  if (listeTags.length === 0) {
    rechercheRecettes(recettes);
    return;
  }

  const dernierTag = listeTags[listeTags.length - 1];
  const dernierTitre = dernierTag.title.toLowerCase();

  let recettesFiltrees = recettes;

  if (dernierTag.classList.contains("tagIngredient")) {
    recettesFiltrees = recettesFiltrees.filter((recette) =>
      recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === dernierTitre)
    );
  } else if (dernierTag.classList.contains("tagAppareil")){
    recettesFiltrees = recettesFiltrees.filter((recette) =>
      recette.appliance.toLowerCase().includes(dernierTitre)
    );
  } else {
    recettesFiltrees = recettesFiltrees.filter((recette) =>
      recette.ustensils.includes(dernierTitre)
    );
  }

  rechercheRecettes(recettesFiltrees);
}

function rechercheIngredients(ingredients, onclicked) {
  const rechercheIngredientsInput = document.querySelector(".rechercheIngredients").value.trim().toLowerCase();
  const listeIngredients = rechercheIngredientsInput === "ingrédients" ? ingredients: ingredients.filter(ingredient => 
    ingredient.ingredient.toLowerCase().includes(rechercheIngredientsInput));

  // Afficher les recettes filtrées
  ingredientsData(listeIngredients, onclicked);
}

function rechercheAppareils(appareils, onclicked) {
  const rechercheAppareilsInput = document.querySelector(".rechercheAppareils").value.trim().toLowerCase();
  const listeAppareils = rechercheAppareilsInput === "appareils" ? appareils: appareils.filter(appareil => 
    appareil.toLowerCase().includes(rechercheAppareilsInput));
  
  // Afficher les recettes filtrées
  appareilsData(listeAppareils, onclicked);
}

function rechercheUstensiles(ustensiles, onclicked) {
  const rechercheUstensilesInput = document.querySelector(".rechercheUstensiles").value.trim().toLowerCase();
  const listeUstensiles = rechercheUstensilesInput === "ustensiles" ? ustensiles: ustensiles.filter(ustensile => 
    ustensile.toLowerCase().includes(rechercheUstensilesInput));

  // Afficher les recettes filtrées
  ustensilesData(listeUstensiles, onclicked);
}
