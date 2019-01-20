////////////// Object Ship /////////////////

/** Constructor */
function Ship(day){
    this.current_day = day;
    this.current_fuel = 6;
}

/**Destermine if this.current_fuel is empty.
 * If it is the case we add +1 to this.current_fuel.
 * And we reset this.current_fuel to 6.
 */
Ship.prototype.isFuelEmpty = function(){
    if(this.current_fuel == 0){
        this.current_day = this.current_day +1; 
        this.current_fuel = 6;
        return true;
    }
    return false;
}

/**
 * Caculate the current fuel and the current day from the previous parents of the planets
 * and the current planet.
 */
Ship.prototype.CalculFuelDay = function (Planete, nb_parents, db){
    var id_1 = [];
    var id_2 = []; 
    var right_idx = -1; 
    var tab_pla = [];
    var k = 0;
 
    var curr_planete = Planete;
    tab_pla[ nb_parents - k] = curr_planete.name;
    while(curr_planete.parent != null){
        curr_planete = curr_planete.parent; 
        k=k+1;
        tab_pla[ nb_parents - k] = curr_planete.name;
    }


    for(var i=0; i<nb_parents; i++){
        this.isFuelEmpty();
        var name1 = tab_pla[i];  
        var name2 = tab_pla[i+1];

        id_1 = WhereinORIGIN(db, name1);
        id_2 = WhereinDESTINATION(db, name2);
        if( matchIndex(id_1, id_2) !== -1 ){
            // on fait le calcul avec destination 
            right_idx = matchIndex(id_1, id_2);
            //get_Travel_time (right_idx, db);
            value_travel_time = parseInt(db[right_idx].TRAVEL_TIME);
            this.current_day = this.current_day + value_travel_time; 
            this.current_fuel = this.current_fuel - value_travel_time;
            right_idx = -1;
        }
        else{
            id_1 = WhereinDESTINATION(db, name1);
            id_2 = WhereinORIGIN(db, name2);
            if( matchIndex(id_1, id_2) !== -1 ){
                right_idx = matchIndex(id_1, id_2);
                value_travel_time = parseInt(db[right_idx].TRAVEL_TIME) ;
                this.current_day = this.current_day + value_travel_time; 
                this.current_fuel = this.current_fuel - value_travel_time;
                right_idx = -1;
            }
            else{
                console.log("error with parrent name and planete name");
            }
        }

       

    }

}



