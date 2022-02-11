import recipesInit from "../data";
import searchBarAlgo from "./searchBarAlgo";
import render from "../../index";
const resultsTag = document.getElementById('localTags');


const searchBar = document.getElementById('inputSearch');

export function onSearchBar () {
    const results = searchBarAlgo(recipesInit, searchBar.value)
    render(results)

}



/* TODO
* ALGO 2 - Soutenance
* */

/* TODO
* Finir le remove Tag
* */


/* TODO
*  Appliance a bug FIX
* */


const test = (event) => {
    console.log(event)
    console.log(event.target)
    console.log(event.target.parentNode)
    console.log(event.target.parentNode.parentNode)
    console.log(event.target.parentNode.parentNode.id)
    console.log('========')
}

export const initSearchBar = () => {
    searchBar.addEventListener('keyup', onSearchBar)
    resultsTag.addEventListener('click', test)
}

export default initSearchBar;
