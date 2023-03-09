
export const setArrayFilters = (arrayOfRecipes, element, filter, listId) => {
  let allElements = [];
  let uniqueElements = [];
  arrayOfRecipes.forEach((recipe) => {
    if (Array.isArray(recipe[element])) {
      recipe[element].forEach((subElement) => {
        allElements.push(typeof subElement === 'object' ? subElement[filter].toLowerCase() : subElement.toLowerCase());
      });
    } else {
      allElements.push(recipe[element]);
    }
  });
  uniqueElements = [...new Set(allElements)];
  allElements = uniqueElements;


  const list = document.getElementById(listId);
  list.innerHTML = "";
  allElements.forEach(filter => {
    const listItem = document.createElement("li");
    listItem.textContent = `${filter}`.toLowerCase().charAt(0).toUpperCase() + filter.slice(1);
    list.appendChild(listItem);
  })
};

