const buttonsCloseTag = document.getElementById('hiddenTagBtn')
const tag = document.getElementById('tagDetails')

function closeTag (element) {
    tag.classList.add('hidden');
    filter();
}

const initTag = () => {
    buttonsCloseTag.addEventListener('click', closeTag)
}

export default initTag;