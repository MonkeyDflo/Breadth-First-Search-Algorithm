////////////// SHIP SHIP SHIP SHIP  SHIP  SHIP  SHIP ////////////////////

function Ship(day){
    this.current_day = day;
    this.current_fuel = 6;
}

Ship.prototype.isFuelEmpty = function(){
    if(this.current_fuel == 0){
        //console.log(" !! FUEL EMPTY !! ");
        this.current_day = this.current_day +1; 
        //console.log(" ONE MORE DAY ON CURRENT PLANET "); 
        this.current_fuel = 6;
        //console.log(" FUEL IS FULL !! READY TO GO ON "); 
        return true;
    }
    return false;
}

Ship.prototype.Calcul_Fuel_Day = function (Planete, nb_parents, db){
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

        id_1 = Where_in_ORIGIN(db, name1);
        id_2 = Where_in_DESTINATION(db, name2);
        if( match_index(id_1, id_2) !== -1 ){
            // on fait le calcul avec destination 
            right_idx = match_index(id_1, id_2);
            //get_Travel_time (right_idx, db);
            value_travel_time = parseInt(db[right_idx].TRAVEL_TIME);
            this.current_day = this.current_day + value_travel_time; 
            this.current_fuel = this.current_fuel - value_travel_time;
            right_idx = -1;
        }
        else{
            id_1 = Where_in_DESTINATION(db, name1);
            id_2 = Where_in_ORIGIN(db, name2);
            if( match_index(id_1, id_2) !== -1 ){
                right_idx = match_index(id_1, id_2);
                value_travel_time = parseInt(db[right_idx].TRAVEL_TIME) ;
                this.current_day = this.current_day + value_travel_time; 
                this.current_fuel = this.current_fuel - value_travel_time;
                right_idx = -1;
            }
            else{
                console.log("error with parrent name and planete name");
            }
        }

        //

    }

}

Ship.prototype.setDay = function(Planet, db){
    var actual = Planet.getName(); 
    if(Planet.parent != null){
        var previous = Planet.parent.getName();
        var tab_actual = [];
        var tab_previous = [];
        var right_index =0; 
        tab_actual = Where_in_DESTINATION(db, actual);
        tab_previous = Where_in_ORIGIN(db, previous);
        for(var i =0; i<tab_actual.length; i++){
            for(var j=0; j<tab_previous.length; j++){
                if(tab_actual[i]==tab_previous[j]){
                    right_index = tab_actual[i];
                }
            }
        }
        this.isFuelEmpty(); 
        this.current_fuel = this.current_fuel - db[right_index].TRAVEL_TIME; 
        this.current_day= this.current_day + db[right_index].TRAVEL_TIME;  
    }
       
}

Ship.prototype.undoTraject = function(prev_destination, prev_origin, db){
    var right_index =0; 
    tab_prev_origin = Where_in_ORIGIN(db, prev_origin);
    tab_prev_destination = Where_in_DESTINATION(db, prev_destination);
        for(var i =0; i<tab_prev_origin.length; i++){
            for(var j=0; j<tab_prev_destination.length; j++){
                if(tab_prev_origin[i]==tab_prev_destination[j]){
                    right_index = tab_prev_origin[i];
                }
            }
        }
    //fuel was empty ? 
    this.current_fuel = this.current_fuel + db[right_index].TRAVEL_TIME; 
    this.current_day= this.current_day - db[right_index].TRAVEL_TIME;
}