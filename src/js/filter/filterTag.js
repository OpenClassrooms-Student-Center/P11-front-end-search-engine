const resultsTag = document.getElementById('localTags');

function closeTag (element) {
    element.classList.add('hidden');
}

function tagDetails(name) {
    const templateTag = document.querySelector('#tag');
    if (name == "applianceButton") {
        templateTag.classList.replace("bg-blue-600", "bg-green-600");
    } else if (name == "ustensilButton") {
        templateTag.classList.replace("bg-blue-600", "bg-red-600");
    }
    templateTag.content.querySelector('.label').text = 'name';
    const newTag = document.importNode(templateTag.content, true);
    resultsTag.appendChild(newTag);
}