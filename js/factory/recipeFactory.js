function recipesFactory(dataRecipes) {
    const { id, name, servings, ingredients, unit, time, description, appliance, ustensils} = dataRecipes;


    function getRecipeDOM() {

        const article = document.createElement('article');
        article.classList.add('col-4');
        article.classList.add('article-bloc');

        const divImg = document.createElement('div')
        divImg.classList.add('img-bloc')

        const divDescription = document.createElement('div')
        divDescription.classList.add('description')
        const divHeader = document.createElement('div')
        divHeader.classList.add('description-header')
        const h2 = document.createElement('h2')
        h2.textContent = name
        const pHeader = document.createElement('p')
        const i = document.createElement('i')
        i.classList.add('fa-regular')
        i.classList.add('fa-clock')
        const span = document.createElement('span')
        span.textContent = time + " min"

        const divBottom = document.createElement('div')
        divBottom.classList.add('description-bottom')
        const divIngredientsList = document.createElement('div')
        divIngredientsList.classList.add('ingredients-list')
        

        article.appendChild(divImg);

        article.appendChild(divDescription);
        divDescription.appendChild(divHeader)
        divHeader.appendChild(h2)
        divHeader.appendChild(pHeader)
        pHeader.appendChild(i)
        pHeader.appendChild(span);
        divDescription.appendChild(divBottom)
        divBottom.appendChild(divIngredientsList)

        ingredients.forEach(ingredients => {
            ingredient = ingredients.ingredient;
            quantity = ingredients.quantity;
            const p = document.createElement('p');
            p.classList.add('ingredients-line')

            const p1 = document.createElement('span');
            p1.classList.add('p1');
            p1.textContent = ingredient + " :  ";
            
            const p2 = document.createElement('span');
            p2.classList.add('p2');
            p2.textContent = " " + quantity;
            
            divIngredientsList.appendChild(p)
            p.appendChild(p1)
            p.appendChild(p2)
        });

        const descriptionText = document.createElement('span')
        descriptionText.classList.add('description-text')
        descriptionText.textContent = description

        divBottom.appendChild(descriptionText)
        
        return (article);
    }



    return { name, id, getRecipeDOM}
}