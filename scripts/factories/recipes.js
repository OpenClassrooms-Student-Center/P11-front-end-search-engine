function recipesFactory(data){
    const { id,name,servings,ingredients,time,description,appliance,ustensils } = data;

    function getRecipesCardDOM(){
        const article = document.createElement("article");
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const headerFigcaption = document.createElement("header");
        const divPresentation = document.createElement("div");
        const h2 = document.createElement("h2");
        const strong = document.createElement("strong");
        const pTime = document.createElement("p");
        const ul = document.createElement("ul");
        const pDescription = document.createElement("p");
        pDescription.textContent = description;
        pDescription.classList.add("ellipsis");
        ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            if(ingredient.unit !== undefined){
                li.innerHTML = `<p><strong>${ingredient.ingredient}:\xA0</strong>${ingredient.quantity}${getSpacing(ingredient.unit.toLowerCase())}</p>`;
            }else
            if(ingredient.quantity !== undefined){
                li.innerHTML = `<p><strong>${ingredient.ingredient}:\xA0</strong>${ingredient.quantity}</p>`;
            }
            else{
                li.innerHTML = `<p><strong>${ingredient.ingredient}</strong></p>`;
            }
            ul.appendChild(li);
        });
        divPresentation.appendChild(ul);
        divPresentation.appendChild(pDescription);
        pTime.textContent = `${time} min`;
        h2.textContent = name;
        strong.appendChild(pTime);
        headerFigcaption.appendChild(h2);
        headerFigcaption.appendChild(strong);
        figcaption.appendChild(headerFigcaption);
        figcaption.appendChild(divPresentation);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article;
    }

    function setItemsDOM(items,testArray){
        const menu = document.querySelector("div[class=tools]");
        switch(items){
            case ingredients:
                items.forEach(ingredient => {
                    if(compareItem(testArray,ingredient.ingredient) === false){
                        const liItem = document.createElement("li");
                        liItem.textContent = ingredient.ingredient;
                        menu.children[0].children[1].children[0].appendChild(liItem);
                    }
                });
                break;
            case appliance:
                if(compareItem(testArray,items) === false){
                    const liItem = document.createElement("li");
                    liItem.textContent = items;
                    menu.children[1].children[1].children[0].appendChild(liItem);
                }
                break;
            case ustensils:
                items.forEach(ustensil => {
                    if(compareItem(testArray,ustensil) === false){
                        const liItem = document.createElement("li");
                        liItem.textContent = ustensil;
                        menu.children[2].children[1].children[0].appendChild(liItem);   
                    }
                });
        }
    }

    function getSpacing(unit){
        if(unit !== "ml" && unit !== "cl" && unit !== "grammes" && unit !== "litre"){
            return `\xA0${unit}`
        }else
        if(unit === "grammes"){
            return "g"
        }else
        if(unit === "litre"){
            return "L"
        }
        else{
            return unit
        }
    }


    function compareItem(testArray, item){
        const unbreakItem = item.toLowerCase();
        let validItem = false;
        testArray.forEach( test => {
            if(test === unbreakItem){
                validItem = true;
            }
        });
        if(validItem === false){
            testArray.push(unbreakItem);
            return validItem
        }
    }

    return {id, appliance, ustensils, ingredients, getRecipesCardDOM, setItemsDOM}
}