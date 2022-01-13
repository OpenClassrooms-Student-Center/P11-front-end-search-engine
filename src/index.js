import recipesInit from './js/data'
import renderRecipe from './js/recipe/renderRecipe'
import initSearch from './js/searchBar/initSearch'
import initFilter from './js/filter/initFilter'
import renderFilter from './js/filter/renderFilter'


const render = (recipes) => {
    renderRecipe(recipes)
    renderFilter(recipes)
}

initSearch()
initFilter()
render(recipesInit)

export default render;