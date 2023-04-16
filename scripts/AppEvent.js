class AppEvent{
    constructor(SearchSubject,Update){
        this._SearchSubject = SearchSubject;
        this._Update = Update;
    }

    globalInputEvent(e,App,deleteBackwardCount){
        if(e.target.value.length >= 3){
            this._SearchSubject.unsubscribe(App.GlobalSearchArray);
            const _GlobalSearch = new GlobalSearch(e.target.value);
            App.GlobalSearchArray = _GlobalSearch.search();
            if(App.GlobalSearchArray.filterIdRecipes.length === 0){
                App.$globalSearchInput.setAttribute("placeholder","Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson», etc.");
                App.$globalSearchInput.value = "";
            }
            this._SearchSubject.subscribe(App.GlobalSearchArray);
            this._SearchSubject.fire(this._Update);
            deleteBackwardCount = 0;
        }
        else if(e.inputType === "deleteContentBackward" && deleteBackwardCount < 1){
            deleteBackwardCount++;
            this._SearchSubject.unsubscribe(App.GlobalSearchArray);
            this._Update._IngredientsTool.resetTool(this);
            this._Update._AppliancesTool.resetTool(this);
            this._Update._UstensilsTool.resetTool(this);
            if(this._SearchSubject.SearchObservers.length !== 0){
                this._SearchSubject.fire(this._Update);
                this._Update._IngredientsTool._Listbox.reset(this,this._Update._IngredientsTool,this._Update._IngredientsTool._Combobox);
                this._Update._AppliancesTool._Listbox.reset(this,this._Update._AppliancesTool,this._Update._AppliancesTool._Combobox);
                this._Update._UstensilsTool._Listbox.reset(this,this._Update._UstensilsTool,this._Update._UstensilsTool._Combobox);
            }else{
                this._Update.setup();
            }
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
        Tool._Listbox.reset(this,Tool,Tool._Combobox);
        if(e.target.value.length >= 3){
            Tool._Listbox.toolsList.forEach((tool,index) => {
                if(!tool.includes(e.target.value.toLowerCase())){
                    Tool._Listbox.$ul.removeChild(Tool._Listbox.$ul.children[index-indexDelete]);
                    indexDelete++;
                }
            });
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
        Tool._Combobox.$combobox.setAttribute("aria-expanded",false);
        Tool.$wrapper.setAttribute("aria-expanded",false);
        Tool._Listbox.$listbox.classList.remove("menu__item--open");
        Tool._Listbox.$listbox.classList.add("menu__item--hidden");
        Tool._Listbox.$listbox.parentNode.classList.remove("tools__menu--open");
        switch(Tool._Listbox.$listbox.classList[1]){
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

    liClickEvent(e,Tool,Combobox,$li,activeToolIndex){
        // if(Tool._Combobox.$input.value.length >= 3){
        //     Tool.reset(this,Tool,Tool._Combobox);
        // }
        const newTag = new Tag(Tool._Listbox);
        newTag.create($li,this,this._SearchSubject,this._Update,Tool,activeToolIndex);
        this.closeHandleList(Tool,Combobox);
        $li.removeEventListener("ckick",e);
    }

    //Tag Event
    tagCloseEvent(e,Listbox,Tag,$li,TagSearchResult){
        this._SearchSubject.unsubscribe(TagSearchResult);
        Listbox.toolsList.push($li.textContent);
        Listbox.toolsList.sort((a,b) => a - b );
        Listbox.$ul.innerHTML = "";
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