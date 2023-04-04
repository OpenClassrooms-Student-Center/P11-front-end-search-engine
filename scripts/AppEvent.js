class AppEvent{
    constructor(){
    }

    globalInputEvent(e,App,SearchSubject,Update,IngredientsTool,AppliancesTool,UstensilsTool){
        let deleteBackwardCount = 0;
        if(e.target.value.length >= 3){
            App.IDArraySearch.splice(0,App.IDArraySearch.length);
            const _GlobalSearch = new GlobalSearch(e.target.value);
            App.IDArraySearch = _GlobalSearch.search();
            SearchSubject.subscribe(App.IDArraySearch);
            SearchSubject.fire(Update);
            deleteBackwardCount = 0;
        }
        else if(e.inputType === "deleteContentBackward" && deleteBackwardCount <= 1){
            deleteBackwardCount++;
            SearchSubject.unsubscribe(App.IDArraySearch);
            Update.setup();
            Update.resetTool(IngredientsTool);
            Update.resetTool(AppliancesTool);
            Update.resetTool(UstensilsTool);
        }
    }

    //Combobox Event
    closeHandleCombobox(e,Combobox,Tool){
        if(e.relatedTarget !== Tool.$wrapper){
            this.closeHandleList(Tool,Combobox,Tool);
        }
    }

    inputComboboxEvent(e,SearchSubject,Listbox){
        let indexDelete = 0;
        if(SearchSubject.IDobservers.length === 0){
            Listbox.reset();
        }
        if(e.target.value.length >= 3){
            // console.log(Listbox.toolsList);
            Listbox.toolsList.forEach((tool,index) => {
                if(!tool.includes(e.target.value.toLowerCase())){
                    Listbox.$ul.removeChild(Listbox.$ul.children[index-indexDelete]);
                    indexDelete++;
                }
            });
        }
        else{
            Listbox.reset();
        }
    }

    //Tool Event
    openHandleList(that){
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
    }

    closeHandleList(Tool,Combobox,Listbox){
        Tool.removeAttribute("placeholder");
        Combobox.$combobox.setAttribute("aria-expanded",false);
        Tool.$wrapper.setAttribute("aria-expanded",false);
        Listbox.$listbox.classList.remove("menu__item--open");
        Listbox.$listbox.classList.add("menu__item--hidden");
        Listbox.$listbox.parentNode.classList.remove("tools__menu--open");
        switch(Listbox.$listbox.classList[1]){
            case "ingredients":
                Combobox.$input.value = "Ingrédients";
                break;
            case "appliances":
                Combobox.$input.value = "Appareils";
                break;
            case "ustensils":
                Combobox.$input.value = "Ustensiles";
        }
    }

    liClickEvent(e,SearchSubject,Update,Tool,Combobox,Listbox,$li,indexTool){
        e.stopPropagation();
        Listbox.toolsList.splice(indexTool,1)
        const newTag = new Tag(that);
        Listbox.reset(this,Tool,Combobox);
        newTag.create($li,this,SearchSubject,Update,Listbox);
        this.closeHandleList(Tool,Combobox,Listbox);
        $li.removeEventListener("ckick",e);
    }

    //Tag Event
    tagCloseEvent(SearchSubject,Update,Listbox,that,li,$wrapper){
        SearchSubject.unsubscribe(that.filterIDArray);
        Listbox.toolsList.push(li.textContent);
        Listbox.toolsList.sort((a,b) => a - b );
        Listbox.$ul.innerHTML = "";
        Update.resetTool(IngredientsTool);
        Update.resetTool(AppliancesTool);
        Update.resetTool(UstensilsTool);
        if(SearchSubject.IDobservers.length !== 0){
            SearchSubject.fire(Update);
        }
        else{
            Update.setup();
        }
        that.$tagMenu.removeChild(this);    
        $wrapper.removeEventListener("click",e);
    }
    
}