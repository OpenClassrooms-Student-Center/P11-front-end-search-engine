class Listbox{
    constructor(tool,combobox, searchSubject, update){
        this.tool = tool;
        this.combobox = combobox;
        this._SearchSubject = searchSubject;
        this._Update = update;
        this.$listbox = tool.$wrapper.children[1];
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
        this.setDOMList();
    }

    setDOMList(){
        let number = 0;
        const that = this;
        this.toolsList.sort(function(a,b){
            return a.localeCompare(b);
        });
        this.toolsList.map((tool,index) => {
            const newLi = document.createElement("li"); 
            newLi.textContent = tool;
            this.$listbox.children[0].appendChild(newLi);
            newLi.addEventListener("click", function(e){
                e.stopPropagation();
                that.toolsList.splice(index-number,1)
                number++;
                const newTag = new Tag(that,that._SearchSubject,that._Update);
                that.reset();
                newTag.create(newLi);
                that.tool.closeHandleList(e,this);
                this.removeEventListener("ckick",e);
            });
        });    
    }

    removeDuplicates(){
        if(this.tamponList.length !== 0){
            this.toolsList = Array.from(new Set(this.tamponList));
        }
    }

    reset(){
        this.$listbox.children[0].innerHTML = "";
        this.setDOMList();
    }
}