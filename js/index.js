// recuperation de la data
async function getRecettes() {
  return fetch("data/recettes.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

async function recettesData(recettes) {
  const recettesSection = document.querySelector(".boxRecettes");
  recettes.sort((a, b) => a.name.localeCompare(b.name));
  const promises = recettes.map((recette) => {
    // eslint-disable-next-line no-undef
    const userCardDOM = new Recette(recette);
    return userCardDOM.article; // on retourne l'article créé
  });
  const articles = await Promise.all(promises); // résolution promesses de création de cartes
  articles.forEach((article) => {
    recettesSection.appendChild(article);
  });
}

async function ingredientsData(recettes) {
  const ingredientsSection = document.querySelector(".boxIngredients");
  const ingredients = new Set(); // Création d'un ensemble pour stocker les ingrédients uniques
  recettes.forEach((recette) => {
    recette.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient); // Ajout de l'ingrédient à l'ensemble
    });
  });

  const unique_ingredients = Array.from(ingredients).sort(); // Conversion de l'ensemble en tableau

  // Création d'un élément ul pour la liste d'ingrédients
  const ul = document.createElement("ul");

  // Ajout d'un élément li pour chaque ingrédient dans la liste unique
  unique_ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.setAttribute("class", "choixIngredients");
    li.textContent = ingredient;
    ul.appendChild(li);
  });

  // Ajout de la liste à la section des ingrédients
  ingredientsSection.appendChild(ul);
}

async function appareilsData(recettes) {
  const appareilsSection = document.querySelector(".boxAppareils");
  const appareils = recettes.flatMap((recette) => recette.appliance);

  const unique_appareil = Array.from(new Set(appareils)).sort(); // Conversion de l'ensemble en tableau

  // Création d'un élément ul pour la liste d'ingrédients
  const ul = document.createElement("ul");

  // Ajout d'un élément li pour chaque ingrédient dans la liste unique
  unique_appareil.forEach((appareil) => {
    const li = document.createElement("li");
    li.setAttribute("class", "choixAppareils");
    li.textContent = appareil;
    ul.appendChild(li);
  });

  // Ajout de la liste à la section des ingrédients
  appareilsSection.appendChild(ul);
}

async function ustencilesData(recettes) {
  const ustencilesSection = document.querySelector(".boxUstenciles");
  const ustenciles = recettes.flatMap((recette) => recette.ustensils);

  const unique_ustencile = Array.from(new Set(ustenciles)).sort(); // Conversion de l'ensemble en tableau

  // Création d'un élément ul pour la liste d'ingrédients
  const ul = document.createElement("ul");

  // Ajout d'un élément li pour chaque ingrédient dans la liste unique
  unique_ustencile.forEach((ustencile) => {
    const li = document.createElement("li");
    li.setAttribute("class", "choixUstenciles");
    li.textContent = ustencile;
    ul.appendChild(li);
  });

  // Ajout de la liste à la section des ingrédients
  ustencilesSection.appendChild(ul);
}

// init
async function init() {
  const { recettes } = await getRecettes(); // récupère les datas des photographes
  recettesData(recettes);
  ingredientsData(recettes);
  appareilsData(recettes);
  ustencilesData(recettes);

  const boutonIngredients = document.querySelector(".filtreIngredient");
  const filtreIngredients = document.querySelector(".sectionIngredient");
  const fermeFiltreIngredient = document.querySelector(".chevronIngredient");
  boutonIngredients.addEventListener("click", (event) => {
    // Empêche la propagation de l'événement de clic vers le document
    event.stopPropagation();

    boutonIngredients.style.display = "none";
    filtreIngredients.style.display = "block";
    boutonAppareils.style.display = "flex";
    filtreAppareils.style.display = "none";
    boutonUstenciles.style.display = "flex";
    filtreUstenciles.style.display = "none";
    filtreIngredients.querySelector(".input").focus();
  });

  fermeFiltreIngredient.addEventListener("click", () => {
    boutonIngredients.style.display = "flex";
    filtreIngredients.style.display = "none";
  });

  document.addEventListener("click", (event) => {
    // Vérifie si l'élément cliqué est à l'intérieur de la boîte
    const isClickInside = filtreIngredients.contains(event.target);
    // Si l'élément cliqué est à l'extérieur de la boîte, fermez-la
    if (!isClickInside) {
      boutonIngredients.style.display = "flex";
      filtreIngredients.style.display = "none";
    }
  });

  const boutonAppareils = document.querySelector(".filtreAppareils");
  const filtreAppareils = document.querySelector(".sectionAppareils");
  const fermeFiltreAppareils = document.querySelector(".chevronAppareils");

  boutonAppareils.addEventListener("click", (event) => {
    // Empêche la propagation de l'événement de clic vers le document
    event.stopPropagation();

    boutonAppareils.style.display = "none";
    filtreAppareils.style.display = "block";
    boutonIngredients.style.display = "flex";
    filtreIngredients.style.display = "none";
    boutonUstenciles.style.display = "flex";
    filtreUstenciles.style.display = "none";
    filtreAppareils.querySelector(".input").focus();
  });

  fermeFiltreAppareils.addEventListener("click", () => {
    boutonAppareils.style.display = "flex";
    filtreAppareils.style.display = "none";
  });

  document.addEventListener("click", (event) => {
    // Vérifie si l'élément cliqué est à l'intérieur de la boîte
    const isClickInside = filtreAppareils.contains(event.target);
    // Si l'élément cliqué est à l'extérieur de la boîte, fermez-la
    if (!isClickInside) {
      boutonAppareils.style.display = "flex";
      filtreAppareils.style.display = "none";
    }
  });

  const boutonUstenciles = document.querySelector(".filtreUstenciles");
  const filtreUstenciles = document.querySelector(".sectionUstenciles");
  const fermeFiltreUstenciles = document.querySelector(".chevronUstenciles");

  boutonUstenciles.addEventListener("click", (event) => {
    // Empêche la propagation de l'événement de clic vers le document
    event.stopPropagation();

    boutonUstenciles.style.display = "none";
    filtreUstenciles.style.display = "block";
    boutonIngredients.style.display = "flex";
    filtreIngredients.style.display = "none";
    boutonAppareils.style.display = "flex";
    filtreAppareils.style.display = "none";
    filtreUstenciles.querySelector(".input").focus();
  });

  fermeFiltreUstenciles.addEventListener("click", () => {
    boutonUstenciles.style.display = "flex";
    filtreUstenciles.style.display = "none";
  });

  document.addEventListener("click", (event) => {
    // Vérifie si l'élément cliqué est à l'intérieur de la boîte
    const isClickInside = filtreUstenciles.contains(event.target);
    // Si l'élément cliqué est à l'extérieur de la boîte, fermez-la
    if (!isClickInside) {
      boutonUstenciles.style.display = "flex";
      filtreUstenciles.style.display = "none";
    }
  });
}

init();
