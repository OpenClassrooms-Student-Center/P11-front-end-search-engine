class SearchSubject{
    constructor(){
        this.IDobservers = [];
    }

    subscribe(_IDobserver){
        this.IDobservers.push(_IDobserver);
    }

    unsubscribe(_IDobserver){
        this.IDobservers = this.IDobservers.filter(IDobserver => IDobserver !== _IDobserver);
    }

    fire(observer,IngredientsTool,AppliancesTool,UstensilsTool){
        // console.log(this.IDobservers);
        observer.update(this.IDobservers,IngredientsTool,AppliancesTool,UstensilsTool);
    }
}