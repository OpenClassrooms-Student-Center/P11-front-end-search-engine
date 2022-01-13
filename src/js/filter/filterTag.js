const resultsTag = document.getElementById('localTags');
const templateTag = document.querySelector('#tag');
const buttonName = document.getElementsByName("ingredientButton").textContent;

function closeTag (element) {
    element.parentNode.classList.add('hidden');
}

function tagDetails() {
    if (templateTag.name == "applianceButton") {
        templateTag.classList.replace("bg-blue-600", "bg-green-600");
    } else if (templateTag.name == "ustensilButton") {
        templateTag.classList.replace("bg-blue-600", "bg-red-600");
    }
    templateTag.content.querySelector('.label').text = buttonName;
    const newTag = document.importNode(templateTag.content, true);
    resultsTag.appendChild(newTag);
}