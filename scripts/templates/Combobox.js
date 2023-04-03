class Combobox{
    constructor(Tool){
        this._Tool = Tool;
        this.$combobox = Tool.$wrapper.children[0];
        this.$input = this.$combobox.children[1];
        this.active();
    }

    active(){
        const that = this;
        this.$input.addEventListener("blur", function(e){
            if(e.relatedTarget !== that._Tool.$wrapper){
                that._Tool.closeHandleList(e,this);
            }
        });
        this.$input.addEventListener("input",function(e){
            let indexDelete = 0;
            if(that._Tool._SearchSubject.IDobservers.length === 0){
                that._Tool._Listbox.reset();
            }
            if(e.target.value.length >= 3){
                // console.log(that._Tool._Listbox.toolsList);
                that._Tool._Listbox.toolsList.map((tool,index) => {
                    if(!tool.includes(e.target.value.toLowerCase())){
                        that._Tool._Listbox.$ul.removeChild(that._Tool._Listbox.$ul.children[index-indexDelete]);
                        indexDelete++;
                    }
                });
            }
            else{
                that._Tool._Listbox.reset();
            }
        });
    }
}