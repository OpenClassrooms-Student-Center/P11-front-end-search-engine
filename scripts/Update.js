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
        this._App.$globalSearchInput.setAttribute("placeholder","Rechercher une recette");
        this._App.$globalSearchInput.value = ""
        recipes.forEach((recipe,index) => {
            const _Recipe = new Recipe(recipe);
            this.tamponIDArray.push(_Recipe.id);
            const _RecipeCard = new RecipeCard(_Recipe);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this._App.$section.appendChild($recipeArticle);
        });;
    }

    createCard(Recipe){
        const _RecipeCard = new RecipeCard(Recipe);
        const $recipeArticle = _RecipeCard.getRecipesCardDOM();
        this._App.$sectionSearchResult.appendChild($recipeArticle);
    }
    
    update(SearchObservers){
        const findIngredientIndexArray = [];
        const findApplianceIndexArray = [];
        const findUstensilIndexArray = [];
        this._App.$sectionSearchResult.innerHTML = "";
        this.updateIDArray.splice(0,this.updateIDArray.length);
        SearchObservers.forEach((Search,SearchArrayIndex) => {
            if(SearchArrayIndex === 0){
                Search.filterIdRecipes.forEach(filterIdRecipe => {
                    this.updateIDArray.push(filterIdRecipe);
                });
            }
            else{
                this.updateIDArray = this.updateIDArray.filter(updateId => Search.filterIdRecipes.some(filterIdRecipe => filterIdRecipe === updateId));
            }
        });
        this.updateIDArray.sort((a,b) => a - b);
        recipes.forEach(recipe => {
            const _Recipe = new Recipe(recipe);
            if(SearchObservers.length !== 0){
                this.updateIDArray.forEach(idUpdate => {
                    if(idUpdate === _Recipe._id){
                        this.createCard(_Recipe);
                        this._IngredientsTool.findTool(_Recipe,findIngredientIndexArray,SearchObservers);
                        this._AppliancesTool.findTool(_Recipe,findApplianceIndexArray,SearchObservers);
                        this._UstensilsTool.findTool(_Recipe,findUstensilIndexArray,SearchObservers);
                    }
                });
            }
            else{
                this.tamponIDArray.forEach(idTampon => {
                    this.createCard(idTampon,_Recipe);
                });
            }
        });
        this._IngredientsTool.updateTool(findIngredientIndexArray,this._IngredientsTool);
        this._AppliancesTool.updateTool(findApplianceIndexArray,this._AppliancesTool);
        this._UstensilsTool.updateTool(findUstensilIndexArray,this._UstensilsTool);
    }
}