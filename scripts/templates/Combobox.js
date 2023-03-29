class Combobox{
    constructor(tool){
        this._tool = tool;
        this.$combobox = tool.$wrapper.children[0];
        this.$input = this.$combobox.children[1];
        this.active();
    }

    active(){
        const that = this;
        this.$input.addEventListener("blur", function(e){
            if(e.relatedTarget !== that._tool.$wrapper){
                that._tool.listbox.reset();
                that._tool.closeHandleList(e,this);
            }
        });
        this.$input.addEventListener("input",function(e){
            let indexDelete = 0;
            that._tool.listbox.reset();
            if(e.target.value.length >= 3){
                that._tool.listbox.toolsList.map((tool,index) => {
                    if(!tool.includes(e.target.value.toLowerCase())){
                        that._tool.listbox.$listbox.children[0].removeChild(that._tool.listbox.$listbox.children[0].children[index-indexDelete]);
                        indexDelete++;
                    }
                });
            }
        });
    }
}