class Recipe{
    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }
    
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get servings(){
        return this._servings;
    }

    get ingredients(){
        return this._ingredients;
    }

    get time(){
        return this._time;
    }

    get description(){
        return this._description;
    }

    get appliance(){
        return this._appliance;
    }

    get ustensils(){
        return this._ustensils;
    }
}