class App{
    constructor(){
        this.$main = document.querySelector("main");
        this.$section = document.createElement("section");
        this.$section.classList.add("articles");
        this.$globalSearchInput = document.getElementById("search");
        this.$globalSearchInput.style.background = "#E7E7E7";
        this.$main.appendChild(this.$section);
        this.$section.setAttribute("tabindex","0");
        this.$section.setAttribute("aria-label","Contenu des recettes");
        this.GlobalSearchArray = [];
    }

    main(){
        const _IngredientsTool = new Tool(document.querySelector(".menu1"));
        const _AppliancesTool = new Tool(document.querySelector(".menu2"));
        const _UstensilsTool = new Tool(document.querySelector(".menu3"));

        const _SearchSubject = new SearchSubject();
        const _Update = new Update(this,_IngredientsTool,_AppliancesTool,_UstensilsTool);
        const _AppEvent = new AppEvent(_SearchSubject,_Update);

        _Update.setup();
        _IngredientsTool.setup(_AppEvent);
        _AppliancesTool.setup(_AppEvent);
        _UstensilsTool.setup(_AppEvent);

        const that = this;
        let deleteBackwardCount = 0;
        this.$globalSearchInput.addEventListener("input", function(e){
            _AppEvent.globalInputEvent(e,that,deleteBackwardCount);
        });
    }
}

const _App = new App();
_App.main();