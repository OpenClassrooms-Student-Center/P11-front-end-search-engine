/* Functions */ function myFunctionDropdownIngredient(event, myDropdownIngredient) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myDropdownIngredient).classList.toggle("hidden");
    document.getElementById(myDropdownIngredient).classList.toggle("flex");
}
function myFunctionDropdownAppareil(event, myDropdownAppareil) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myDropdownAppareil).classList.toggle("hidden");
    document.getElementById(myDropdownAppareil).classList.toggle("flex");
}
function myFunctionDropdownUstensile(event, myDropdownUstensile) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myDropdownUstensile).classList.toggle("hidden");
    document.getElementById(myDropdownUstensile).classList.toggle("flex");
}
function myFunctionCloseTagIngredient(event, myTagIngredient) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myTagIngredient).classList.toggle("hidden");
}
function myFunctionCloseTagAppareil(event, myTagAppareil) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myTagAppareil).classList.toggle("hidden");
}
function myFunctionCloseTagUstensile(event, myTagUstensile) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    document.getElementById(myTagUstensile).classList.toggle("hidden");
}

//# sourceMappingURL=index.f1c72d30.js.map
