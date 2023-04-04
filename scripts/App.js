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
        const _SearchSubject = new SearchSubject();
        const _Update = new Update(this);
        
        const _IngredientsTool = new Tool(document.querySelector(".menu1"),_SearchSubject,_Update);
        const _AppliancesTool = new Tool(document.querySelector(".menu2"),_SearchSubject,_Update);
        const _UstensilsTool = new Tool(document.querySelector(".menu3"),_SearchSubject,_Update);

        const _AppEvent = new AppEvent();

        _Update.setup();
        _IngredientsTool.setup(AppEvent,_SearchSubject,_Update);
        _AppliancesTool.setup(AppEvent,_SearchSubject,_Update);
        _UstensilsTool.setup(AppEvent,_SearchSubject,_Update);

        const that = this;
        this.$searchInput.addEventListener("input", function(e){
            _AppEvent.globalInputEvent(e,that,_SearchSubject,_Update,_IngredientsTool,_AppliancesTool,_UstensilsTool);
        });
    }
}

const _App = new App();
_App.main();