class Tag{
    constructor(listbox, searchSubject, update){
        this._listbox = listbox;
        this._SearchSubject = searchSubject;
        this._Update = update;
        this.type = listbox.$listbox.classList[1];
        this.$wrapper = document.createElement('div')
        this.$tagMenu = document.querySelector(".tagMenu");
        this.filterIDRecipes = [];
    }

    create(li){
        const that = this;
        switch(li.parentNode.parentNode.classList[1]){
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
        this._listbox.reset();
        const _TagSearch = new TagSearch(this);
        this.filterIDRecipes.push(_TagSearch.search());
        this._SearchSubject.subscribe(this.filterIDRecipes);
        this._SearchSubject.fire(this._Update)
        this.$wrapper.addEventListener("click", function(e){
            that._SearchSubject.unsubscribe(that.filterIDRecipes);
            that._SearchSubject.fire(that._Update);
            that._listbox.toolsList.push(li.textContent);
            that._listbox.$listbox.children[0].innerHTML = "";
            that._listbox.setDOMList();
            that.$tagMenu.removeChild(this);    
            this.removeEventListener("click",e);
        });
    }
}
