class Listbox{
    constructor(Tool){
        this._Tool = Tool;
        this._SearchSubject = Tool._SearchSubject;
        this._Update = Tool._Update;
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

    setDOMList(){
        let number = 0;
        const that = this;
        this.toolsList.sort(function(a,b){
            return a.localeCompare(b);
        });
        this.toolsList.map((tool,index) => {
            const newLi = document.createElement("li"); 
            newLi.textContent = tool;
            this.$ul.appendChild(newLi);
            newLi.addEventListener("click", function(e){
                e.stopPropagation();
                that.toolsList.splice(index-number,1)
                number++;
                const newTag = new Tag(that,that._SearchSubject,that._Update);
                that.reset();
                newTag.create(newLi);
                that._Tool.closeHandleList(e);
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
        this.$ul.innerHTML = "";
        this.setDOMList();
    }
}