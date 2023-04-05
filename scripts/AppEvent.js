class AppEvent{
    constructor(App,SearchSubject,Update){
        this._App = App;
        this._SearchSubject = SearchSubject;
        this._Update = Update;
    }

    globalInputEvent(e,App,IngredientsTool,AppliancesTool,UstensilsTool){
        let deleteBackwardCount = 0;
        if(e.target.value.length >= 3){
            App.IDArraySearch.splice(0,App.IDArraySearch.length);
            const _GlobalSearch = new GlobalSearch(e.target.value);
            App.IDArraySearch = _GlobalSearch.search();
            this._SearchSubject.subscribe(App.IDArraySearch);
            this._SearchSubject.fire(this._Update);
            deleteBackwardCount = 0;
        }
        else if(e.inputType === "deleteContentBackward" && deleteBackwardCount <= 1){
            deleteBackwardCount++;
            this._SearchSubject.unsubscribe(App.IDArraySearch);
            this._Update.setup();
            this._Update.resetTool(IngredientsTool);
            this._Update.resetTool(AppliancesTool);
            this._Update.resetTool(UstensilsTool);
        }
    }

    //Combobox Event
    closeHandleCombobox(e,Combobox,Tool){
        if(e.relatedTarget !== Tool.$wrapper){
            this.closeHandleList(Tool,Combobox);
        }
    }

    inputComboboxEvent(e,Tool){
        let indexDelete = 0;
        if(this._SearchSubject.IDobservers.length === 0){
            Tool._Listbox.reset(this,Tool,Tool._Combobox);
        }
        if(e.target.value.length >= 3){
            // console.log(Listbox.toolsList);
            Tool._Listbox.toolsList.forEach((tool,index) => {
                if(!tool.includes(e.target.value.toLowerCase())){
                    Listbox.$ul.removeChild(Listbox.$ul.children[index-indexDelete]);
                    indexDelete++;
                }
            });
        }
        else{
            Tool._Listbox.reset(this,Tool,Tool._Combobox);
        }
    }

    //Tool Event
    openHandleList(Tool){
        Tool._Combobox.$input.value = "";
        switch(Tool._Listbox.$listbox.classList[1]){
            case "ingredients":
                Tool._Combobox.$input.setAttribute("placeholder","Rechercher un ingrédient");
                break;
            case "appliances":
                Tool._Combobox.$input.setAttribute("placeholder","Rechercher un appareil");
                break;
            case "ustensils":
                Tool._Combobox.$input.setAttribute("placeholder","Rechercher un ustensile");
        }
        Tool._Combobox.$input.focus();
        Tool.$wrapper.classList.add("tools__menu--open");
        Tool._Listbox.$listbox.classList.add("menu__item--open");
        Tool._Listbox.$listbox.classList.remove("menu__item--hidden");
        Tool._Combobox.$combobox.setAttribute("aria-expanded",true);
        Tool.$wrapper.setAttribute("aria-expanded",true);
    }

    closeHandleList(Tool,Combobox){
        Tool.$wrapper.removeAttribute("placeholder");
        Combobox.$combobox.setAttribute("aria-expanded",false);
        Tool.$wrapper.setAttribute("aria-expanded",false);
        Tool._Listbox.$listbox.classList.remove("menu__item--open");
        Tool._Listbox.$listbox.classList.add("menu__item--hidden");
        Tool._Listbox.$listbox.parentNode.classList.remove("tools__menu--open");
        switch(Tool._Listbox.$listbox.classList[1]){
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

    liClickEvent(e,Tool,Combobox,$li,indexTool){
        e.stopPropagation();
        Tool._Listbox.toolsList.splice(indexTool,1)
        const newTag = new Tag(Tool._Listbox);
        Tool._Listbox.reset(this,Tool,Combobox);
        newTag.create($li,this,this._SearchSubject,this._Update,Tool._Listbox);
        this.closeHandleList(Tool,Combobox);
        $li.removeEventListener("ckick",e);
    }

    //Tag Event
    tagCloseEvent(e,Listbox,Tag,$li){
        this._SearchSubject.unsubscribe(Tag.filterIDArray);
        Listbox.toolsList.push($li.textContent);
        Listbox.toolsList.sort((a,b) => a - b );
        Listbox.$ul.innerHTML = "";
        this._Update.resetTool(this._Update._IngredientsTool,this);
        this._Update.resetTool(this._Update._AppliancesTool,this);
        this._Update.resetTool(this._Update._UstensilsTool,this);
        if(this._SearchSubject.IDobservers.length !== 0){
            this._SearchSubject.fire(this._Update);
        }
        else{
            this._Update.setup();
        }
        Tag.$tagMenu.removeChild(Tag.$wrapper);    
        Tag.$wrapper.removeEventListener("click",e);
    }
    
}