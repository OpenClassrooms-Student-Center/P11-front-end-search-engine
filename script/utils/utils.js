import CardRecipesFactory from "../Factory/CardRecipesFactory.js";
import SearchDropDown from "../SearchDropDown.js";
export function normalizeString(string) {
  const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
  const spaceRegex = new RegExp(/\s/, "g");
  return string
    .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
    .replace(diacriticRegex, "") // remove diacritics
    .toLowerCase()
    .replace(spaceRegex, ""); // remove all spaces
}

export function closeAllFilter() {
  document.querySelector("body").addEventListener("click", () => {
    document.querySelector(`.ingredients`).classList.remove("expanded");
    document.querySelector(`.appliances`).classList.remove("expanded");
    document.querySelector(`.ustensils`).classList.remove("expanded");
  });
}

export function removeListItem(types) {
  document.querySelector(`.dropdown-list-${types}`).innerHTML = "";
}

export function updatePage(listRecipes) {
  const viewCard = new CardRecipesFactory(listRecipes);
  viewCard.Recipes();
  const dropdowningre = new SearchDropDown(listRecipes);
  dropdowningre.displayItem("ingredients", listRecipes);
  const dropdownappl = new SearchDropDown(listRecipes);
  dropdownappl.displayItem("appliances", listRecipes);
  const dropdownusten = new SearchDropDown(listRecipes);
  dropdownusten.displayItem("ustensils", listRecipes);
}

export function toggle(type) {
  switch (type) {
    case "ingredients":
      console.log("ouvert");
      document.querySelector(`.${type}`).classList.toggle("expanded");
      document.querySelector(`.appliances`).classList.remove("expanded");
      document.querySelector(`.ustensils`).classList.remove("expanded");
      if (document.querySelector(`.${type}`).classList.contains("expanded")) {
        document.querySelector(`#search-ingredients`).placeholder =
          "Rechercher un ingredient";
      } else {
        document.querySelector(`.${type}`).classList.remove("expanded");
        document.querySelector(`#search-ingredients`).placeholder =
          "Ingrédients";
      }

      break;
    case "appliances":
      document.querySelector(`.${type}`).classList.toggle("expanded");
      document.querySelector(`.ingredients`).classList.remove("expanded");
      document.querySelector(`.ustensils`).classList.remove("expanded");
      if (document.querySelector(`.${type}`).classList.contains("expanded")) {
        document.querySelector(`#search-appliances`).placeholder =
          "Rechercher un appareil";
      } else {
        document.querySelector(`.${type}`).classList.remove("expanded");
        document.querySelector(`#search-appliances`).placeholder = "Appareils";
      }

      break;
    case "ustensils":
      document.querySelector(`.${type}`).classList.toggle("expanded");
      document.querySelector(`.appliances`).classList.remove("expanded");
      document.querySelector(`.ingredients`).classList.remove("expanded");

      if (document.querySelector(`.${type}`).classList.contains("expanded")) {
        document.querySelector(`#search-ustensils`).placeholder =
          "Rechercher un ustensile";
      } else {
        document.querySelector(`.${type}`).classList.remove("expanded");
        document.querySelector(`#search-ustensils`).placeholder = "Ustensiles";
      }
      break;
    default:
      document.querySelector(`.${type}`).classList.remove("expanded");
      break;
  }
}
