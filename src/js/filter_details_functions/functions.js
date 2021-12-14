
const ddIngredients = document.getElementById('dd-ingredient')
const ddContentIng = document.getElementById('myDropdownIngredient')

const ddAppliances = document.getElementById('dd-appliance')
const ddContentApp = document.getElementById('myDropdownAppliance')

const ddUstensiles = document.getElementById('dd-ustensile')
const ddContentUst = document.getElementById('myDropdownUstensile')


function openDDIng() {
    ddContentIng.classList.toggle("hidden");
    ddContentIng.classList.toggle("flex");
}

ddIngredients.addEventListener('click', openDDIng)

function openDDApp() {
    ddContentApp.classList.toggle("hidden");
    ddContentApp.classList.toggle("flex");
}

ddAppliances.addEventListener('click', openDDApp)

function openDDUst() {
    ddContentUst.classList.toggle("hidden");
    ddContentUst.classList.toggle("flex");
}

ddUstensiles.addEventListener('click', openDDUst)