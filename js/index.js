// recuperation de la data
async function getRecettes() {
  return fetch("data/recettes.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

async function recettesData(recettes) {
  const recettesSection = document.querySelector(".boxRecettes");
  recettesSection.innerHTML = ""; // On vide la section des recettes
  recettes.sort((a, b) => a.name.localeCompare(b.name));
  
  const promises = recettes.map((recette) => {
    const userCardDOM = new Recette(recette);
    return userCardDOM.article; // on retourne l'article créé
  });
  Promise.all(promises).then((articles) => {
    // résolution promesses de création de cartes
    articles.forEach((article) => {
      recettesSection.appendChild(article);
    });
  });
}

async function ingredientsData(recettes) {
  const ingredientsSection = document.querySelector(".boxIngredients");
  ingredientsSection.innerHTML = ""; // On vide la section des ingrédients

  // Création d'un tableau avec tous les ingrédients de toutes les recettes
  const ingredients = [];
  for (const recette of recettes) {
    ingredients.push(...recette.ingredients);
  }

  // Création d'un seul objet Ingredient avec tous les ingrédients
  const allIngredients = new Ingredient({ id: "all", ingredients });

  // Ajout de l'article de l'objet Ingredient au DOM
  ingredientsSection.appendChild(allIngredients.article);
}

async function appareilsData(recettes) {
  const appareilsSection = document.querySelector(".boxAppareils");
  appareilsSection.innerHTML = ""; // On vide la section des appareils

  const appareils = recettes.reduce((acc, recette) => {
    return acc.concat(recette.appliance);
  }, []);

  const promises = [new Appareil({ id: "appliance", appliance: appareils })];
  Promise.all(promises).then((articles) => {
    articles.forEach((article) => {
      appareilsSection.appendChild(article.article);
    });
  });
}

async function ustencilesData(recettes) {
  const ustensilesSection = document.querySelector(".boxUstenciles");
  ustensilesSection.innerHTML = ""; // On vide la section des ustensiles

  const ustensils = recettes.reduce((acc, recette) => {
    return acc.concat(recette.ustensils);
  }, []);
  
  const promises = [new Ustencile({ id: "ustensiles", ustensils })];
  Promise.all(promises).then((articles) => {
    // résolution promesses de création d'articles
    articles.forEach((article) => {
      ustensilesSection.appendChild(article.article);
    });
  });
}

// init
async function init() {
  const { recettes } = await getRecettes(); // récupère les datas des photographes
  recettesData(recettes);
  ingredientsData(recettes);
  appareilsData(recettes);
  ustencilesData(recettes);

  document.querySelector(".rechercheInput").addEventListener("input", () => {
    rechercheRecettes(recettes);
  });

}

init();