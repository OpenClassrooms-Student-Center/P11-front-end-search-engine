class RecipeCard{
    constructor(Recipe){
        this._Recipe = Recipe;
        this.$wrapper = document.createElement("article");
        this.$figure = document.createElement("figure");
        this.$figcaption = document.createElement("figcaption");
        this.$headerFigcaption = document.createElement("header");
        this.$divPresentation = document.createElement("div");
        this.$h2 = document.createElement("h2");
        this.$strong = document.createElement("strong");
        this.$pTime = document.createElement("p");
        this.$ul = document.createElement("ul");
        this.$pDescription = document.createElement("p");
    }

    getRecipesCardDOM(){
        this.$pDescription.textContent = this._Recipe.description;
        this.$pDescription.classList.add("ellipsis");
        this._Recipe._ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            if(ingredient.unit !== undefined){
                li.innerHTML = `<p><strong>${ingredient.ingredient}:\xA0</strong>${ingredient.quantity}${getSpacing(ingredient.unit.toLowerCase())}</p>`;
            }else
            if(ingredient.quantity !== undefined){
                li.innerHTML = `<p><strong>${ingredient.ingredient}:\xA0</strong>${ingredient.quantity}</p>`;
            }
            else{
                li.innerHTML = `<p><strong>${ingredient.ingredient}</strong></p>`;
            }
            this.$ul.appendChild(li);
        });
        this.$divPresentation.appendChild(this.$ul);
        this.$divPresentation.appendChild(this.$pDescription);
        this.$pTime.textContent = `${this._Recipe.time} min`;
        this.$h2.textContent = this._Recipe.name;
        this.$strong.appendChild(this.$pTime);
        this.$headerFigcaption.appendChild(this.$h2);
        this.$headerFigcaption.appendChild(this.$strong);
        this.$figcaption.appendChild(this.$headerFigcaption);
        this.$figcaption.appendChild(this.$divPresentation);
        this.$figure.appendChild(this.$figcaption);
        this.$wrapper.appendChild(this.$figure);
        return this.$wrapper;
    }
}

function getSpacing(unit){
    if(unit !== "ml" && unit !== "cl" && unit !== "grammes" && unit !== "litre"){
        return `\xA0${unit}`
    }else
    if(unit === "grammes"){
        return "g"
    }else
    if(unit === "litre"){
        return "L"
    }
    else{
        return unit
    }
}