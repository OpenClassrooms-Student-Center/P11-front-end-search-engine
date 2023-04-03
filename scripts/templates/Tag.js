class Tag{
    constructor(Listbox){
        this._Listbox = Listbox;
        this._SearchSubject = Listbox._SearchSubject;
        this._Update = Listbox._Update;
        this.type = Listbox.$listbox.classList[1];
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
            that._Listbox.toolsList.push(li.textContent);
            that._Listbox.$ul.innerHTML = "";
            if(that._SearchSubject.IDobservers.length !== 0){
                that._SearchSubject.fire(that._Update);
            }
            else{
                that._Update.setup();
                that._Update.resetTool(that._Update._IngredientsTool);
                that._Update.resetTool(that._Update._AppliancesTool);
                that._Update.resetTool(that._Update._UstensilsTool);
            }
            that.$tagMenu.removeChild(this);    
            this.removeEventListener("click",e);
        });
    }
}
