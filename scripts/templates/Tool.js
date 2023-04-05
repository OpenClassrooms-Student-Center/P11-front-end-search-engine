class Tool{
    constructor($tool){
        this.$wrapper = $tool;
        this._Combobox = new Combobox(this);
        this._Listbox = new Listbox(this);
    }

    setup(AppEvent){
        const that = this;
        this._Combobox.eventSetup(this,AppEvent,this._Listbox);
        this._Listbox.setToolsList();
        this._Listbox.setDOMList(AppEvent,this,this._Combobox);
        this.$wrapper.addEventListener("click",function(e){
            AppEvent.openHandleList(that);
        });
    }
}