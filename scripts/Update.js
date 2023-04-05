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
                }
            });
        });
        this.updateIDArray.sort((a,b) => b - a);
        // console.log(this.updateIDArray);
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            if(allIDObserver.length !== 0){
                this.updateIDArray.map(idUpdate => {
                    if(idUpdate === _Recipe._id){
                        this.createCard(_Recipe);
                        this._IngredientsTool.findTool(_Recipe,findIngredientIndexArray);
                        this._AppliancesTool.findTool(_Recipe,findApplianceIndexArray);
                        this._UstensilsTool.findTool(_Recipe,findUstensilIndexArray);
                    }
                });
            }
            else{
                this.tamponIDArray.forEach(idTampon => {
                    this.createCard(idTampon,_Recipe);
                });
            }
        });
        this._IngredientsTool.updateTool(findIngredientIndexArray);
        this._AppliancesTool.updateTool(findApplianceIndexArray);
        this._UstensilsTool.updateTool(findUstensilIndexArray);
    }
}