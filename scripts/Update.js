class Update{
    constructor(App,IngredientsTool,AppliancesTool,UstensilsTool){
        this._App = App;
        this._IngredientsTool = IngredientsTool;
        this._AppliancesTool = AppliancesTool;
        this._UstensilsTool = UstensilsTool;
        this.updateIDArray = [];
        this.tamponIDArray = [];
    }

    setup(){
        this._App.$section.innerHTML = "";
        recipes.forEach(recipe => {
            const _Recipe = new Recipe(recipe);
            this.tamponIDArray.push(_Recipe.id);
            const _RecipeCard = new RecipeCard(_Recipe);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this._App.$section.appendChild($recipeArticle);
        });
    }

    createCard(Recipe){
        const _RecipeCard = new RecipeCard(Recipe);
        const $recipeArticle = _RecipeCard.getRecipesCardDOM();
        this._App.$section.appendChild($recipeArticle);
    }

    findTool(Tool,Listbox,Recipe,findToolIndexArray){
        Listbox.toolsList.forEach((tool,index) => {
            if(findToolIndexArray.includes(index) === false){
                switch(Tool.$wrapper.classList[1]){
                    case "menu1":
                        Recipe._ingredients.forEach(Ingredient => {
                            if(Ingredient.ingredient.toLowerCase() === tool){
                                findToolIndexArray.push(index);
                            }
                        });
                        break;
                    case "menu2":
                        if(Recipe._appliance.toLowerCase() === tool){
                            findToolIndexArray.push(index);
                        }
                        break;
                    case "menu3":
                        Recipe._ustensils.forEach(ustensil => {
                            if(ustensil.toLowerCase() === tool){
                                findToolIndexArray.push(index);
                            }
                        });
                }
            }            
        });    
    }

    updateTool(Tool,findToolIndexArray){
        // console.log(findToolIndexArray);
        // console.log(Tool.listbox.toolsList);
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

    resetTool(Tool,AppEvent){
        Tool._Listbox.toolsList.splice(0,Tool._Listbox.toolsList.length);
        Tool._Listbox.setToolsList();
        Tool._Listbox.reset(AppEvent,Tool,Tool._Combobox);
    }
    
    update(allIDObserver){
        const findIngredientIndexArray = [];
        const findApplianceIndexArray = [];
        const findUstensilIndexArray = [];
        this._App.$section.innerHTML = "";

        //Reset and sort my Update Array
        this.updateIDArray.splice(0,this.updateIDArray.length);
        allIDObserver.forEach((IDArrayObserver,index) => {
            IDArrayObserver.forEach((idObserver) => {
                if(index === 0){
                    this.updateIDArray.push(idObserver);
                }
                else if(this.updateIDArray.some(updateID => updateID === idObserver)){
                    this.updateIDArray = this.updateIDArray.filter(updateId => updateId === idObserver);
                    console.log(this.updateIDArray);
                }
            });
        });
        // console.log(this.updateIDArray);
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            if(allIDObserver.length !== 0){
                this.updateIDArray.map(idUpdate => {
                    if(idUpdate === _Recipe._id){
                        this.createCard(_Recipe);
                        this.findTool(this._IngredientsTool,this._IngredientsTool._Listbox,_Recipe,findIngredientIndexArray);
                        this.findTool(this._AppliancesTool,this._AppliancesTool._Listbox,_Recipe,findApplianceIndexArray);
                        this.findTool(this._UstensilsTool,this._UstensilsTool._Listbox,_Recipe,findUstensilIndexArray);
                    }
                });
            }
            else{
                this.tamponIDArray.forEach(idTampon => {
                    this.createCard(idTampon,_Recipe);
                });
            }
        });
        this.updateTool(this._IngredientsTool,findIngredientIndexArray);
        this.updateTool(this._AppliancesTool,findApplianceIndexArray);
        this.updateTool(this._UstensilsTool,findUstensilIndexArray);
    }
}