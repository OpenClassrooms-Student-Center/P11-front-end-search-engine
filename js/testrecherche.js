async function rechercheRecettes2(recettes) {
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
  
      recettesData(recettesFiltrees);
      ingredientsData(recettesFiltrees);
      appareilsData(recettesFiltrees);
      ustencilesData(recettesFiltrees);
  
      const ingredients = [...new Set(recettesFiltrees.flatMap((recette) => recette.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())))].sort();
      ajouterTags(".choixIngredients", ingredients);
  
      const appareils = [...new Set(recettesFiltrees.flatMap((recette) => recette.appliance.toLowerCase()))].sort();
      ajouterTags(".choixAppareils", appareils);
  
      const ustensiles = [...new Set(recettesFiltrees.flatMap((recette) => recette.ustensils.map((ustensile) => ustensile.toLowerCase())))].sort();
      ajouterTags(".choixUstenciles", ustensiles);
    }
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