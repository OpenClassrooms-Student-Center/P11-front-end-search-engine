

export const displayFilter = (filters, listId) => {
  const list = document.getElementById(listId);
  list.innerHTML = "";
  filters.forEach(filter => {
    const tag = filter.charAt(0).toUpperCase() + filter.slice(1);
    const listItem = document.createElement("li");
    const tagBtn = document.createElement("button");
    tagBtn.textContent = `${tag}`;
    tagBtn.classList.add('search-filter_list-btn');
    listItem.appendChild(tagBtn);
    list.appendChild(listItem);
  })
}; 


export const setArrayFilters = (arrayOfRecipes, element, filter, listId) => {
  let allElements = [];
  let uniqueElements = [];
  arrayOfRecipes.forEach((recipe) => {
    if (Array.isArray(recipe[element])) {
      recipe[element].forEach((subElement) => {
        allElements.push(typeof subElement === 'object' ? subElement[filter].toLowerCase().trim() : subElement.toLowerCase().trim());
      });
    } else {
      allElements.push(recipe[element]);
    }
  });
  uniqueElements = [...new Set(allElements)];
  displayFilter(uniqueElements, listId);
};

