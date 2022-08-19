function filterByTitle(arrayOfElements){
    return arrayOfElements.sort((a, b)=>{
         return a.localeCompare(b);
    });
}