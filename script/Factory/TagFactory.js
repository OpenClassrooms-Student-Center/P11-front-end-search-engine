/**
 *
 * @param { object } this.recipes
 * @param { string } tagType
 */
export default class TagFactory
 {
    constructor(recipes, tagType){
        this.recipes = recipes
        this.tagType = tagType
    }
    tag(){
        if (!this.recipes || this.recipes.length < 1) return []
        let typeTag = this.tagType
        let rawTags;
    
        switch (typeTag) {
            case "ingredients":
                rawTags = this.recipes
                    .map((recipe) => recipe.ingredients)
                    .reduce((prev, current) => prev.concat(current))
                    .map((ingredient) => ingredient.ingredient);
                break;
            case "appliances":
                rawTags = this.recipes.map((recipe) => recipe.appliance);
                break;
            case "ustensils":
                rawTags = this.recipes.map((recipe) => recipe.ustensils).reduce((prev, current) => prev.concat(current));
                break;
        }
    
        const uniqueTags = [...new Set(rawTags)];
        console.log(uniqueTags)
        return uniqueTags
    }
    
 }