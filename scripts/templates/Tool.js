class Tool{
    constructor($tool,SearchSubject,Update){
        this.$wrapper = $tool;
        this._SearchSubject = SearchSubject;
        this._Update = Update;
        this._Combobox = new Combobox(this);
        this._Listbox = new Listbox(this);
        this._Listbox.setToolsList();
        this._Listbox.setDOMList();
        this.openHandleList();
    }

    openHandleList(){
        const that = this;
        this.$wrapper.addEventListener("click",function(e){
            that._Combobox.$input.value = "";
            switch(that._Listbox.$listbox.classList[1]){
                case "ingredients":
                    that._Combobox.$input.setAttribute("placeholder","Rechercher un ingrédient");
                    break;
                case "appliances":
                    that._Combobox.$input.setAttribute("placeholder","Rechercher un appareil");
                    break;
                case "ustensils":
                    that._Combobox.$input.setAttribute("placeholder","Rechercher un ustensile");
            }
            that._Combobox.$input.focus();
            that.$wrapper.classList.add("tools__menu--open");
            that._Listbox.$listbox.classList.add("menu__item--open");
            that._Listbox.$listbox.classList.remove("menu__item--hidden");
            that._Combobox.$combobox.setAttribute("aria-expanded",true);
            that.$wrapper.setAttribute("aria-expanded",true);
        });
    }

    closeHandleList(e){
        this._Combobox.$input.removeAttribute("placeholder");
        this._Combobox.$combobox.setAttribute("aria-expanded",false);
        this.$wrapper.setAttribute("aria-expanded",false);
        this._Listbox.$listbox.classList.remove("menu__item--open");
        this._Listbox.$listbox.classList.add("menu__item--hidden");
        this._Listbox.$listbox.parentNode.classList.remove("tools__menu--open");
        switch(this._Listbox.$listbox.classList[1]){
            case "ingredients":
                this._Combobox.$input.value = "Ingrédients";
                break;
            case "appliances":
                this._Combobox.$input.value = "Appareils";
                break;
            case "ustensils":
                this._Combobox.$input.value = "Ustensiles";
        }
    }
}