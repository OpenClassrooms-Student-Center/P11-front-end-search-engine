// arrayForSearching : le tableau ds lequel on recherche
function filterDetails(userInput, arrayForSearching){
// uniformisation des caractères
    userInput = normalizeString(userInput);
//Grace à l'index de l'élément actuel récupérer dans la fct getTheUserinput filterDetails pourra identifier sur quel tableau, il doit faire sa recherche

    arrayForSearching = arrayForSearching.filter((element)=>{

         if(element.toLowerCase().includes(userInput) === true){

             return element;

         }

    });

   return arrayForSearching;
    

}