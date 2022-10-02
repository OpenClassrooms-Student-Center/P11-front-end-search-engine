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
                li.innerHTML = `<p><strong>${ingredient.ingredient}:\xA0</strong>${ingredient.quantity}${getSpacing(ingredient.unit)}</p>`;
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

    return {id, appliance, ustensils, ingredients, getRecipesCardDOM}
}