const filterByName = (recipes, filtre) =>
    recipes.filter(recipe => recipe.name.toLowerCase().includes(filtre.toLowerCase()))



const filterByIngredient = (recipes, filtre) =>
    recipes.filter(recipe =>
        recipe.ingredients.find(ingredient =>
            ingredient.ingredient.toLowerCase().includes(filtre.toLowerCase()
            )
        )
    )


const search = (recipes, search) => {
    const resultsByName  = filterByName(recipes, search);
    const resultsByIngre  = filterByIngredient(recipes, search);
    return resultsByName.concat(resultsByIngre)
}


export default search;
