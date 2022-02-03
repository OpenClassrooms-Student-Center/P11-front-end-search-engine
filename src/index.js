import recipesInit from './js/data'
import renderRecipe from './js/recipe/renderRecipe'
import initSearchBar from './js/searchComponents/initSearchBar'
import initFilter from './js/filter/initFilter'
import initTag from './js/filter/initTag'
import renderFilter from './js/filter/renderFilter'

const render = (recipes) => {
    renderRecipe(recipes)
    renderFilter(recipes)
}

initSearchBar()
initFilter()
/* initTag() */
render(recipesInit)

export default render;
