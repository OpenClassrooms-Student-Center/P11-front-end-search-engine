import { tagDetails } from './filterTag'
const recipeAppliance = document.getElementById('recipeAppliance')

const renderAppliances = (recipes) => {
    recipeAppliance.innerHTML = ""; // vide le contenue de la div result
    recipes.forEach((recipe) => {
        const newDivAppliance = document.createElement("button");
        newDivAppliance.innerText = recipe.appliance;
        newDivAppliance.className = `filter__position-label`;
        newDivAppliance.name = "applianceButton"
        newDivAppliance.onclick = () => tagDetails(recipe.appliance, `appliance`);
        recipeAppliance.appendChild(newDivAppliance);
        
    })
}


export default renderAppliances;
