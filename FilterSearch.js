import { displayFilter} from "./DisplayListFilter.js";

export const filterSearch = (value, itemArray, arrayElement, key, listId) => {

    let arrayOfFilter = [];
    itemArray.forEach(item => {
        if(Array.isArray(item[arrayElement])) {
            item[arrayElement].forEach(filter => {
                if(typeof filter === "object") {
                    filter[key].toLowerCase().trim().includes(value) && arrayOfFilter.push(filter[key]);
                } else {
                    filter.toLowerCase().trim().includes(value) && arrayOfFilter.push(filter);
                }
            })
        } else {
            item[arrayElement].toLowerCase().trim().includes(value) && arrayOfFilter.push(item[arrayElement]);
        }
       
    });

    arrayOfFilter = arrayOfFilter.map(filter => {return filter.toLowerCase()});
    arrayOfFilter = [... new Set(arrayOfFilter)];
    displayFilter(arrayOfFilter, listId);
}