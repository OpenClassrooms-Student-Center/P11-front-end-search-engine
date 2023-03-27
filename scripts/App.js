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
        this.RecipesID = [];
        this.tampon =[];
        this.tagList = [];
        this._SearchSubject = new SearchSubject();
        this._Update = new Update(this.$section);
        this.IngredientsMenu = new ToolsMenu(document.querySelector(".menu1"),this._SearchSubject,this._Update);
        this.AppliancesMenu = new ToolsMenu(document.querySelector(".menu2"),this._SearchSubject,this._Update);
        this.UstensilsMenu = new ToolsMenu(document.querySelector(".menu3"),this._SearchSubject,this._Update);
    }

    main(){
        const that = this;
        recipes.forEach(recipe => {
            const _Recipe = new Recipe(recipe);
            const _RecipeCard = new RecipeCard(_Recipe);
            this.RecipesID.push(_Recipe._id);
            const $recipeArticle = _RecipeCard.getRecipesCardDOM();
            this.$section.appendChild($recipeArticle);
        }); 
        this.$searchInput.addEventListener("input", function(e){
            if(e.target.value.length >=3){
                that._SearchSubject.unsubscribe(that.tampon);
                that.tampon.splice(0,that.tampon.length);
                const _GlobalSearch = new GlobalSearch(e.target.value);
                const IDArraySearch = _GlobalSearch.search();
                IDArraySearch.map(IDSearch => {
                    that.tampon.push(IDSearch);
                });
                that._SearchSubject.subscribe(that.tampon);
                that._SearchSubject.fire(that._Update);
            }
            else{
                console.log(that.RecipesID);
                that._Update.update(that.RecipesID);
            }
        });
    }
}

const app = new App();
app.main();