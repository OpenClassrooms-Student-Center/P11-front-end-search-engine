export class ListOfFiltre {
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

  createListIngredients() {
    const item = document.createElement("article");
    const itemsCard = `<article class="listIngredients" id=${this.id} tabindex="0">
    <ul>
       <li class="ingredient-tag">${this.ingredient}</li>
       </ul>
  </article>`;
    article.innerHTML = contentCard;
    console.log("article");
    return article;
  }
}
