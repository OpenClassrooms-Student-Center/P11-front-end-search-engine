
function filterDetails(userInput, arrayForSearching){

    userInput = normalizeString(userInput);


    arrayForSearching = arrayForSearching.filter((element)=>{

         if(element.toLowerCase().includes(userInput) === true){

             return element;

         }

    });

   return arrayForSearching;    

}