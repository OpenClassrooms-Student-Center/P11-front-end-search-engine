class Tool{
    constructor($tool){
        this.$wrapper = $tool;
        this._Combobox = new Combobox(this);
    }

    setup(AppEvent){
        const that = this;
        this._Combobox.eventSetup(this,AppEvent);
        this._Combobox._Listbox.setToolsList();
        this._Combobox._Listbox.resetDOMList(AppEvent,this,this._Combobox);
        this.$wrapper.addEventListener("click",function(e){
            AppEvent.openHandleList(that,that._Combobox);
        });
    }

    findTool(Recipe,findToolIndexArray,SearchObservers){
        this._Combobox._Listbox.toolsList.forEach((tool,toolIndex) => {
            const findTagTool = SearchObservers.some(Search => Search._search === tool && Search._Tag !== undefined);
            if(findToolIndexArray.includes(toolIndex) === false && !findTagTool){
                switch(this.$wrapper.classList[1]){
                    case "menu1":
                        Recipe._ingredients.forEach(obj => {
                            if(obj.ingredient[0].toUpperCase() + obj.ingredient.substring(1) === tool){
                                findToolIndexArray.push(toolIndex);
                            }
                        });
                        break;
                    case "menu2":
                        if(Recipe.appliance[0].toUpperCase() + Recipe.appliance.substring(1) === tool){
                            findToolIndexArray.push(toolIndex);
                        }
                        break;
                    case "menu3":
                        Recipe._ustensils.forEach(ustensil => {
                            if(ustensil[0].toUpperCase() + ustensil.substring(1) === tool){
                                findToolIndexArray.push(toolIndex);
                            }
                        });
                }
            }      
        });    
    }

    findInactiveTools(Tool, state){
        if(!window.matchMedia("(min-width:768px)").matches){
            const $tools = document.querySelectorAll("div.tools__menu");
            $tools.forEach($tool => {
                if($tool !== Tool.$wrapper){
                    switch(state){
                        case "active":
                            $tool.classList.remove("tools__menu--inactive");
                            break;
                        case "inactive":
                            $tool.classList.add("tools__menu--inactive");
                    }
                }
            });
        }
    }

    updateTool(findToolIndexArray,Tool,SearchObservers){
        // console.log(findToolIndexArray);
        // console.log(this._Listbox.toolsList);
        let indexDelete = 0;
        const ActiveTagArray = [];
        SearchObservers.forEach(Search => {
            if(Search._Tag.type !== undefined){
                ActiveTagArray.push(Search._Tag);
            }
        });
        Tool._Combobox._Listbox.toolsList = Tool._Combobox._Listbox.toolsList.filter((tool,index) => {
            const findTag = ActiveTagArray.some(ActiveTag => ActiveTag.$wrapper.textContent === tool);
            if(!findToolIndexArray.includes(index) || findToolIndexArray.includes(index) && findTag){
                Tool._Combobox._Listbox.$wrapper.removeChild(Tool._Combobox._Listbox.$wrapper.children[index-indexDelete]);
                indexDelete++;
                return false;
            }
            return true;
        }); 
    }

    resetTool(AppEvent){
        this._Combobox._Listbox.toolsList.splice(0,this._Combobox._Listbox.toolsList.length);
        this._Combobox._Listbox.setToolsList();
        this._Combobox._Listbox.resetDOMList(AppEvent,this,this._Combobox);
    }
}