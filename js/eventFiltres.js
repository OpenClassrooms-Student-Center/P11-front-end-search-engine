const sectionFiltres = document.querySelectorAll(".sectionFiltres");
const sectionFiltresArray = Array.from(sectionFiltres);
const titreFiltres = document.querySelectorAll(".tagInput");
const fermeFiltres = document.querySelectorAll(".fa-chevron-down");
const originalValues = [];
let currentBox = null;

// Stocker les valeurs d'origine dans un tableau
titreFiltres.forEach((input) => {
  originalValues.push(input.value);
});

sectionFiltres.forEach((element) => {
  element.addEventListener("click", () => {
    // Vérifier si une boîte est déjà ouverte
    if (currentBox !== null) {
      // Fermer la boîte précédente en réappliquant la classe "tailleMini" et en réinitialisant la valeur de l'entrée
      currentBox.classList.add("tailleMini");
      const input = currentBox.querySelector(".tagInput");
      input.value = originalValues[sectionFiltresArray.indexOf(currentBox)];
    }
    // Ouvrir la boîte cliquée en supprimant la classe "tailleMini" et en vidant l'entrée
    element.classList.remove("tailleMini");
    const tagInput = element.querySelector(".tagInput");
    tagInput.value = "";
    // Définir la variable currentBox sur la boîte actuellement ouverte
    currentBox = element;
  });
});

document.addEventListener("click", (event) => {
  // Vérifier si le clic a été effectué à l'extérieur de la boîte actuellement ouverte
  if (currentBox !== null && !currentBox.contains(event.target)) {
    // Fermer la boîte en réappliquant la classe "tailleMini" et en réinitialisant la valeur de l'entrée
    currentBox.classList.add("tailleMini");
    const input = currentBox.querySelector(".tagInput");
    input.value = originalValues[sectionFiltresArray.indexOf(currentBox)];
    // Définir la variable currentBox sur nulle
    currentBox = null;
  }
});
