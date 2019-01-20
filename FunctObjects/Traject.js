////////////// Object Traject /////////////////

/**
 * The object traject is principally made of a tab and a percentage.
 * It help us to determine more easily the percentage of chance of sucess 
 * of each valid path preselected. 
 */

function Traject(){
    this.tab = [];
    this.percentage = null;
    this.fuel = 6; 
    this.day = 0;
    this.position = null;  
}

/**
 * Determine if the attribut Fuel is empty and refuel and add one 
 * to the current day. 
 */
Traject.prototype.FuelEmpty = function(){
    if(this.fuel == 0){
        this.day = this.day + 1; 
        this.fuel = 6;
        //this.position doesn't change. 
        return true;
    }
    return false;
}

/**
 * Transform a planet object to a traject object. 
 * Fill the traject.tab. We fill it with name of planet and 
 * with "HP" which represent days passed in Hyper Space.
 */
Traject.prototype.FromPlanetToTraject = function(Planete, day, db){

    var num_parents = Planete.nbParent(Planete, day); 
    //Buffer arrays to have the index in ORIGIN and DESTINATION of 
    //the planet name we want. We do this to have the TRAVEL_TIME between two planets
    var id_1 = [];
    var id_2 = []; 
    var right_idx = -1; 
    var tab_pla = [];
    var k = 0;
    
    //Determine the previous planet (planet parent) and put it into a tab
    var curr_planete = Planete;
    tab_pla[ num_parents - k] = curr_planete.name;
    while(curr_planete.parent != null){
        curr_planete = curr_planete.parent; 
        k=k+1;
        tab_pla[ num_parents - k] = curr_planete.name;
    }
    
    for(var i=0; i<num_parents; i++){
        this.FuelEmpty() 
        var name1 = tab_pla[i];  
        var name2 = tab_pla[i+1];

        id_1 = WhereinORIGIN(db, name1);
        id_2 = WhereinDESTINATION(db, name2);

        if( matchIndex(id_1, id_2) !== -1 ){
           
            right_idx = matchIndex(id_1, id_2);
            
            value_travel_time = parseInt(db[right_idx].TRAVEL_TIME);

            for(var j = 0 ; j<= value_travel_time; j++){
                if(j==0){
                    this.tab[this.day+j]= name1;
                    this.position=name1;
                }
                if( (j > 0) && (j < value_travel_time) ){
                    this.tab[this.day+j]= "HP";
                    this.position="HP";
                }
                if( j == value_travel_time ) {
                    this.tab[this.day+j]= name2;
                    this.position=name2;
                }
            }
            
            this.day = this.day + value_travel_time; 
            this.fuel = this.fuel - value_travel_time;
            right_idx = -1;
        }
        else{
            id_1 = WhereinDESTINATION(db, name1);
            id_2 = WhereinORIGIN(db, name2);
            if( matchIndex(id_1, id_2) !== -1 ){
                right_idx = matchIndex(id_1, id_2);
                value_travel_time = parseInt(db[right_idx].TRAVEL_TIME) ;
                for(var j = 0 ; j<= value_travel_time; j++){
                    if(j==0){
                        this.tab[this.day+j]= name1;
                        this.position=name2;
                    }
                    if( (j > 0) && (j < value_travel_time) ){
                        this.tab[this.day+j]= "HP";
                        this.position="HP";
                    }
                    if( j == value_travel_time ) {
                        this.tab[this.day+j]= name2;
                        this.position=name2;
                    }
                }

                this.day = this.day + value_travel_time; 
                this.fuel = this.fuel - value_travel_time;
                right_idx = -1;
            }
            else{
                console.log("error with parrent name and planete name");
            }
        }
    }

    return this; 
}

/**
 * Take two tabs and the length of the two tabs. Usually the current tab of a valid traject
 * and the the traject's tab of the bounty hunters. Count the similarities and calcule with
 * this number the percentage of beign caught. 
 */
Traject.prototype.calculPercentage = function(tab_v, len_tab_v, tab_bd, len_tab_bd){
    var biggest_length = 0;
    var counter = 0;
    var proba = 0;
    //calculate the biggest length  
    if(len_tab_v >= len_tab_bd){
        biggest_length = len_tab_v;
    }
    else{
        biggest_length = len_tab_bd; 
    }

    for(var i =0; i < biggest_length; i++){
        if(tab_v[i]==tab_bd[i]){
            counter = counter + 1 ;
        }
    }
    // Sum of probabilities of chance of being captured
    if (counter > 0){
        for(var j=1; j<= counter; j++){
            proba = proba + (( Math.pow(9,j-1))/(Math.pow(10,j)));
        } 
    }
    // multiply by 100 to get the percentage
    return proba * 100; 
    
}
/**
 * Found the value of the best attribut percentage among traject 
 * in a tab of trajects. 
 */
Traject.prototype.bestPercentage = function(tab_results){
    var best_p = 0; 

        for(var i =0; i<tab_results.length; i++ ){
            console.log(tab_results[i].percentage);
            if(tab_results[i].percentage>best_p){
                best_p = tab_results[i].percentage;
                i=0;
            }
        }
       
    return best_p;
}

/**
 * Find among several object Traject the ones with the same attribut percentage 
 * as the given parameter best_proba. 
 */
Traject.prototype.whereBestPercentage = function(tab_results, best_proba){
    var tab_return = [];
    for(var i =0; i<tab_results.length; i++ ){ 
        if(tab_results[i].percentage==best_proba){
            tab_return.push(i);
        }
    }
    return tab_return;
}

/**
 * AddTrajectFromTraject will help us to create new traject and push it to the table of valid traject.
 * When we have traject of a lenght in day shorter than the countdown, 
 * We can create new traject from each traject like this. Just by added one more day on a planet different 
 * from the end planet. We will then calculate their percentage of chance of sucess with an other function.
 */
Traject.prototype.AddTrajectFromTraject = function(tab_results, no, departure, countdown){
    var tab_diff_element = []; // table with the different element in for a traject.tab of the the table tab_results
    var tab_buff = []; // just a tab buffer
    
    for(var i=0; i<tab_results.length; i++){

        if(tab_results[i].tab.length < countdown+1){
            // table of the different names found in the tab_results.tab
            tab_diff_element = diffInTable(tab_results[i].tab, no, departure);
            
            for(var j=0; j<tab_diff_element.length; j++){
                //clone tab_results[i].tab in tab_buff
                tab_buff = clone(tab_results[i].tab); 
                var new_traject = new Traject();
                //tab_diff_element[j] -> name of planet 
                //find the first element in the tab_results[i].tab
                var idx_founded = FindFirstEl(tab_results[i].tab, tab_diff_element[j]);

                if (idx_founded == undefined){
                    console.log(" There is a problem with tab_results and the different element in it !");
                }
                else{
                    //Splice is here used to add an elment at the idx_founded index 
                    //without affected the other elements in the table
                    tab_buff.splice(idx_founded, 0, tab_diff_element[j]);
                    // splice doesn't return the new tab
                    //Create a new traject, clone the tab with the new element in it
                    //and push it to tab_results 
                    new_traject.tab = clone(tab_buff);
                    tab_results.push(new_traject);
                }

            }

        }
    }
}   

