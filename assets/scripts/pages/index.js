import domElements from '../domElements.js';
import getInputSecondaryElements from '../factory/inputSecondary.js';

domElements.inputSecondaryIcon.forEach((icon) =>
  icon.addEventListener('click', (e) => getInputSecondaryElements(e))
);
