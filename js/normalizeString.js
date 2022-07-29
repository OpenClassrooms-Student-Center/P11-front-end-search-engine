function normalizeString(string){

    string = string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // les ligatures sont remplcées par des voyelles séparées.
    string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  
    return string;

}