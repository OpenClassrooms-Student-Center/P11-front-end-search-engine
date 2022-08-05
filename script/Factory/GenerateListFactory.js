import SearchDropDown from "../SearchDropDown.js";
import CardRecipesFactory from "./CardRecipesFactory.js";
import { closeAllFilter} from "../utils/utils.js"; 

export default class GenerateListFactory{
  constructor(recipes) {
    //console.log('je suis ici  sorted', recipes.length)
    this.recipes = recipes;
    closeAllFilter()
    this.tags = [];
  }
}
