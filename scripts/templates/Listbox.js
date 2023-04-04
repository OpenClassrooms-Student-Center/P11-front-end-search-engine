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

    setDOMList(SearchEvent,SearchSubject,Update,Tool,Combobox){
        const that = this;
        this.toolsList.sort(function(a,b){
            return a.localeCompare(b);
        });
        this.toolsList.map((tool,indexTool) => {
            const newLi = document.createElement("li"); 
            newLi.textContent = tool;
            this.$ul.appendChild(newLi);
            newLi.addEventListener("click", function(e){
                SearchEvent.liEvent(e,SearchSubject,Update,Tool,Combobox,that,this,indexTool);
            });
        });    
    }

    removeDuplicates(){
        if(this.tamponList.length !== 0){
            this.toolsList = Array.from(new Set(this.tamponList));
        }
    }

    reset(SearchEvent,Tool,Combobox){
        this.$ul.innerHTML = "";
        this.setDOMList(SearchEvent,Tool,Combobox);
    }
}