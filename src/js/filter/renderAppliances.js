const recipeAppliance = document.getElementById('recipeAppliance')


console.log("======APPLIANCES======")
/*
TODO
 */

const renderAppliances = (recipe) => {
    recipeAppliance.innerHTML = ""; // vide le contenue de la div result
    const newDivAppliance = document.createElement("button");
    newDivAppliance.innerText = recipe.appliance;
    newDivAppliance.className = `filter__position-label`;
    newDivAppliance.name = "applianceButton"
    newDivAppliance.onclick = () => tagDetails(appliance);
    recipeAppliance.appendChild(newDivAppliance);

}


export default renderAppliances;
