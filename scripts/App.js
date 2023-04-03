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
        this._Update.setup();
        this.$searchInput.addEventListener("input", function(e){
            if(that._SearchSubject.IDobservers.length !== 0){
                that._SearchSubject.unsubscribe(that.IDArraySearch);
            }
            if(e.target.value.length >= 3){
                that.IDArraySearch.splice(0,that.IDArraySearch.length);
                const _GlobalSearch = new GlobalSearch(e.target.value);
                that.IDArraySearch = _GlobalSearch.search();
                that._SearchSubject.subscribe(that.IDArraySearch);
                that._SearchSubject.fire(that._Update);
            }
            else{
                that.$section.innerHTML = "";
                that._Update.setup();
            }
        });
    }
}

const app = new App();
app.main();