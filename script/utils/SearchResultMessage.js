export class SearchResultMessage {
  constructor(recipesList) {
    this.recipesList = recipesList;
    this.displayMessage(recipesList);
  }
  

  displayMessage() {
    const messageAside = document.getElementById("message");
    const messageSpan = document.querySelector("#message span");

    messageAside.classList.remove("opened");
  

    let message;
    const recipesQuantity = this.recipesList.length;

    if (recipesQuantity === 0) {
      message =
        'Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';

      messageAside.classList.remove("result-message--info");
      messageAside.classList.add("result-message--warning");
    } else {
      message = `${recipesQuantity} recette${
        recipesQuantity > 1 ? "s" : ""
      } correspond${recipesQuantity > 1 ? "ent" : ""} à votre recherche.`;

      messageAside.classList.remove("result-message--warning");
      messageAside.classList.add("result-message--info");
    }

    messageSpan.textContent = message;

    messageAside.classList.add("opened");

    this.closeMessageEvent();
  }

  /**
   * Close message when clicking on close icon.
   */
  closeMessageEvent() {
    const messageAside = document.getElementById("message");
    const messageCloseIcon = document.querySelector("#message i");

    messageCloseIcon.onclick = () => {
      messageAside.classList.remove("opened");
    };
  }
}