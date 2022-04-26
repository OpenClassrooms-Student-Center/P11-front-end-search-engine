export class Recipe {
  constructor(data) {
    this.appliance = data.appliance;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.ingredient = data.ingredient;
    this.quantity = data.quantity;
    this.name = data.name;
    this.serving = data.serving;
    this.time = data.time;
    this.ustensils = data.ustensils;
    this.id = data.id;
    this.terms = new Set();
  }

  createRecipesCard() {
    let ingredientHtml = "";

    this.ingredients.forEach((ingr) => {
      if (ingr.quantity) {
        if (ingr.unit && ingr.quantity) {
          ingredientHtml += `<div><span class="ingredient ingr_bold" data-id="${ingr.ingredient}">${ingr.ingredient}<span class="quantite"> : ${ingr.quantity} ${ingr.unit}</div>`;
        } else {
          ingredientHtml += `<div><span class="ingredient ingr_bold" data-id="${ingr.ingredient}">${ingr.ingredient}<span class="quantite"> : ${ingr.quantity}</div>`;
        }
      } else {
        ingredientHtml += `<div><span class="ingredient ingr_bold" data-id="${ingr.ingredient}">${ingr.ingredient}<span class="quantite"></div>`;
      }
    });

    //creation of de article for recipes
    const article = document.createElement("article");
    const contentCard = `
         <article class="article" id=${this.id} tabindex="0">
           <div class="article_img"></div>
           <div class="article-all">
              <div class="title">
                   <div class="title-txt">${this.name}</div>
                  <div class="title-time"><i class="far fa-clock"></i> ${this.time}<span>min</span></div>
              </div>
               <div class="details">
                  <div class="details-ing">${ingredientHtml}</div>
                  <div class="details-txt">${this.description}</div>
              </div>
           </div>
         </article>`;
    article.innerHTML = contentCard;
    return article;
  }

  //filtre of the tag
  hasIngredient(ingredient) {
    let exists = false;
    this.ingredients.forEach((ing) => {
      if (ing.ingredient === ingredient) {
        exists = true;
      }
    });
    return exists;
  }
}
