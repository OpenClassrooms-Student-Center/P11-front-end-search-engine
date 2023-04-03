class App{
    constructor(){
        this.$main = document.querySelector("main");
        this.$section = document.createElement("section");
        this.$section.classList.add("articles");
        this.$searchInput = document.getElementById("search");
        this.$searchInput.style.background = "#E7E7E7";
        this.$main.appendChild(this.$section);
        this.$section.setAttribute("tabindex","0");
        this.$section.setAttribute("aria-label","Contenu des recettes");
        this.IDArraySearch = [];
        this._SearchSubject = new SearchSubject();
        this._Update = new Update(this);
    }

    main(){
        const that = this;
        let deleteBackwardCount = 0;
        this._Update.setup();
        this.$searchInput.addEventListener("input", function(e){
            if(e.target.value.length >= 3){
                that.IDArraySearch.splice(0,that.IDArraySearch.length);
                const _GlobalSearch = new GlobalSearch(e.target.value);
                that.IDArraySearch = _GlobalSearch.search();
                that._SearchSubject.subscribe(that.IDArraySearch);
                that._SearchSubject.fire(that._Update);
                deleteBackwardCount = 0;
            }
            else if(e.inputType === "deleteContentBackward" && deleteBackwardCount <= 1){
                deleteBackwardCount++;
                that._SearchSubject.unsubscribe(that.IDArraySearch);
                that.$section.innerHTML = "";
                that._Update.setup();
                that._Update.resetTool(that._Update._IngredientsTool);
                that._Update.resetTool(that._Update._AppliancesTool);
                that._Update.resetTool(that._Update._UstensilsTool);
            }
        });
    }
}

const app = new App();
app.main();