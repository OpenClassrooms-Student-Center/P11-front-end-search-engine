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
        this._Listbox.resetDOMList(AppEvent,this,this._Combobox);
        this.$wrapper.addEventListener("click",function(e){
            AppEvent.openHandleList(that);
        });
    }

    findTool(Recipe,findToolIndexArray,SearchObservers){
        this._Listbox.toolsList.forEach((tool,toolIndex) => {
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

    updateTool(findToolIndexArray,Tool){
        // console.log(findToolIndexArray);
        // console.log(this._Listbox.toolsList);
        let indexDelete = 0;
        Tool._Listbox.toolsList = Tool._Listbox.toolsList.filter((tool,index) => {
            if(!findToolIndexArray.includes(index)){
                Tool._Listbox.$ul.removeChild(Tool._Listbox.$ul.children[index-indexDelete]);
                indexDelete++;
                return false;
            }
            else{
                return true;
            }
        }); 
    }

    resetTool(AppEvent){
        this._Listbox.toolsList.splice(0,this._Listbox.toolsList.length);
        this._Listbox.setToolsList();
        this._Listbox.resetDOMList(AppEvent,this,this._Combobox);
    }
}