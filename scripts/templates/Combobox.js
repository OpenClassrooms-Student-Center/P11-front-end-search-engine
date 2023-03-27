class Combobox{
    constructor(toolsMenu){
        this._toolsMenu = toolsMenu;
        this.$combobox = toolsMenu.$wrapper.children[0];
        this.$input = this.$combobox.children[1];
        this.active();
    }

    active(){
        const that = this;
        this.$input.addEventListener("blur", function(e){
            if(e.relatedTarget !== that._toolsMenu.$wrapper){
                that._toolsMenu.listbox.reset();
                that._toolsMenu.closeHandleList(e,this);
            }
        });
        this.$input.addEventListener("input",function(e){
            let indexDelete = 0;
            that._toolsMenu.listbox.reset();
            if(e.target.value.length >= 3){
                that._toolsMenu.listbox.toolsList.map((tool,index) => {
                    if(!tool.includes(e.target.value.toLowerCase())){
                        that._toolsMenu.listbox.$listbox.children[0].removeChild(that._toolsMenu.listbox.$listbox.children[0].children[index-indexDelete]);
                        indexDelete++;
                    }
                });
            }
        });
    }
}