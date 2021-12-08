/* ======================== START - Filters =====================  */ const renderFilterIngredients = (ingredients)=>{
    const recipeIngredient = document.getElementById('recipeIngredient');
    recipeIngredient.innerHTML = ""; // vide le contenue de la div result
    ingredients.forEach((ingredient)=>{
        const newDivIngredient = document.createElement("button");
        newDivIngredient.innerText = `${ingredient}`;
        newDivIngredient.className = `filter__position-label`;
        recipeIngredient.appendChild(newDivIngredient);
    });
};
const render = (recipes)=>{
    renderRecipe(recipes);
    ingredientResults = [];
    recipes.forEach((recipe)=>{
        ingredientResults = [
            ...ingredientResults,
            ...recipe.ingredients
        ];
    });
    ingredientResults = [
        ...new Set(ingredientResults.map((item)=>item.ingredient
        ))
    ];
    renderFilterIngredients(ingredientResults);
};
/*
function tagFilterIngredient = (recipes) => {
    const templateTagIngredient = document.querySelector('#tagIngredient');
    const cloneIngredient = templateTagIngredient.content.cloneNode(true);
    
} */ /* ======================== END - Filters =====================  */ /**** NEXT *****/ // 3 champs filtre => Ajout d'un filtre => Creation d'un Tag => Trigger de la fonction de filtrage
// ideal pour la semaine pro, les filtres marchent, les tags sont crÃ©es
const filtre = ()=>{
    console.log('filtre');
    console.log(searchResult);
/**** NEXT *****/ // console.log(TagList) // [{ value: 'coco', type: 'ingredient' }, ...]
};
searchBar.addEventListener('keyup', searchByName);
/* ======================== END - Algorithme =====================  */ render(recipes) // render initial au chargement de la page
;

//# sourceMappingURL=index.3f719b3f.js.map
