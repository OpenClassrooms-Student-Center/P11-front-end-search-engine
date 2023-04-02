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
        const _SearchSubject = new SearchSubject();
        const IngredientsTool = new Tool(document.querySelector(".menu1"),_SearchSubject);
        const AppliancesTool = new Tool(document.querySelector(".menu2"),_SearchSubject);
        const UstensilsTool = new Tool(document.querySelector(".menu3"),_SearchSubject);
        const _Update = new Update(this.$section,IngredientsTool,AppliancesTool,UstensilsTool);
        _Update.setup();
        this.$searchInput.addEventListener("input", function(e){
            if(_SearchSubject.IDobservers.length !== 0){
                _SearchSubject.unsubscribe(that.IDArraySearch);
            }
            if(e.target.value.length >= 3){
                that.IDArraySearch.splice(0,that.IDArraySearch.length);
                const _GlobalSearch = new GlobalSearch(e.target.value);
                that.IDArraySearch = _GlobalSearch.search();
                _SearchSubject.subscribe(that.IDArraySearch);
                _SearchSubject.fire(_Update);
            }
            else{
                that.$section.innerHTML = "";
                _Update.setup();
            }
        });
    }
}

const app = new App();
app.main();