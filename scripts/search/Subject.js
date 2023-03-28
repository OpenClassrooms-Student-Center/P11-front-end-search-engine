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

    fire(observer){
        observer.update(this.IDobservers);
    }
}