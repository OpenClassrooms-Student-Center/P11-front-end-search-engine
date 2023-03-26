/**
 *
 * @param {array} array of filters to display in list
 * @param {string} listid id of the list in DOM
 */
export const displayFilter = (filters, listId) => {
  // Select right list
  const list = document.getElementById(listId);
  list.innerHTML = "";

  // Create element for each filter
  filters.forEach((filter) => {
    const tag = filter.charAt(0).toUpperCase() + filter.slice(1);
    const listItem = document.createElement("li");
    const tagBtn = document.createElement("button");
    tagBtn.textContent = `${tag}`;
    tagBtn.classList.add("search-filter_list-btn");
    tagBtn.setAttribute("id", listId);
    listItem.appendChild(tagBtn);
    list.appendChild(listItem);
  });
};


/**
 *
 * @param {array} arrayOfTags tags who are clicked
 */
export const displayTag = (arrayOfTags) => {
  // Filter array to have unique values
  const uniqueTagsArray = (arrayOfTags) => {
    const uniqueNamesSet = new Set();
    const uniqueTagsArray = [];

    arrayOfTags.forEach((tag) => {
      if (!uniqueNamesSet.has(tag.name)) {
        uniqueNamesSet.add(tag.name);
        uniqueTagsArray.push(tag);
      }
    });

    return uniqueTagsArray;
  };

  const arrayOfUniqueTags = uniqueTagsArray(arrayOfTags);

  // Create tag element
  const Tagcontainer = document.querySelector(".search-tag");
  Tagcontainer.innerHTML = "";
  arrayOfUniqueTags.forEach((tag) => {
    const tagBtn = document.createElement("button");
    tagBtn.classList.add(`search-tag_btn`);
    tagBtn.setAttribute("id", tag.category);
    tagBtn.textContent = `${tag.name}`;
    Tagcontainer.appendChild(tagBtn);
  });
};


