class Listbox{
    constructor(Combobox){
        this.$wrapper = Combobox.$wrapper.children[2];
        this.toolsList = [];
        this.tamponList= [];
    }

    setToolsList(){
        recipes.map(recipe => {
            switch(this.$wrapper.classList[1]){
                case "ingredients":
                    recipe.ingredients.forEach(obj => {
                        this.tamponList.push(obj.ingredient[0].toUpperCase() + obj.ingredient.substring(1));
                    });
                    break;
                case "appliances":
                    this.tamponList.push(recipe.appliance[0].toUpperCase() + recipe.appliance.substring(1));
                    break;
                case "ustensils":
                    recipe.ustensils.forEach(ustensil => {
                        this.tamponList.push(ustensil[0].toUpperCase() + ustensil.substring(1));
                    });
            }
        });
        this.removeDuplicates();
    }

    resetDOMList(AppEvent,Tool){
        this.$wrapper.innerHTML = "";
        this.toolsList.sort(function(a,b){
            return a.localeCompare(b);
        });
        const that = this;
        this.toolsList.forEach((tool,indexTool) => {
            const newLi = document.createElement("li"); 
            newLi.textContent = tool;
            this.$wrapper.appendChild(newLi);
            newLi.addEventListener("click", function(e){
                if(Tool._Combobox.$input.value.length >= 3){
                    that.resetDOMList(AppEvent,Tool);
                }
                AppEvent.liClickEvent(e,Tool,newLi,indexTool);
            });
        });
    }

    removeDuplicates(){
        if(this.tamponList.length !== 0){
            this.toolsList = Array.from(new Set(this.tamponList));
        }
    }
}