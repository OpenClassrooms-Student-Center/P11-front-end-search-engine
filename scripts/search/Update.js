class Update{
    constructor(section,ingredientTool,applianceTool, ustensilTool){
        this.$section = section;
        this.IngredientTool = ingredientTool;
        this.ApplianceTool = applianceTool;
        this.UstensilTool = ustensilTool;
        this.updateIDArray = [];
        this.tamponIDArray = [];
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
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            if(allIDObserver.length !== 0){
                this.updateIDArray.map(idUpdate => {
                    this.createCard(idUpdate,_Recipe);
                    this.updateTool(this.IngredientTool,_Recipe);
                    this.updateTool(this.ApplianceTool,_Recipe);
                    this.updateTool(this.UstensilTool,_Recipe);
                });
            }
            else{
                this.tamponIDArray.map(idTampon => {
                    this.createCard(idTampon,_Recipe);
                });
            }
        });
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

    createCard(idUpdate,Recipe){
        if(idUpdate === Recipe.id){
            const _RecipeCard = new RecipeCard(Recipe);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this.$section.appendChild($recipeArticle);
        }
    }

    updateTool(listbox,Recipe){
        let indexDelete = 0;
        listbox.toolsList.map((tool,index) => {
            switch(toolsList.tool)
            if(Recipe.) 
            listbox.$listbox.children[0].removeChild(listbox.$listbox.children[0].children[index-indexDelete]);
            indexDelete++;
        });
    }
}