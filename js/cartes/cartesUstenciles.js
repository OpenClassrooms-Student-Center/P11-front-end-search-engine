class Ustencile {
    constructor(data) {
      this.id = data.id;
      this.ustensils = data.ustensils;
      this.article = this.create();
    }
  
    create() {
      // Création d'un élément ul pour la liste d'ustensiles
      const ul = document.createElement("ul");
  
      // Tri des ustensiles par ordre alphabétique en ignorant la casse et en enlevant les espaces inutiles
      const sortedUstensils = this.ustensils
        .map((ustensil) => ustensil.toLowerCase().trim())
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
  
      // Ajout d'un élément li pour chaque ustensile dans la liste triée
      sortedUstensils.forEach((ustensil) => {
        const li = document.createElement("li");
        li.setAttribute("class", "choixUstenciles");
        li.textContent = ustensil;
        ul.appendChild(li);
      });
  
      // Retourne la liste des ustensiles triés
      return ul;
    }
  }