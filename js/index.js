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

async function ingredientsData(ingredients, onclicked) {
  const ingredientsSection = document.querySelector(".boxIngredients");
  ingredientsSection.innerHTML = ""; // On vide la section des ingrédients

  // Création d'un seul objet Ingredient avec tous les ingrédients
  const allIngredients = new ListeIngredients({ id: "all", ingredients }, onclicked);

  // Ajout de l'article de l'objet Ingredient au DOM
  ingredientsSection.appendChild(allIngredients.article);
}

async function appareilsData(appareils, onclicked) {
  const appareilsSection = document.querySelector(".boxAppareils");
  appareilsSection.innerHTML = ""; // On vide la section des appareils

  const promises = [new ListeAppareils({ id: "appliance", appliance: appareils }, onclicked)];
  Promise.all(promises).then((articles) => {
    articles.forEach((article) => {
      appareilsSection.appendChild(article.article);
    });
  });
}

async function ustensilesData(ustensils, onclicked) {
  const ustensilesSection = document.querySelector(".boxUstensiles");
  ustensilesSection.innerHTML = ""; // On vide la section des ustensiles

  const promises = [new ListeUstensiles({ id: "ustensiles", ustensils }, onclicked)];
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
    // Création d'un tableau avec tous les ingrédients de toutes les recettes
  const ingredients = recettes.reduce((resultats, recette) => [...resultats, ...recette.ingredients], []);
  const appareils = recettes.reduce((resultats, recette) => [...resultats, recette.appliance], []);
  const ustensiles = recettes.reduce((resultats, recette) => [...resultats, ...recette.ustensils], []);

  recettesData(recettes);
  rechercheIngredients(ingredients, (ingredient) => creaTagsIngredient(ingredient, recettes));
  rechercheAppareils(appareils, (appareil) => creaTagsAppareil(appareil, recettes));
  rechercheUstensiles(ustensiles, (ustensile) => creaTagsUstensile(ustensile, recettes));

  document.querySelector(".rechercheInput").addEventListener("input", () => {
    rechercheInput(recettes);
  });

  document.querySelector(".rechercheIngredients").addEventListener("input", () => {
    rechercheIngredients(ingredients, (ingredient) => creaTagsIngredient(ingredient, recettes));
  });

  document.querySelector(".rechercheAppareils").addEventListener("input", () => {
    rechercheAppareils(appareils, (appareil) => creaTagsAppareil(appareil, recettes));
  });

  document.querySelector(".rechercheUstensiles").addEventListener("input", () => {
    rechercheUstensiles(ustensiles, (ustensile) => creaTagsUstensile(ustensile, recettes));
  });

}

init();