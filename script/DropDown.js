export default class DropDown {

    constructor(recipes) {
        //console.log('je suis ici  sorted', recipes.length)
        this.recipes = recipes
    }
    buildListIngredient(ingredient) {
        const listIngredients = document.createElement("li");
        listIngredients.classList.add(
            "list-items",
            "ingredient-item"
        );
        listIngredients.setAttribute('id', 'tag')
        listIngredients.setAttribute("data-item", ingredient)
        listIngredients.setAttribute("data-type", "ingredient")
        listIngredients.innerText = ingredient[0].toUpperCase() + ingredient.slice(1)


        return document.querySelector('.dropdown-list-ingredients').append(listIngredients)
    }
    buildListAppliances(appliance) {
        const listAppliances = document.createElement("li");
        listAppliances.classList.add(
            "list-items",
            "appliance-item"
        );
        listAppliances.setAttribute('id', 'tag')
        listAppliances.setAttribute("data-item", appliance)
        listAppliances.setAttribute("data-type", "appliance")
        listAppliances.innerText = appliance[0].toUpperCase() + appliance.slice(1)


        return document.querySelector('.dropdown-list-appliances').append(listAppliances)
    }
    buildListUstensils(ustensil) {
        const listUstensils = document.createElement("li");
        listUstensils.classList.add(
            "list-items",
            "ustensil-item"
        );
        listUstensils.setAttribute('id', 'tag')
        listUstensils.setAttribute("data-item", ustensil)
        listUstensils.setAttribute("data-type", "ustensil")
        listUstensils.innerText = ustensil[0].toUpperCase() + ustensil.slice(1)

        return document.querySelector('.dropdown-list-ustensils').append(listUstensils)
    }

    displayIngredients() {

        document.querySelectorAll(".ingredient-item").forEach( (elt)=>{ elt.remove() } )
       
        document.querySelector(".ingredients ").addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()

            document.querySelector('.ingredients').classList.toggle("expanded")

            console.log("this RR", this.recipes)

            const tableauIngredients = []
            this.recipes.forEach(recipe => {
                const recipeIngredients = recipe.ingredients
                recipeIngredients.forEach((ingredients) => {
                    //  console.log(ingredients) 
                    const ingredient = ingredients.ingredient.toLowerCase()
                    if (!tableauIngredients.includes(ingredient)) {
                        tableauIngredients.push(ingredient)
                        // const sortIngredient = sort(this.tableauIngredients)ingredient
                        return this.buildListIngredient(ingredient)
                    }

                    //const doubleDelete = tableauIngredients.filter((item, index, arr) => arr.indexOf(item) == index)
                })
            })
            console.log("Ingrédients", tableauIngredients)
        })
    }
    displayAppliances() {
        document.querySelectorAll(".appliance-item").forEach( (elt)=>{ elt.remove() } )
        document.querySelector(".appliances").addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()

            document.querySelector('.appliances').classList.toggle("expanded")

            console.log("this RR", this.recipes)

            const tableauAppliances = []
            this.recipes.forEach(recipe => {
                const recipeAppliance = recipe.appliance.toLowerCase()
                if (!tableauAppliances.includes(recipeAppliance)) {
                    tableauAppliances.push(recipeAppliance)
                    return this.buildListAppliances(recipeAppliance)
                }
            })
            console.log("Appliances",tableauAppliances)
        })
       
    }
    displayUstensils() {
        document.querySelectorAll(".ustensil-item").forEach( (elt)=>{ elt.remove() } )
 
        document.querySelector(".ustensils").addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()

            document.querySelector('.ustensils').classList.toggle("expanded")

            console.log("this RR", this.recipes)

            const tableauUstensils = []
            this.recipes.forEach(itemUstensils => {
                itemUstensils.ustensils.forEach((ustensil) => {
                    const ustensilItem = ustensil.toLowerCase()
                    // console.log(toLower)
                    if (!tableauUstensils.includes(ustensilItem )) {

                        tableauUstensils.push(ustensilItem )

                        return this.buildListUstensils(ustensilItem)
                    }
                }) 
                console.log("Ustensils",tableauUstensils)
            })
           
        })
    }
     /* removeIngredients(){
        console.log(listAppliances)
      switch(type){

        }
        document.querySelector('.dropdown-list-ingredients').innerHTML = ''
        document.querySelector('.dropdown-list-appliances').innerHTML = ''
        document.querySelector('.dropdown-list-ustensils').innerHTML = ''
     }*/
}