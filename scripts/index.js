function init(){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const listOfRecipes = [];
    section.setAttribute("tabindex","0");
    section.setAttribute("aria-label","Contenu des recettes");
    recipes.forEach(recipe => {
        recipesModel = recipesFactory(recipe);
        const recipeArticle = recipesModel.getRecipesCardDOM();
        section.appendChild(recipeArticle);
        listOfRecipes.push(recipeArticle);
    });
    main.appendChild(section);
    document.getElementById("search").addEventListener("input", function(e){
        const search = e.target.value.toLowerCase();
        if(search.length >= 3){
            const searchRegex = new RegExp(search);
            const index = [];
            console.log(index);
            let nbrDelete = 0;
            // console.log(listOfRecipes);
            // console.log(searchRegex);
            listOfRecipes.forEach(recipe     => {
                if(!recipe.children[0].children[0].children[0].textContent.toLowerCase().match(searchRegex)){
                    index.push(listOfRecipes.indexOf(recipe));
                }
            });
            if(index !== []){
                //on supprime les articles correspondants
                index.forEach(index => {
                    listOfRecipes.splice(index-nbrDelete,1);
                    section.removeChild(section.children[index-nbrDelete]);
                    nbrDelete += 1;
                });
            }
            else{
                
            }
        }
    });
} 

init();

