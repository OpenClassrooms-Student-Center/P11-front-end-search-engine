function displayDetails(arrayToDisplay, elementToInsert){

    let html = "";

    arrayToDisplay.forEach((element)=>{

        html+= `
        
                <li>${element}</li>
        
        `;
    });


    elementToInsert.innerHTML = html;


}