class Tag{
    constructor(Listbox){;
        this.type = Listbox.$listbox.classList[1];
        this.$wrapper = document.createElement('div')
        this.$tagMenu = document.querySelector(".tagMenu");
    }

    create($li,SearchEvent,SearchSubject,Update,Tool){
        this.$wrapper.setAttribute("alt","tag");
        switch(this.type){
            case "ingredients":
                this.$wrapper.classList.add("tag","tag1");
                break;
            case "appliances":
                this.$wrapper.classList.add("tag","tag2");
                break;
            case "ustensils":
                this.$wrapper.classList.add("tag","tag3");
        }
        this.$wrapper.textContent = $li.textContent;
        this.$tagMenu.appendChild(this.$wrapper);
        const _TagSearch = new TagSearch(this);
        const TagSearchResult = _TagSearch.search()
        SearchSubject.subscribe(TagSearchResult);
        SearchSubject.fire(Update);
        const that = this;
        this.$wrapper.addEventListener("click", function(e){
            SearchEvent.tagCloseEvent(e,Tool._Listbox,that,$li,TagSearchResult);
        });
    }
}
