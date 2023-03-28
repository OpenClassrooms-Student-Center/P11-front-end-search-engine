class Update{
    constructor(section){
        this.$section = section;
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
        if(allIDObserver.length !== 0){
            this.updateIDArray.map(idUpdate => {
                this.createCard(idUpdate)
            });
        }
        else{
            this.tamponIDArray.map(idTampon => {
                this.createCard(idTampon);
            });
        }
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

    createCard(idUpdate){
        recipes.map(recipe => {
            const _Recipe = new Recipe(recipe);
            if(idUpdate === _Recipe.id){
                const _RecipeCard = new RecipeCard(_Recipe);
                const $recipeArticle = _RecipeCard.getRecipesCardDOM();
                this.$section.appendChild($recipeArticle);
            }
        });
    }
}