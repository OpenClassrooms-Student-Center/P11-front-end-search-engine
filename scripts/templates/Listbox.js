class Listbox{
    constructor(tool,combobox, searchSubject, update){
        this.tool = tool;
        this.combobox = combobox;
        this._SearchSubject = searchSubject;
        this._Update = update;
        this.$listbox = tool.$wrapper.children[1];
        this.toolsList = [];
    }

    setToolsList(){
        const tamponList = [];
        recipes.map(recipe => {
            switch(this.$listbox.classList[1]){
                case "ingredients":
                    recipe.ingredients.map(obj => {
                        tamponList.push(obj.ingredient.toLowerCase());
                    });
                    break;
                case "appliances":
                    tamponList.push(recipe.appliance.toLowerCase());
                    break;
                case "ustensils":
                    recipe.ustensils.map(ustensil => {
                        tamponList.push(ustensil.toLowerCase());
                    });
            }
        });
        this.removeDuplicates(tamponList);
        console.log(this.toolsList);
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
                newTag.create(newLi);
                that.tool.closeHandleList(e,this);
                this.removeEventListener("ckick",e);
            });
        });    
    }

    removeDuplicates(testList){
        if(testList.length !== 0){
            this.toolsList = Array.from(new Set(testList));
        }
    }

    reset(){
        this.$listbox.children[0].innerHTML = "";
        this.setDOMList();
    }
}