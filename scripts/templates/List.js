class List {
  constructor() {
    this.all = [];
    this.ingredients = [];
    this.ingredientsSelected = [];
    this.appliances = [];
    this.applianceSelected = [];
    this.ustensils = [];
    this.ustensilsSelected = [];
    this.alltagsSelected = [];
    this.search = " ";
  }

  //COLLECTER ET AFFICHER LES RECETTES

  add(recipe) {
    list.all.push(recipe);
  }
  displayRecipes() {
    let html = "";

    for (let i = 0; i < this.filtered.length; i++) {
      let recipe = new Recipe(this.filtered[i]);
      html += recipe.render();
    }
    document.querySelector("main").innerHTML = html;
  }

  /*   FILTRES SUR LES LISTES DANS LE DROPDOWN   */

  //INGREDIENTS

  //collecter et afficher
  collectIngredients() {
    this.filtered.forEach((recipe) => {
      recipe.ingredients.forEach((ingr) => {
        this.ingredients.push(ingr.ingredient);
      });
    });
  }

  displayIngredients(ingredients) {
    ingredients = sortSet(ingredients);

    let html = "";

    ingredients.forEach((ingr) => {
      html += `<a href="#" class="ingredient-tag" id="${normaliseName(
        ingr
      )}" data-name="${ingr}">${ingr}</a>`;
    });
    document.getElementById("drop-ingredients_open").innerHTML = html;
  }

  //filtrer sur la liste des ingrédients
  listenForFilteringIng() {
    document.querySelectorAll(".ingredient-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        //console.log("on a cliqué sur " + e.target.getAttribute("data-name"));
        let tagId = e.target.getAttribute("id");
        let tagName = e.target.getAttribute("data-name");
        this.ingredientsSelected.push({
          id: tagId,
          name: tagName,
        });

        //console.log(this.ingredientsSelected);

        this.filterByIng();
        this.displayRecipes();
        this.diplayIngredientTag();

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);

        this.listenForFilteringIng();
        this.listenForFilteringAppl();
        this.listenForFilteringUst();
        this.listenForFilteringAll();

        this.disableAllSelectedTag();

        this.closeTags();

        closeAll();
        document.getElementById("search-drop_ing").value = "";
      });
    });
  }
  filterByIng() {
    this.filtered = this.filtered.filter((recipe) => {
      let count = 0;

      this.ingredientsSelected.forEach((objIngredient) => {
        if (recipe.hasIngredient(objIngredient.name)) {
          count++;
        }
      });
      if (count == this.ingredientsSelected.length) {
        return true;
      }
      return false;
    });

    //console.log(this.filtered);
  }

  //réupérer les ingrédients restants dans les recettes sélectionnées afin de ne plus afficher que ceux-ci dans la liste
  listAvailableIngredients() {
    let list = new Set();
    this.filtered.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        list.add(item.ingredient);
      });
    });
    return list;
  }

  //afficher les tags au dessus du drop
  diplayIngredientTag() {
    let html = "";
    for (let i = 0; i < this.ingredientsSelected.length; i++) {
      let ingSelected = this.ingredientsSelected[i];
      html += `<span class="tagIngr tagsSelection" data-name="${ingSelected.name}" data-id="${ingSelected.id}">${ingSelected.name}  <i class="far fa-times-circle"></i></span>`;
    }
    document.querySelector(".tagsIngr").innerHTML = html;
  }

  //APPLIANCE

  //collecter et afficher

  collectAppliances() {
    this.filtered.forEach((recipe) => {
      this.appliances.push(recipe.appliance);
    });
  }
  displayAppliances(appliances) {
    appliances = sortSet(appliances);
    let html = "";

    appliances.forEach((appl) => {
      html += `<a href="#" class="appareil-tag" id="${normaliseName(
        appl
      )}"  data-name="${appl}">${appl}</a>`;
    });
    document.getElementById("drop-appareil_open").innerHTML = html;
  }

  //filtrer sur la liste des appareils
  listenForFilteringAppl() {
    document.querySelectorAll(".appareil-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        //console.log("on a cliqué sur " + e.target.getAttribute("data-name"));
        let tagId = e.target.getAttribute("id");
        let tagName = e.target.getAttribute("data-name");
        this.applianceSelected.push({
          id: tagId,
          name: tagName,
        });

        //console.log(this.applianceSelected);

        this.filterByAppl();
        this.displayRecipes();
        this.diplayApplianceTag();

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);

        this.listenForFilteringAppl();
        this.listenForFilteringIng();
        this.listenForFilteringUst();
        this.listenForFilteringAll();

        this.disableAllSelectedTag();
        this.closeTags();

        closeAll();
        document.getElementById("search-drop_app").value = "";
      });
    });
  }
  filterByAppl() {
    this.filtered = this.filtered.filter((recipe) => {
      let count = 0;
      this.applianceSelected.forEach((objAppliance) => {
        if (recipe.hasAppliance(objAppliance.name)) {
          count++;
        }
      });
      if (count == this.applianceSelected.length) {
        return true;
      }
      return false;
    });

    //console.log(this.filtered);
  }

  //réupérer les appareils restants dans les recettes sélectionnées afin de ne plus afficher que ceux-ci dans la liste
  listAvailableAppliances() {
    let list = new Set();
    this.filtered.forEach((recipe) => {
      list.add(recipe.appliance);
    });
    return list;
  }

  //afficher les tags au dessus du drop
  diplayApplianceTag() {
    let html = "";
    for (let i = 0; i < this.applianceSelected.length; i++) {
      let appSelected = this.applianceSelected[i];
      html += `<span class="tagAppl tagsSelection" data-name="${appSelected.name}" data-id="${appSelected.id}"> ${appSelected.name} <i class="far fa-times-circle"></i></span>`;
    }
    document.querySelector(".tagsAppl").innerHTML = html;
  }

  //USTENSILS

  //collecter et afficher
  collectUstensils() {
    this.filtered.forEach((recipe) => {
      recipe.ustensils.forEach((ust) => {
        this.ustensils.push(ust);
      });
    });
  }

  displayUstensils(ustensils) {
    ustensils = sortSet(ustensils);
    let html = "";

    ustensils.forEach((ust) => {
      html += `<a href="#" class="ustensile-tag" id="${normaliseName(
        ust
      )}b" data-name="${ust}">${ust}</a>`;
    });
    document.getElementById("drop-ustensiles_open").innerHTML = html;
  }

  //filtrer sur la liste des ustensiles
  listenForFilteringUst() {
    document.querySelectorAll(".ustensile-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        //console.log("on a cliqué sur " + e.target.getAttribute("data-name"));
        let tagId = e.target.getAttribute("id");
        let tagName = e.target.getAttribute("data-name");
        this.ustensilsSelected.push({
          id: tagId,
          name: tagName,
        });

        //console.log(this.ustensilsSelected);

        this.filterByUst();
        this.displayRecipes();
        this.displayUstensilsTag();

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.listenForFilteringUst();
        this.listenForFilteringIng();
        this.listenForFilteringAppl();
        this.listenForFilteringAll();

        this.disableAllSelectedTag();
        this.closeTags();

        closeAll();
        document.getElementById("search-drop_ust").value = "";
      });
    });
  }
  filterByUst() {
    this.filtered = this.filtered.filter((recipe) => {
      let count = 0;
      this.ustensilsSelected.forEach((objUstensils) => {
        if (recipe.hasUstensil(objUstensils.name)) {
          count++;
        }
      });
      if (count == this.ustensilsSelected.length) {
        return true;
      }
      return false;
    });

    //console.log(this.filtered);
  }

  //réupérer les ustensils restants dans les recettes sélectionnées afin de ne plus afficher que ceux-ci dans la liste
  listAvailableUstensils() {
    let list = new Set();
    this.filtered.forEach((recipe) => {
      recipe.ustensils.forEach((ust) => {
        list.add(ust);
      });
    });
    return list;
  }

  //afficher ou supprimer les tags au dessus du drop
  displayUstensilsTag() {
    let html = "";
    for (let i = 0; i < this.ustensilsSelected.length; i++) {
      let ustSelected = this.ustensilsSelected[i];
      html += `<span class="tagUst tagsSelection" data-name="${ustSelected.name}" data-id="${ustSelected.id}">${ustSelected.name} <i class="cross-ust far fa-times-circle"></i></span>`;
    }
    document.querySelector(".tagsUst").innerHTML = html;
  }

  //supprimer tags au dessus des drops
  closeTags() {
    document.querySelectorAll(".fa-times-circle").forEach((cross) => {
      cross.addEventListener("click", (e) => {
        e.target.parentNode.style.display = "none";
        let dataName = e.target.parentNode.getAttribute("data-name");
        let dataId = e.target.parentNode.getAttribute("data-id");
        //console.log(dataName);
        if (e.target.parentNode.classList.contains("tagIngr")) {
          for (let i = 0; i < this.ingredientsSelected.length; i++) {
            if (this.ingredientsSelected[i].name == dataName) {
              this.ingredientsSelected.splice(i, 1);
              this.alltagsSelected = this.ingredientsSelected.concat(
                this.ustensilsSelected,
                this.applianceSelected
              );

              document.getElementById(dataId).classList.remove("select");
              //console.log(this.ingredientsSelected);
            }
          }
        } else if (e.target.parentNode.classList.contains("tagAppl")) {
          for (let i = 0; i < this.applianceSelected.length; i++) {
            if (this.applianceSelected[i].name == dataName) {
              this.applianceSelected.splice(i, 1);
              this.alltagsSelected = this.ingredientsSelected.concat(
                this.ustensilsSelected,
                this.applianceSelected
              );
              document.getElementById(dataId).classList.remove("select");
            }
          }
        } else {
          for (let i = 0; i < this.ustensilsSelected.length; i++) {
            if (this.ustensilsSelected[i].name == dataName) {
              this.ustensilsSelected.splice(i, 1);
              this.alltagsSelected = this.ingredientsSelected.concat(
                this.ustensilsSelected,
                this.applianceSelected
              );
              document.getElementById(dataId).classList.remove("select");
            }
          }
        }

        //console.log(e.target.parentNode);
        /*this.displayRecipes();.log(
            "tagsselSEL",
            this.alltagsSelected,
            this.ingredientsSelected,
            this.applianceSelected,
            this.ustensilsSelected
          );*/

        this.filtered = this.all;
        this.filterByIng();
        this.filterByUst();
        this.filterByAppl();

        this.filterByAll(this.filtered);

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);
        this.displayRecipes();
        this.disableAllSelectedTag();

        this.listenForFilteringIng();
        this.listenForFilteringUst();
        this.listenForFilteringAppl();
      });
    });
  }

  //changer l'affichage des ingrédients sélectionnés
  disableAllSelectedTag() {
    this.alltagsSelected = this.ingredientsSelected.concat(
      this.ustensilsSelected,
      this.applianceSelected
    );
    for (let i = 0; i < this.alltagsSelected.length; i++) {
      let tagIId = this.alltagsSelected[i].id;

      document.getElementById(tagIId).classList.add("select");
    }
    //console.log("tagssel", this.alltagsSelected);
  }

  /*   BARRE DE RECHERCHE PRINCIPALE  */

  listenForFilteringAll() {
    let mainInput = document.querySelector(".search-all");

    mainInput.addEventListener("input", (e) => {
      let hasNewCharacters = !!(this.search.length <= e.target.value.length);
      this.search = normalise(e.target.value);
      let items = this.all;
      this.filterByIng();
      this.filterByUst();
      this.filterByAppl();

      this.listenForFilteringIng();
      this.listenForFilteringUst();
      this.listenForFilteringAppl();

      if (hasNewCharacters) {
        items = this.filtered;
      }

      if (this.search.length > 2) {
        this.filterByAll(items);
        this.displayRecipes();

        this.filterByIng();
        this.filterByUst();
        this.filterByAppl();

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.listenForFilteringAppl();
        this.listenForFilteringIng();
        this.listenForFilteringUst();
        if (this.filtered.length == 0) {
          document.getElementById("filtered-empty").style.display = "block";
        } else {
          this.disableAllSelectedTag();
          document.getElementById("filtered-empty").style.display = "none";
        }
      } else {
        this.filtered = this.all;
        this.filterByIng();
        this.filterByUst();
        this.filterByAppl();

        document.getElementById("filtered-empty").style.display = "none";

        this.ustensilsAvailable = this.listAvailableUstensils();
        this.ustensilsAvailable = sortSet(this.ustensilsAvailable);
        this.displayUstensils(this.ustensilsAvailable);

        this.ingredientsAvailable = this.listAvailableIngredients();
        this.ingredientsAvailable = sortSet(this.ingredientsAvailable);
        this.displayIngredients(this.ingredientsAvailable);

        this.appliancesAvailable = this.listAvailableAppliances();
        this.appliancesAvailable = sortSet(this.appliancesAvailable);
        this.displayAppliances(this.appliancesAvailable);

        this.disableAllSelectedTag();
        this.listenForFilteringAppl();
        this.listenForFilteringIng();
        this.listenForFilteringUst();

        this.displayRecipes();
      }
    });
    this.closeTags();
  }
  filterByAll(items) {
    let t0 = performance.now();

    this.filtered = items.filter((recipe) => {
      return !!recipe.hasTerm(this.search);
    });

    let t1 = performance.now();
    console.log(
      'time to filter with ALGO 1"' + this.search + '":' + (t1 - t0) + "ms"
    );
  }

  /*   INPUT INGREDIENTS  */
  listenForFilteringInputIngr() {
    let ingredientsInputOpen = document.getElementById("ingredients");
    ingredientsInputOpen.addEventListener("click", openDropIngr);
    let ingredientsInput = document.getElementById("search-drop_ing");

    ingredientsInput.addEventListener("input", (e) => {
      this.search = normalise(e.target.value);

      console.log("inputIngrToCompare", this.search);
      this.filterByInputIngr();
    });
  }
  filterByInputIngr() {
    let ingrTag = document.querySelectorAll(".ingredient-tag");
    ingrTag.forEach((ing) => {
      ing.style.display = "block";
    });
    ingrTag.forEach((ingre) => {
      let name = normaliseForSearch(ingre.getAttribute("data-name"));

      if (!name.includes(this.search)) {
        ingre.style.display = "none";
      }
    });
  }

  /*   INPUT APPAREIL  */
  listenForFilteringInputApp() {
    let appareilInputOpen = document.getElementById("appareil");
    appareilInputOpen.addEventListener("click", openDropApp);
    let appareilInput = document.getElementById("search-drop_app");

    appareilInput.addEventListener("input", (e) => {
      this.search = normalise(e.target.value);

      console.log("inputAppToCompare", this.search);

      this.filterByInputApp();
    });
  }
  filterByInputApp() {
    let appTag = document.querySelectorAll(".appareil-tag");
    appTag.forEach((app) => {
      app.style.display = "block";
    });
    appTag.forEach((appa) => {
      let name = normaliseForSearch(appa.getAttribute("data-name"));

      if (!name.includes(this.search)) {
        appa.style.display = "none";
      }
    });
  }
  /*   INPUT USTENSILS  */
  listenForFilteringInputUst() {
    let ustensilsInputOpen = document.getElementById("ustensiles");
    ustensilsInputOpen.addEventListener("click", openDropUst);
    let ustensilsInput = document.getElementById("search-drop_ust");

    ustensilsInput.addEventListener("input", (e) => {
      this.search = normalise(e.target.value);

      console.log("inputUstToCompare", this.search);

      this.filterByInputUst();
    });
  }
  filterByInputUst() {
    let ustTag = document.querySelectorAll(".ustensile-tag");
    ustTag.forEach((ust) => {
      ust.style.display = "block";
    });
    ustTag.forEach((uste) => {
      let name = normaliseForSearch(uste.getAttribute("data-name"));

      if (!name.includes(this.search)) {
        uste.style.display = "none";
      }
    });
  }
}
