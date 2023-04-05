class Combobox{
    constructor(Tool){
        this.$combobox = Tool.$wrapper.children[0];
        this.$input = this.$combobox.children[1];
    }

    eventSetup(Tool,SearchEvent){
        const that = this;
        this.$input.addEventListener("blur", function(e){
            SearchEvent.closeHandleCombobox(e,that,Tool);
        });
        this.$input.addEventListener("input",function(e){
            SearchEvent.inputComboboxEvent(e,Tool);
        });
    }
}