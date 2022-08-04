export function normalizeString(string) {
    const diacriticRegex = new RegExp(/\p{Diacritic}/, "gu");
    const spaceRegex = new RegExp(/\s/, "g");
    return string
      .normalize("NFD") // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
      .replace(diacriticRegex, "") // remove diacritics
      .toLowerCase()
      .replace(spaceRegex, ""); // remove all spaces
  }

export function closeAllFilter(){
    document.querySelector('body').addEventListener("click", ()=>{ 
    document.querySelector(`.ingredients`).classList.remove("expanded");
    document.querySelector(`.appliances`).classList.remove("expanded");
    document.querySelector(`.ustensils`).classList.remove("expanded");
  })
}

export function removeListItem(types) {
    document.querySelector(`.dropdown-list-${types}`).innerHTML = "";
  }

export function toggle(type) {
    switch (type) {
      case "ingredients":
        console.log("ouvert")
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.appliances`).classList.remove("expanded");
        document.querySelector(`.ustensils`).classList.remove("expanded");
        break;
      case "appliances":
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.ingredients`).classList.remove("expanded");
        document.querySelector(`.ustensils`).classList.remove("expanded");
        break;
      case "ustensils":
        document.querySelector(`.${type}`).classList.toggle("expanded");
        document.querySelector(`.appliances`).classList.remove("expanded");
        document.querySelector(`.ingredients`).classList.remove("expanded");
        break;
      default:
       document.querySelector(`.${type}`).classList.remove("expanded");
        break;
    }
  }