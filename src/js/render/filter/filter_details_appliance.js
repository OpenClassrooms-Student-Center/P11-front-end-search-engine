const renderFilterAppliances = (appliance) => {
    const recipeAppliance = document.getElementById('recipeAppliance')
    recipeAppliance.innerHTML = ""; // vide le contenue de la div result

    const newDivAppliance = document.createElement("button");
    newDivAppliance.innerText = `${appliance}`;
    newDivAppliance.className = `filter__position-label`;
    recipeAppliance.appendChild(newDivAppliance);
    

}

export default renderFilterAppliances;