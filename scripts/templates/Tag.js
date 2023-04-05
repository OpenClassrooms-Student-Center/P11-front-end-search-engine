class Tag{
    constructor(Listbox){;
        this.type = Listbox.$listbox.classList[1];
        this.$wrapper = document.createElement('div')
        this.$tagMenu = document.querySelector(".tagMenu");
        this.filterIDArray = [];
    }

    create($li,SearchEvent,SearchSubject,Update,Listbox){
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
        this.filterIDArray = _TagSearch.search();
        SearchSubject.subscribe(this.filterIDArray);
        SearchSubject.fire(Update);

        const that = this;
        this.$wrapper.addEventListener("click", function(e){
            SearchEvent.tagCloseEvent(e,Listbox,that,$li);
        });
    }
}
