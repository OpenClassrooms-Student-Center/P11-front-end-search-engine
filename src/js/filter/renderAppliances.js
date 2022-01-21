import { tagDetails } from './filterTag'
const recipeAppliance = document.getElementById('recipeAppliance')

const renderAppliances = (appliances) => {
    recipeAppliance.innerHTML = ""; // vide le contenue de la div result
    appliances.forEach((appliance) => {
        const newDivAppliance = document.createElement("button");
        newDivAppliance.innerText = appliance;
        newDivAppliance.className = `filter__position-label`;
        newDivAppliance.name = "applianceButton"
        newDivAppliance.onclick = () => tagDetails(appliance, `appliance`);
        recipeAppliance.appendChild(newDivAppliance);
    })
}


export default renderAppliances;
