
// Select DOM element
const recipesContainer = document.querySelector(".recipes-container");

// Recipe Factory
function DisplayRecipe(recipe) {

    // Card
    const recipeCard = document.createElement('section');
    recipeCard.classList.add('recipe-card');
    recipesContainer.appendChild(recipeCard);

    // Card Header
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('recipe-card_header');
    recipeCard.appendChild(cardHeader);

    // Recipe Image
    const recipeImg = document.createElement('img');
    recipeImg.classList.add('recipe-card_header-img');
    recipeImg.setAttribute("src", `./assets/${recipe.picture}`);
    recipeImg.setAttribute("alt", `${recipe.name}`);
    cardHeader.appendChild(recipeImg);

    //Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('recipe-card_body');
    recipeCard.appendChild(cardBody);

    //Card Body Header
    const cardBodyHeader = document.createElement('div');
    cardBodyHeader.classList.add('recipe-card_body-header');
    cardBody.appendChild(cardBodyHeader);

        // Card Body Header Element
        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = `${recipe.name}`
        cardBodyHeader.appendChild(recipeTitle);

        const recipeTime = document.createElement('h3');
        const recipeTimeIcon = document.createElement('i');
        recipeTime.textContent = `${recipe.time} mn`
        recipeTimeIcon.classList.add('fa-regular');  
        recipeTimeIcon.classList.add('fa-clock');  
        recipeTime.appendChild(recipeTimeIcon);
        cardBodyHeader.appendChild(recipeTime);

    //Card Body Content
    const cardBodyContent = document.createElement('div');
    cardBodyContent.classList.add('recipe-card_body-content');
    cardBody.appendChild(cardBodyContent);
        
        //Card Body Content Element
        const ingredientList = document.createElement('ul');
        cardBodyContent.appendChild(ingredientList);

        recipe.ingredients.forEach(ingredient => {
            const listElement = document.createElement('li');
            listElement.textContent = `${ingredient.ingredient} ${ingredient.quantity ? `: ${ingredient.quantity}` : ''} ${ingredient.unit ? ingredient.unit : ''}`
            ingredientList.appendChild(listElement)
        });

        const recipeDescription = document.createElement('p'); 
        recipeDescription.textContent = `${recipe.description}`;
        cardBodyContent.appendChild(recipeDescription); 
}


recipes.forEach(recipe => {
    DisplayRecipe(recipe);
})