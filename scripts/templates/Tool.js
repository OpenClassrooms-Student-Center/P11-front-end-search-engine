class Tool{
    constructor(toolMenu,searchSubject,update){
        this.$wrapper = toolMenu;
        this._update = update;
        this._SearchSubject = searchSubject;
        this.combobox = new Combobox(this);
        this.listbox = new Listbox(this,this.combobox, this._SearchSubject, this._update);
        this.listbox.setToolsList();
        this.openHandleList();
    }

    openHandleList(){
        const that = this;
        this.$wrapper.addEventListener("click",function(e){
            that.combobox.$input.value = "";
            switch(that.listbox.$listbox.classList[1]){
                case "ingredients":
                    that.combobox.$input.setAttribute("placeholder","Rechercher un ingrédient");
                    break;
                case "appliances":
                    that.combobox.$input.setAttribute("placeholder","Rechercher un appareil");
                    break;
                case "ustensils":
                    that.combobox.$input.setAttribute("placeholder","Rechercher un ustensile");
            }
            that.combobox.$input.focus();
            that.$wrapper.classList.add("tools__menu--open");
            that.listbox.$listbox.classList.add("menu__item--open");
            that.listbox.$listbox.classList.remove("menu__item--hidden");
            that.combobox.$combobox.setAttribute("aria-expanded",true);
            that.$wrapper.setAttribute("aria-expanded",true);
        });
    }

    closeHandleList(e,that){
        this.combobox.$input.removeAttribute("placeholder");
        this.combobox.$combobox.setAttribute("aria-expanded",false);
        this.$wrapper.setAttribute("aria-expanded",false);
        this.listbox.$listbox.classList.remove("menu__item--open");
        this.listbox.$listbox.classList.add("menu__item--hidden");
        this.listbox.$listbox.parentNode.classList.remove("tools__menu--open");
        switch(this.listbox.$listbox.classList[1]){
            case "ingredients":
                this.combobox.$input.value = "Ingrédients";
                break;
            case "appliances":
                this.combobox.$input.value = "Appareils";
                break;
            case "ustensils":
                this.combobox.$input.value = "Ustensiles";
        }
        that.removeEventListener("click",e);
    }
}