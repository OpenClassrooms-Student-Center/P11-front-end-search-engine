class Listbox{
    constructor(Tool){
        this.$listbox = Tool.$wrapper.children[1];
        this.$ul = Tool.$wrapper.children[1].children[0];
        this.toolsList = [];
        this.tamponList= [];
    }

    setToolsList(){
        recipes.map(recipe => {
            switch(this.$listbox.classList[1]){
                case "ingredients":
                    recipe.ingredients.map(obj => {
                        this.tamponList.push(obj.ingredient.toLowerCase());
                    });
                    break;
                case "appliances":
                    this.tamponList.push(recipe.appliance.toLowerCase());
                    break;
                case "ustensils":
                    recipe.ustensils.map(ustensil => {
                        this.tamponList.push(ustensil.toLowerCase());
                    });
            }
        });
        this.removeDuplicates();
    }

    setDOMList(AppEvent,Tool,Combobox){
        this.toolsList.sort(function(a,b){
            return a.localeCompare(b);
        });
        const that = this;
        this.toolsList.map((tool,indexTool) => {
            const newLi = document.createElement("li"); 
            newLi.textContent = tool;
            this.$ul.appendChild(newLi);
            newLi.addEventListener("click", function(e){
                AppEvent.liClickEvent(e,Tool,Combobox,newLi,indexTool);
            });
        });    
    }

    removeDuplicates(){
        if(this.tamponList.length !== 0){
            this.toolsList = Array.from(new Set(this.tamponList));
        }
    }

    reset(AppEvent,Tool,Combobox){
        this.$ul.innerHTML = "";
        this.setDOMList(AppEvent,Tool,Combobox);
    }
}