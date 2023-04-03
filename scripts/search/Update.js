class Update{
    constructor(App){
        this._SearchSubject = App._SearchSubject;
        this.$section = App.$section;
        this._IngredientsTool = new Tool(document.querySelector(".menu1"),App._SearchSubject,this);
        this._AppliancesTool = new Tool(document.querySelector(".menu2"),App._SearchSubject,this);
        this._UstensilsTool = new Tool(document.querySelector(".menu3"),App._SearchSubject,this);
        this.updateIDArray = [];
        this.tamponIDArray = [];
    }

    setup(){
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            this.tamponIDArray.push(_Recipe.id);
            const _RecipeCard = new RecipeCard(_Recipe);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this.$section.appendChild($recipeArticle);
        });
    }

    createCard(Recipe){
        const _RecipeCard = new RecipeCard(Recipe);
        const $recipeArticle = _RecipeCard.getRecipesCardDOM();
        this.$section.appendChild($recipeArticle);
    }

    findTool(Tool,Recipe,findToolIndexArray){
        Tool._Listbox.toolsList.map((tool,index) => {
            if(findToolIndexArray.includes(index) === false){
                switch(Tool.$wrapper.classList[1]){
                    case "menu1":
                        Recipe._ingredients.map(Ingredient => {
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
                        Recipe._ustensils.map(ustensil => {
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

    
    update(allIDObserver){
        this.$section.innerHTML = "";
        //Reset and sort my Update Array
        this.updateIDArray.splice(0,this.updateIDArray.length);
        allIDObserver.map(IDArrayObserver => {
            IDArrayObserver.map((idObserver) => {
                if(this.updateIDArray.every(idUpdate => idObserver !== idUpdate)){ 
                    this.updateIDArray.push(idObserver);
                }
            });
        });
        const findIngredientIndexArray = [];
        const findApplianceIndexArray = [];
        const findUstensilIndexArray = [];
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            if(allIDObserver.length !== 0){
                this.updateIDArray.map(idUpdate => {
                    if(idUpdate === _Recipe._id){
                        this.createCard(_Recipe);
                        this.findTool(this._IngredientsTool,_Recipe,findIngredientIndexArray);
                        this.findTool(this._AppliancesTool,_Recipe,findApplianceIndexArray);
                        this.findTool(this._UstensilsTool,_Recipe,findUstensilIndexArray);
                    }
                });
            }
            else{
                this.tamponIDArray.map(idTampon => {
                    this.createCard(idTampon,_Recipe);
                });
            }
        });
        this.updateTool(this._IngredientsTool,findIngredientIndexArray);
        this.updateTool(this._AppliancesTool,findApplianceIndexArray);
        this.updateTool(this._UstensilsTool,findUstensilIndexArray);
    }
}