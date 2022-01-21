import { onSearch } from '../searchBar/initSearch'

const resultsTag = document.getElementById('localTags');
const templateTag = document.querySelector('#tag');

export function tagDetails(label, type) {

    const tagDetails = templateTag.content.querySelector('#tagDetails');
    const tagLabel = templateTag.content.querySelector('.label');

    if (type == "appliance") {
        tagDetails.className = 'tag flex pl-3 pr-3 pt-2 pb-2 bg-green-600 rounded-md align-center text-white justify-center mr-2'
    } else if (type == "ustensil") {
        tagDetails.className = 'tag flex pl-3 pr-3 pt-2 pb-2 bg-red-600 rounded-md align-center text-white justify-center mr-2'
    } else if (type == "ingredient") {
        tagDetails.className = 'tag flex pl-3 pr-3 pt-2 pb-2 bg-blue-600 rounded-md align-center text-white justify-center mr-2'
    }

    tagDetails.setAttribute('data-type', type)
    tagDetails.setAttribute('data-label', label)

    tagLabel.innerHTML = label;
    const newTag = document.importNode(templateTag.content, true);
    resultsTag.appendChild(newTag);

    onSearch();
}

function closeTag (element) {
    element.parentNode.classList.add('hidden');
    filter();
}
