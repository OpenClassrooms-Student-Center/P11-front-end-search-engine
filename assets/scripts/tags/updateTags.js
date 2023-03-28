import domElements from '../domElements.js';
import getRecipesShow from '../recipes/getRecipes.js';
import { hideElement, showElement } from '../tools/element.js';
import cleanTagsFromRecipes from './cleanTagsFromRecipes.js';
import getTags from './getTags.js';

const isItemInTags = (child) => {
  const tags = getTags();

  return (
    tags.length === 0 ||
    !tags.some(
      (tag) => tag.name.toLowerCase() === child.textContent.toLowerCase()
    )
  );
};

export const updateTags = () => {
  const recipesShow = getRecipesShow();
  const { allIngredients, allAppliances, allUstensils } =
    cleanTagsFromRecipes(recipesShow);

  domElements.inputSecondary.forEach((inputSec) => {
    const { lastElementChild: inputLEC } = inputSec;
    const inputSecondaryName = inputSec.classList[1];
    const inputValue = inputSec.firstElementChild.firstElementChild.value;

    let array = [];

    if (inputSecondaryName === 'ingredients') {
      array = allIngredients;
    } else if (inputSecondaryName === 'appliances') {
      array = allAppliances;
    } else if (inputSecondaryName === 'ustensils') {
      array = allUstensils;
    }

    let itemsNumber = 0;
    inputLEC.childNodes.forEach((child) => {
      const isItemInRecipes = array.some(
        (item) => item.item === child.textContent.toLowerCase()
      );

      const isItemInInputSecondary =
        (inputValue !== '' &&
          child.textContent.toLowerCase().includes(inputValue.toLowerCase())) ||
        inputValue === '';

      if (
        isItemInRecipes &&
        isItemInTags(child) &&
        isItemInInputSecondary &&
        itemsNumber < 30
      ) {
        showElement(child);
        itemsNumber += 1;
        return;
      }

      hideElement(child);
    });
  });
};

export const updateTagsWithoutInputMain = () => {
  domElements.inputSecondary.forEach((inputSec) => {
    inputSec.lastElementChild.childNodes.forEach((child) => {
      if (isItemInTags(child)) {
        showElement(child);
        return;
      }
      hideElement(child);
    });
  });
};
