class Search{
    constructor(search){
        this._search = search.toLowerCase();
        this.filterIdRecipes = [];
    }

    search(){
        return this.filterRecipes();
    }

    byIngredients(ingredients){
        return ingredients.filter(ingredient =>
            ingredient.ingredient.toLowerCase() === this._search);
    }

    byAppliance(appliance){
        if(appliance.toLowerCase() === this._search){
            return true
        }
        return false
    }

    byUstensils(ustensils){
        return ustensils.filter(ustensil => 
            ustensil.toLowerCase() === this._search);
    }

    byTitle(title){
        if(title.toLowerCase().includes(this._search)){
            return true
        }
        return false
    }

    byDescription(description){
        if(description.toLowerCase().includes(this._search)){
            return true
        }
        return false
    }
}

class TagSearch extends Search{
    constructor(Tag){
        super(Tag.$wrapper.innerHTML);
        this.tagType = Tag.type;
    }

    filterRecipes(){
        recipes.map(recipe => {
            const _recipe = new Recipe(recipe);
            switch(this.tagType){
                case "ingredients":
                    if(this.byIngredients(_recipe._ingredients).length !== 0){
                        this.filterIdRecipes.push(_recipe.id);
                    };
                    break;
                case "appliances":
                    if(this.byAppliance(_recipe.appliance)){
                        this.filterIdRecipes.push(_recipe.id);
                    };
                    break;
                case "ustensils":    
                    if(this.byUstensils(_recipe.ustensils).length !== 0){
                        this.filterIdRecipes.push(_recipe.id);
                    };
            }
        });
        return this.filterIdRecipes
    }
}

class GlobalSearch extends Search{
    constructor(search){
        super(search);
    }

    filterRecipes(){
        recipes.map(recipe => {
            const _recipe = new Recipe(recipe);
            if(this.byIngredients(_recipe.ingredients).length !== 0 || 
                this.byTitle(_recipe.name) || this.byDescription(_recipe.description)){
                    this.filterIdRecipes.push(_recipe.id);
                }
        });
        return this.filterIdRecipes
    }
}

