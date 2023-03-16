


export const displayTag = (arrayOfTags) => {
    const Tagcontainer = document.querySelector('.search-tag');
    Tagcontainer.innerHTML=""
    arrayOfTags.forEach((tag)=> {
        const tagBtn = document.createElement('button');
        tagBtn.classList.add(`search-tag_btn`);
        tagBtn.classList.add(`search-tab_btn-${tag.category}`);
        tagBtn.textContent = `${tag.name}`
        Tagcontainer.appendChild(tagBtn);
    })
}


export const filterArrayByTag = (value, arrayRecipes, filteredArray = []) => {
    const valueToFilter = value.toLowerCase().trim()
    const arrayForFilter = [];

    let arrayToFilter = filteredArray.length ? filteredArray : arrayRecipes
    console.log(arrayToFilter);

    arrayToFilter.forEach(recipe => {
        for(const key in recipe) {
            if(Array.isArray(recipe[key])) {
                recipe[key].forEach(item => {
                    if(typeof item === "object") {
                        if(item.ingredient.toLowerCase().trim() === valueToFilter ) {
                            arrayForFilter.push(recipe); 
                            
                        } 
                    } else {
                        if(item.toLowerCase().trim() === valueToFilter) {
                            arrayForFilter.push(recipe); 
                        }  
                    }
                })
            } 
        }

        if(recipe.appliance.toLowerCase().trim() === valueToFilter) {
            arrayForFilter.push(recipe); 
        }
    })


      return arrayForFilter;
}



