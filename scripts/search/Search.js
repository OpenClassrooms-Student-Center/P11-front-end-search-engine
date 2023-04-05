class Search{
    constructor(search){
        this._search = search.toLowerCase();
        this.filterIdRecipes = [];
    }

    search(){
        return this.filterRecipes();
    }

    byIngredients(ingredients){
        let findIngredient = false;
        ingredients.forEach(Ingredient => {
            if(Ingredient.ingredient.toLowerCase() === this._search){
                findIngredient = true;
            }
        });
        return findIngredient
    }

    byAppliance(appliance){
        if(appliance.toLowerCase() === this._search){
            return true
        }
    }

    byUstensils(ustensils){
        let findUstensil = false;
        ustensils.forEach(ustensil => {
            if(ustensil.toLowerCase() === this._search){
                findUstensil = true;
            }
        });
        return findUstensil
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
        recipes.forEach(recipe => {
            const _recipe = new Recipe(recipe);
            // console.log(this.byIngredients(_recipe._ingredients))
            switch(this.tagType){
                case "ingredients":
                    if(this.byIngredients(_recipe._ingredients)){
                        this.filterIdRecipes.push(_recipe.id);
                    };
                    break;
                case "appliances":
                    if(this.byAppliance(_recipe._appliance)){
                        this.filterIdRecipes.push(_recipe.id);
                    };
                    break;
                case "ustensils":    
                    if(this.byUstensils(_recipe._ustensils)){
                        this.filterIdRecipes.push(_recipe.id);
                    };
            }
        });
        // console.log(this.filterIdRecipes);
        return this.filterIdRecipes
    }
}

class GlobalSearch extends Search{
    constructor(search){
        super(search);
    }

    filterRecipes(){
        recipes.forEach(recipe => {
            const _recipe = new Recipe(recipe);
            if(this.byIngredients(_recipe.ingredients) || 
                this.byTitle(_recipe.name) || this.byDescription(_recipe.description)){
                    this.filterIdRecipes.push(_recipe.id);
                }
        });
        return this.filterIdRecipes
    }
}

