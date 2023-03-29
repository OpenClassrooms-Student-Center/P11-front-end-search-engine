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
    }

    main(){
        const that = this;
        const IngredientsTool = new Tool(document.querySelector(".menu1"),this._SearchSubject,this._Update);
        const AppliancesTool = new Tool(document.querySelector(".menu2"),this._SearchSubject,this._Update);
        const UstensilsTool = new Tool(document.querySelector(".menu3"),this._SearchSubject,this._Update);
        const _SearchSubject = new SearchSubject();
        const _Update = new Update(this.$section,IngredientsTool,AppliancesTool,UstensilsTool);
        _Update.setup();
        this.$searchInput.addEventListener("input", function(e){
            _SearchSubject.unsubscribe(that.IDArraySearch);
            if(e.target.value.length >= 3){
                that.IDArraySearch.splice(0,that.IDArraySearch.length);
                const _GlobalSearch = new GlobalSearch(e.target.value);
                that.IDArraySearch = _GlobalSearch.search();
                that._SearchSubject.subscribe(that.IDArraySearch);
                that._SearchSubject.fire(_Update);
                console.log(_SearchSubject);
            }
            else{
                console.log(_SearchSubject);
                that._SearchSubject.fire(_Update);
            }
        });
    }
}

const app = new App();
app.main();