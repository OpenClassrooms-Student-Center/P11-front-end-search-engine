class Tag{
    constructor(listbox, searchSubject, update){
        this._listbox = listbox;
        this._SearchSubject = searchSubject;
        this._Update = update;
        this.type = listbox.$listbox.classList[1];
        this.$wrapper = document.createElement('div')
        this.$tagMenu = document.querySelector(".tagMenu");
        this.filterIDArray = [];
    }

    create(li){
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
        this.$wrapper.textContent = li.textContent;
        this.$tagMenu.appendChild(this.$wrapper);
        const _TagSearch = new TagSearch(this);
        this.filterIDArray = _TagSearch.search();
        this._SearchSubject.subscribe(this.filterIDArray);
        this._SearchSubject.fire(this._Update);
        const that = this;
        this.$wrapper.addEventListener("click", function(e){
            that._SearchSubject.unsubscribe(that.filterIDArray);
            that._SearchSubject.fire(that._Update);
            that._listbox.toolsList.push(li.textContent);
            that._listbox.$listbox.children[0].innerHTML = "";
            that._listbox.setDOMList();
            that.$tagMenu.removeChild(this);    
            this.removeEventListener("click",e);
        });
    }
}
