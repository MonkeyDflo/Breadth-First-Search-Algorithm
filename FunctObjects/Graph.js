////////////// Object Graph /////////////////

/**
 * The Object Graph is here to be principally an array of Planet object.
 * Also an object containing other Planet Objects, graph, for maybe other utilities 
 * like display for the Front-End.
 * It has also a beginning and an end which can be usefull maybe in some cases. 
 */

/** Constructor */
function Graph(){
    // array of planet
    this.table_planets = [];
    this.graph={};
    this.beginning = null; 
    this.end = null;

}

/** Add a Planet Object to array table_planet */
Graph.prototype.addPlanet = function(p){
    //planet into an array 
    this.table_planets.push(p);
    var name = p.name;
    //planet into an "hash" table
    this.graph[name]= p;

}

/** Return the array table_planet */
Graph.prototype.getTablePlanets = function(){
    return this.table_planets;
}

/** Return a boolean depends on if the given name correspond to a Planet name
 * is the array table_planets
  */
Graph.prototype.isInTablePlanets = function(name){
    var index=-1; 

    for(var i = 0; i<this.table_planets.length; i++){
        if(this.table_planets[i].getName()==name){
           index = i;
        }
    }

    if (index != -1 ){
        return true; 
    }
    else{
        return false; 
    }
    
}

/** Return index of a given name founded in table_planet.
 * Other it returns -1.
 */
Graph.prototype.WhereInTablePlanets = function(name){
    var index=-1; 

    for(var i = 0; i<this.table_planets.length; i++){
        if(this.table_planets[i].getName()==name){
           index = i;
        }
    }

    if (index != -1 ){
        return index; 
    }
    else{
        return -1; 
    }
    
}

/** Set beginning attribut */
Graph.prototype.setBeginning = function(planet){
    this.beginning = planet; 
}
/** Return Beginning attibut */
Graph.prototype.getBeginning = function(planet){
    return this.beginning ; 
}

/** Set end attribut */
Graph.prototype.setEnd = function(planet){
    this.end = planet; 
}

/** Return end attribut */
Graph.prototype.getEnd = function(planet){
    return this.end; 
}