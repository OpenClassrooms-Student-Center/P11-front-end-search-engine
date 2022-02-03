import recipesInit from '../data'

const filter = () => {
    console.log(test)
    const activeFilter = []
    const tags = document.querySelectorAll('.tag');
    /* const cards = document.querySelectorAll('.card_recipe'); */

    /*
    TODO
    const displayedRecipes = recipesInit.filter par un tableau d'id recuperer depuis cards
     */
    tags.forEach(tag => {
       const type = tag.getAttribute('data-type')
        const label = tag.getAttribute('data-label')
        activeFilter.push({ label, type})
    })

    /*
   TODO
   Appliquer les filtre d'activeFilter sur  displayedRecipes pour avoir un nouveau tableau de recipes a render
    */
    console.log(activeFilter)
}


export default filter;
