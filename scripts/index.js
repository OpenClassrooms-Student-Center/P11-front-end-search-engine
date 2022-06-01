class dataRecettes {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.quantity = data.quantity
        this.unit = data.unit
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
    }

    //CREATION DES CARTES DES RECETTES
    creaCarteDom(){
        const article = document.createElement("article");
        article.classList.add("carte_recette");

        const img = document.createElement("img");

        const titreDuree = document.createElement("div");
        titreDuree.classList.add("titre_duree");
        article.appendChild(img);
        article.appendChild(titreDuree);

        const h1 = document.createElement("h1");
        h1.textContent = this.name;
        titreDuree.appendChild(h1);

        const iconeTimeDiv = document.createElement("div") ;
        const icone = document.createElement("i");
        icone.className = "far fa-clock";
        const time = document.createElement("span");
        time.classList.add("time");
        time.textContent = this.time + " "+ "min";
        iconeTimeDiv.appendChild(icone);
        iconeTimeDiv.appendChild(time);
        titreDuree.appendChild(iconeTimeDiv);

        const detail = document.createElement("div");
        detail.classList.add("detail");
        article.appendChild(detail);

        const detailRecette = document.createElement("div");
        detailRecette.classList.add("detail_recette");
        detail.appendChild(detailRecette);


        //parcourir le tableau des ingredients
        const ingredients = this.ingredients;
        

        ingredients.forEach(ingredient => {
            
            const h2 = document.createElement("h2");
            //Ne pas afficher les deux points quand il n'y a pas de quantité
            if (! ingredient.quantity){
                h2.textContent = ingredient.ingredient;
            }
            else {
                h2.textContent = ingredient.ingredient + " " + ":";
            }
            
            detailRecette.appendChild(h2);

            const quantite = document.createElement("p");

            //Ne pas afficher de valeur nulle pour unite si elle n'est pas présente dans recipes.js
            if (! ingredient.unit){
                quantite.textContent = ingredient.quantity;
            }
            //Modifier le mot "grammes" par "g"
            else if (ingredient.unit == "grammes"){
                quantite.textContent =  " " + ingredient.quantity + " "+ "g";
            }
            else{
                quantite.textContent= " " + ingredient.quantity + " " +  ingredient.unit;
            }
            
            h2.appendChild(quantite);

        });

        const commentaire = document.createElement("div");
        commentaire.classList.add("detail_commentaire");
        commentaire.textContent = this.description;
        detail.appendChild(commentaire);

        return article;
    }
}












