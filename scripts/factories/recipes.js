function recipesFactory(data){ 
    function setItemsDOM(items,toolsArray){
        const menu = document.querySelector("section[class=tools]");
        switch(items){
            case ingredients:
                items.forEach(ingredient => {
                    if(compareItem(toolsArray,ingredient.ingredient)){
                        const liItem = document.createElement("li");
                        liItem.textContent = ingredient.ingredient;
                        menu.children[0].children[1].children[0].appendChild(liItem);
                    }
                });
                break;
            case appliance:
                if(compareItem(toolsArray,items)){
                    const liItem = document.createElement("li");
                    liItem.textContent = items;
                    menu.children[1].children[1].children[0].appendChild(liItem);
                }
                break;
            case ustensils:
                items.forEach(ustensil => {
                    if(compareItem(toolsArray,ustensil)){
                        const liItem = document.createElement("li");
                        liItem.textContent = ustensil;
                        menu.children[2].children[1].children[0].appendChild(liItem);
                    }
                });
        }
    }


    function compareItem(testArray, item){
        const unbreakItem = item.toLowerCase();
        let validItem = true;
        testArray.forEach( test => {
            if(test === unbreakItem){
                validItem = false;
            }
        });
        if(validItem){
            testArray.push(unbreakItem);
            return validItem
        }
    }
}