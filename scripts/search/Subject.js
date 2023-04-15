class SearchSubject{
    constructor(){
        this.SearchObservers = [];
    }

    subscribe(SearchObserver){
        this.SearchObservers.push(SearchObserver);
    }

    unsubscribe(SearchObserver){
        this.SearchObservers = this.SearchObservers.filter(_SearchObserver => _SearchObserver !== SearchObserver);
    }

    fire(Observer){
        // console.log(this.SearchObservers);
        Observer.update(this.SearchObservers);
    }
}