// recuperation de la data
async function getRecettes() {
  return fetch("data/recettes.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

async function rechercheRecettes(recettes) {
  const rechercheInput = document.querySelector(".rechercheInput").value.trim().toLowerCase();
  const recettesFiltrees = [];

  if (!rechercheInput || rechercheInput.length < 3) {
    // Afficher toutes les recettes si la recherche est vide ou trop courte
    for (let i = 0; i < recettes.length; i++) {
      recettesFiltrees.push(recettes[i]);
    }
  } else {
    // Filtrer les recettes qui correspondent à la recherche
    for (let i = 0; i < recettes.length; i++) {
      const recette = recettes[i];
      if (
        recette.name.toLowerCase().includes(rechercheInput) ||
        recette.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(rechercheInput)
        ) ||
        recette.description.toLowerCase().includes(rechercheInput)
      ) {
        recettesFiltrees.push(recette);
      }
    }
  }

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
}

function rechercheIngredients(recettes) {
  const rechercheIngredients = document.querySelector(".rechercheIngredients").value.trim().toLowerCase();
  const ingredientsFiltrees = [];

  if (!rechercheIngredients || rechercheIngredients.length < 3) {
    // Afficher toutes les recettes si la recherche est vide ou trop courte
    for (let i = 0; i < recettes.length; i++) {
      ingredientsFiltrees.push(recettes[i]);
    }
  } else {
    // Filtrer les recettes qui correspondent à la recherche
    for (let i = 0; i < recettes.length; i++) {
      const recette = recettes[i];
      const ingredientsFiltresRecette = []; // tableau des ingrédients de la recette correspondant à la recherche
      for (let j = 0; j < recette.ingredients.length; j++) {
        const ingredient = recette.ingredients[j].ingredient.toLowerCase();
        if (ingredient.includes(rechercheIngredients)) {
          ingredientsFiltresRecette.push(recette.ingredients[j]);
        }
      }
      if (ingredientsFiltresRecette.length > 0) {
        // ajouter la recette avec les ingrédients filtrés correspondant à la recherche
        const recetteFiltree = {
          ingredients: ingredientsFiltresRecette
        };
        ingredientsFiltrees.push(recetteFiltree);
      }
    }
  }

  if (ingredientsFiltrees.length === 0) {
    // Aucune recette ne correspond à la recherche
    document.querySelector(".boxIngredients").innerHTML = `
      <div class="messageErreurRecette"> 
      Aucune recette ne correspond à votre critère… <br> vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>`;

    document.querySelector(".boxIngredients").style.justifyContent = "center";
    
  } else {
    // Afficher les recettes filtrées
    document.querySelector(".boxIngredients").style.justifyContent = "space-between";

    ingredientsData(ingredientsFiltrees);

  }
}

function ajouterTags(selecteur, liste) {
  const elements = document.querySelectorAll(selecteur);
  elements.forEach((element, index) => {
    element.addEventListener("click", () => {
      const elementNom = liste[index];
      const boxTags = document.querySelector(".boxTags");
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.textContent = elementNom;

      const closeIcon = document.createElement("i");
      closeIcon.classList.add("fa-regular", "fa-circle-xmark", "fermeTag");

      closeIcon.addEventListener("click", () => {
        tag.remove();
        closeIcon.remove();
      });

      if (selecteur === ".choixAppareils") {
        tag.style.backgroundColor = "#68d9a4";
        closeIcon.style.backgroundColor = "#68d9a4";
      } else if (selecteur === ".choixUstenciles") {
        tag.style.backgroundColor = "#ed6454";
        closeIcon.style.backgroundColor = "#ed6454";
      } else {
        tag.style.backgroundColor = "#3282f7";
        closeIcon.style.backgroundColor = "#3282f7";
      }

      boxTags.appendChild(tag);
      boxTags.appendChild(closeIcon);
    });
  });
}

// init
async function init() {
  const { recettes } = await getRecettes(); // récupère les datas des photographes
  rechercheRecettes(recettes);

  document.querySelector(".rechercheInput").addEventListener("input", () => {
    rechercheRecettes(recettes);
  });
  document.querySelector(".rechercheIngredients").addEventListener("input", () => {
    rechercheIngredients(recettes);
  });
}

init();
