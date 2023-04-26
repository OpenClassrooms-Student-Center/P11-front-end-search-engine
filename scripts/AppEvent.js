class AppEvent{
    constructor(SearchSubject,Update){
        this._SearchSubject = SearchSubject;
        this._Update = Update;
    }

    globalInputEvent(e,App,deleteBackwardCount){
        this._SearchSubject.unsubscribe(App.GlobalSearchArray);
        if(e.target.value.length >= 3){
            deleteBackwardCount = 0;
            const _GlobalSearch = new GlobalSearch(e.target.value);
            App.GlobalSearchArray = _GlobalSearch.search();
            if(App.GlobalSearchArray.filterIdRecipes.length === 0){
                this._Update.setup();
                App.$globalSearchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson», etc.");
                App.$globalSearchInput.value = "";
            }
            else{
                this._SearchSubject.subscribe(App.GlobalSearchArray);
                this._SearchSubject.fire(this._Update);
            }
        }
        else if(e.inputType === "deleteContentBackward" && deleteBackwardCount < 1){
            deleteBackwardCount++;
            this._Update._IngredientsTool.resetTool(this);
            this._Update._AppliancesTool.resetTool(this);
            this._Update._UstensilsTool.resetTool(this);
            if(this._SearchSubject.SearchObservers.length !== 0){
                this._SearchSubject.fire(this._Update);
                this._Update._IngredientsTool._Listbox.resetDOMList(this,this._Update._IngredientsTool,this._Update._IngredientsTool._Combobox);
                this._Update._AppliancesTool._Listbox.resetDOMList(this,this._Update._AppliancesTool,this._Update._AppliancesTool._Combobox);
                this._Update._UstensilsTool._Listbox.resetDOMList(this,this._Update._UstensilsTool,this._Update._UstensilsTool._Combobox);
            }else{
                this._Update.setup();
            }
        }

    }

    //Combobox Event
    closeHandleCombobox(e,Combobox,Tool){
        if(e.relatedTarget !== Tool.$wrapper){
            this.closeHandleList(Tool);
        }
    }

    inputComboboxEvent(e,Tool){
        let indexDelete = 0;
        Tool._Combobox._Listbox.resetDOMList(this,Tool,Tool._Combobox);
        if(e.target.value.length >= 3){
            Tool._Combobox._Listbox.toolsList.forEach((tool,index) => {
                if(!tool.includes(e.target.value.toLowerCase())){
                    Tool._Combobox._Listbox.$wrapper.removeChild(Tool._Combobox._Listbox.$wrapper.children[index-indexDelete]);
                    indexDelete++;
                }
            });
        }
    }

    //Tool Event
    openHandleList(Tool,Combobox){
        Combobox.$input.value = "";
        switch(Combobox._Listbox.$wrapper.classList[1]){
            case "ingredients":
                Combobox.$input.setAttribute("placeholder","Rechercher un ingrédient");
                break;
            case "appliances":
                Combobox.$input.setAttribute("placeholder","Rechercher un appareil");
                break;
            case "ustensils":
                Combobox.$input.setAttribute("placeholder","Rechercher un ustensile");
        }
        Combobox.$input.focus();
        Tool.$wrapper.classList.add("tools__menu--open");
        Tool.findInactiveTools(Tool,"inactive");
        Combobox._Listbox.$wrapper.classList.add("menu__item--open");
        Combobox._Listbox.$wrapper.classList.remove("menu__item--hidden");
        Combobox.$wrapper.setAttribute("aria-expanded",true);
        Tool.$wrapper.setAttribute("aria-expanded",true);
    }

    closeHandleList(Tool){
        Tool.$wrapper.classList.remove("tools__menu--open");
        Tool.$wrapper.removeAttribute("placeholder");
        Tool._Combobox.$wrapper.setAttribute("aria-expanded",false);
        Tool._Combobox.$wrapper.setAttribute("aria-expanded",false);
        Tool._Combobox._Listbox.$wrapper.classList.remove("menu__item--open");
        Tool._Combobox._Listbox.$wrapper.classList.add("menu__item--hidden");
        Tool.findInactiveTools(Tool,"active");
        // Tool._Listbox.$wrapper.classList.remove("menu__item--open");
        switch(Tool._Combobox._Listbox.$wrapper.classList[1]){
            case "ingredients":
                Tool._Combobox.$input.value = "Ingrédients";
                break;
            case "appliances":
                Tool._Combobox.$input.value = "Appareils";
                break;
            case "ustensils":
                Tool._Combobox.$input.value = "Ustensiles";
        }
    }

    liClickEvent(e,Tool,$li,activeToolIndex){
        const newTag = new Tag(Tool._Combobox._Listbox);
        newTag.create($li,this,this._SearchSubject,this._Update,Tool,activeToolIndex);
        this.closeHandleList(Tool);
        e.stopPropagation();
        $li.removeEventListener("ckick",e);
    }

    //Tag Event
    tagCloseEvent(e,Listbox,Tag,$li,TagSearchResult){
        this._SearchSubject.unsubscribe(TagSearchResult);
        Listbox.toolsList.push($li.textContent);
        Listbox.toolsList.sort((a,b) => a - b );
        Listbox.$wrapper.innerHTML = "";
        this._Update._IngredientsTool.resetTool(this);
        this._Update._AppliancesTool.resetTool(this);
        this._Update._UstensilsTool.resetTool(this);
        if(this._SearchSubject.SearchObservers.length !== 0){
            this._SearchSubject.fire(this._Update);
        }
        else{
            this._Update.setup();
        }
        Tag.$tagMenu.removeChild(Tag.$wrapper);    
        Tag.$wrapper.removeEventListener("click",e);
    }
    
}