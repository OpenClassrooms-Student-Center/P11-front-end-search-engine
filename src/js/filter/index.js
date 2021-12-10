
const ddIngredients = document.getElementById('dd-ingredient')
const ddContent = document.getElementById('myDropdownIngredient')


function openDD() {
    ddContent.classList.toggle("hidden");
    ddContent.classList.toggle("flex");
}

ddIngredients.addEventListener('click', openDD)
