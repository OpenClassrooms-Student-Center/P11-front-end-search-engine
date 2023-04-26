class Combobox{
    constructor(Tool){
        this.$wrapper = Tool.$wrapper.children[0];
        this.$input = Tool.$wrapper.children[0].children[1];
        this._Listbox = new Listbox(this);
    }

    eventSetup(Tool,AppEvent){
        const that = this;
        this.$input.addEventListener("blur", function(e){
            AppEvent.closeHandleCombobox(e,that,Tool);
        });
        this.$input.addEventListener("input",function(e){
            AppEvent.inputComboboxEvent(e,Tool);
        });
    }
}