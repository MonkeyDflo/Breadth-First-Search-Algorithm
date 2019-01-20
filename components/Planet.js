////////////// Object Planet /////////////////
/**
 * The object Planet is defined with a name, an array connection ,which contains also Planet Objects, 
 * a bollean to know if it has been checked  and a parrent to know where we come from
 * 
 * It is the core of the algorithm and it is quite equal to a Node Object in a classic 
 * Bread first algoritm
 */

/** Constructor */
function Planet(name){
    this.name = name;
    // other planets with which it is connected 
    this.connection = [];
    this.checked = false; 
    this.parent = null; 

    this.getName = function () {
        return this.name;
    }

}

/** Return an object with attributs of this */
Planet.prototype.getPlanet = function(){
    return ({ Name : this.name,
        Connection : this.connection, 
        Checked : this.checked,
        Parent : this.parent
        }); 
}

/** Add a connection to the array connection */
Planet.prototype.addConnection = function(planet){
    this.connection.push(planet);
}

/** Define or redefine a connection at a precise index of the array connection */
Planet.prototype.setConnection = function(planet, i){
    this.connection[i]=planet;
}

/** Check if the name, usually a planet name, is in the connection array
 * Otherwise return false
 */
Planet.prototype.isInConnection = function(name){
var isinconnection = false;
    for(var i =0; i<this.connection.length; i++){
        if(this.connection[i]==name){
            isinconnection = true; 
        }
    }
    return isinconnection; 
}

/** Return the array connection of this */
Planet.prototype.getConnection = function(){
    return this.connection;
}

/** Set parent of this */
Planet.prototype.setParent = function(Planet){
    this.parent = Planet;
}

/** Get parent of this  */
Planet.prototype.getParent = function(){
    return this.parent;
}

/** Return if the Planet has been checked */
Planet.prototype.isChecked = function(){
    return this.checked;
}

/** Check the Planet, boolean checked becomes true */
Planet.prototype.Checked = function(){
    this.checked=true;
}

/** Boolean checked become False */
Planet.prototype.unChecked = function(){
    this.checked=false;
}

/** Return the number of parents by browsing to the previous parent again and again
 * We fix the limit of the for a loop to a number day passed by parameters to have  
 * a default value for incrementation that can be exceeded
 */
Planet.prototype.nbParent = function(planet, day){
    var compt = 0; 
    var buff = planet ;
    for(var i =0; i<day ; i++){
        if(buff.parent != null){
            compt = compt + 1 ;
            buff = buff.parent;
        }
    }
    return compt; 
}

/** Look for if parents names are the same as the current name
 * Which means the algorithm start to go in the other direction, 
 * no more from planet of departure to the wanted planet 
 */
Planet.prototype.isGoingBack = function(day){
    var isgoingback = false;
    var tab_pla = [];
    var k = 0; 
    var nb_parents = this.nbParent (this, day);

        var curr_planete = this;

        while(curr_planete.parent != null){
            curr_planete = curr_planete.parent; 
            k=k+1;
            tab_pla[ nb_parents - k] = curr_planete.name;
        }

        if( isInTable(tab_pla, this.name) ){
            //console.log(this.name);
            //console.log(" TRUE , IS GOING BACK ! "); 
            isgoingback =  true;
        }
        else{
            //console.log(this.name);
            //console.log(" FALSE , KEEP GOING ! "); 
            isgoingback =  false;
        }

    return isgoingback;    

} 