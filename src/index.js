/* Functions */
function myFunctionDropdown(event,myDropdown){
    let element = event.target;
    while(element.nodeName !== "BUTTON"){
      element = element.parentNode;
    }
    document.getElementById(myDropdown).classList.toggle("hidden");
    document.getElementById(myDropdown).classList.toggle("flex");
}

function myFunctionCloseTag(event,myTag){
  let element = event.target;
  while(element.nodeName !== "BUTTON"){
    element = element.parentNode;
  }
  document.getElementById(myTag).classList.toggle("hidden");
}