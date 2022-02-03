/* import recipesInit from "../data";
import searchTagAlgo from "./searchBarAlgo";
import render from "../../index";

const localTags = document.getElementById('localTag');
const searchTag = localTags.querySelectorAll("span.label");

console.log (
    "=== Search Tag ===",
    searchTag
)

export function onSearchTag () {
    const results = searchTagAlgo(recipesInit, searchTag.value)
    render(results)

}

const initSearchTag = () => {
    localTags.addEventListener('keyup', onSearchTag)
}

export default initSearchTag; */