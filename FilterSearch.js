
export const filterSearch = (value, itemArray) => {
    let filterByValueItem =  itemArray.filter(item => {
        if(item.toLowercase().trim().includes(value)) {
            return item;
        }
    });
    console.log(filterByValueItem);
}