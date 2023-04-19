class Ingredient {
  constructor(data) {
    this.id = data.id;
    this.ingredients = data.ingredients;
    this.article = this.create();
  }

  create() {
    // Création d'un élément ul pour la liste d'ingrédients
    const ul = document.createElement("ul");

    // Tri des ingrédients par ordre alphabétique en ignorant la casse et en enlevant les espaces inutiles
    const sortedIngredients = this.ingredients
      .map((ingredient) => ingredient.ingredient.toLowerCase().trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    // Ajout d'un élément li pour chaque ingrédient dans la liste triée
    sortedIngredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.setAttribute("class", "choixIngredients");
      li.textContent = ingredient;
      ul.appendChild(li);
    });

    // Retourne la liste des ingrédients triés
    return ul;
  }
}
