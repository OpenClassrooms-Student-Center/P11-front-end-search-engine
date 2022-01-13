import { tagDetails } from './filterTag'

const recipeUstensile = document.getElementById('recipeUstensile');

const renderUstensils = (ustensils) => {
    recipeUstensile.innerHTML = ""; // vide le contenue de la div result
    ustensils.forEach((ustensil) => {
        const newDivUstensil = document.createElement("button");
        newDivUstensil.innerText = `${ustensil}`;
        newDivUstensil.className = `filter__position-label`;
        newDivUstensil.name = "ustensilButton"
        newDivUstensil.onclick = () => tagDetails(ustensil, 'ustensil');
        recipeUstensile.appendChild(newDivUstensil);
    })
    
}



export default renderUstensils;
