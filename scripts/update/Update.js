class Update{
    constructor(section,IDSearch){
        this.$section = section;
        this._IDSearch = IDSearch; 
        this.updateArray = [];
    }

    update(allIDObserver){
        this.$section.innerHTML = "";
        allIDObserver = Array.from(new Set(allIDObserver));
        recipes.forEach(recipe => {
            const _Recipe = new Recipe(recipe);
            if(allIDObserver.length !== 50){
                allIDObserver[0].map(IDObserver => {
                    this.createCard(IDObserver,_Recipe);
                });
            }
            else{
                allIDObserver.map(IDObserver => {
                    this.createCard(IDObserver,_Recipe);
                });
            }
        });
    }

    createCard(IDObserver,_Recipe){
        if(IDObserver === _Recipe.id){
            const _RecipeCard = new RecipeCard(_Recipe);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this.$section.appendChild($recipeArticle);
        }
    }
}