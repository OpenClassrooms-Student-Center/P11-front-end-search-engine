class Tool{
    constructor($tool){
        this.$wrapper = $tool;
    }

    setup(AppEvent,SearchSubject,Update){
        const _Combobox = new Combobox(this);
        const _Listbox = new Listbox(this);
        const that = this;
        _Combobox.eventSetup(this,AppEvent,SearchSubject,_Listbox);
        _Listbox.setToolsList();
        _Listbox.setDOMList(AppEvent,SearchSubject,Update,this,_Combobox);
        this.$wrapper.addEventListener("click",function(e){
            AppEvent.openHandleList(that);
        });
    }
}