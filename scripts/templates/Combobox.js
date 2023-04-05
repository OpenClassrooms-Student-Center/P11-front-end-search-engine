class Combobox{
    constructor(Tool){
        this.$combobox = Tool.$wrapper.children[0];
        this.$input = this.$combobox.children[1];
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