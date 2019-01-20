////////////// Functions /////////////////

/**
 * Find indexes where planet_name has been found in row ORIGIN
 */
function WhereinORIGIN(db, planet_name){
    var where_ORIGIN = [];
    var compteur = 0; 

    for(var i=0; i<db.length; i++){
        if(db[i].ORIGIN==planet_name){
            where_ORIGIN[compteur]=i;
            compteur=compteur+1;
        }
    }
    return where_ORIGIN; 
}
/**
 * Find indexes where planet_name has been found in row DESTINATION
 */
function WhereinDESTINATION(db, planet_name){
    var where_DESTINATION = [];
    var compteur = 0; 

    for(var i=0; i<db.length; i++){
        if(db[i].DESTINATION==planet_name){
            where_DESTINATION[compteur]=i;
            compteur=compteur+1;
        }
    }
    return where_DESTINATION; 
}

/**
 * Find indexes where element has been found in the table db
 */
function WhereinTable(db, element){
    var where_element = [];
    var compteur = 0;

    for(var i =0; i<db.length; i++){
        if(db[i].name==element){
            where_element[compteur]=i;
            compteur=compteur+1;
        }
    } 
    return where_element; 
}

/**
 * Check if the element is in the table 
 */
function isInTable(table, name){
    var is_element = false;
   
    for(var i=0; i<table.length; i++){
        if(table[i].name != null) {
            if(table[i].name==name){
                is_element = true;
            }
        }
        else{
            if(table[i]==name){
                is_element = true;
            }
        }
    }
    return is_element; 
}

/**
 * Look for same number in two different table
 */
function matchIndex(table1, table2){
    var right_indx = -1; 
    if(( table1.length !== 0) && (table2.length !== 0) ){

        for(var i =0; i<table1.length; i++){
            for(var j=0; j<table2.length; j++){
                if(table1[i]==table2[j]){
                    right_indx = table1[i];
                    //console.log(" le bon index est : " + right_indx);
                }
            }
        }

    }
    return right_indx;
}

/**
 * Find different elements in a table and doesn't look for 
 * element contained in the table notWatch
 * Take also the departure to add it directly to the returning tab 
 */
function diffInTable(table, notWatch, departure){
    var array_diff_p = [];
    //Where_in_table(db, element)
    var compt = 0; 
    array_diff_p.push(departure); 

    for(var i=0; i< table.length; i++){
        if( array_diff_p.length !== 0){
            for(var j = 0; j<array_diff_p.length; j++){
                //go to check in array notWath if table[i] doesn't have to be watch
                var found1 = notWatch.find(function(element) {
                    return element == table[i] ;
                  });
                var found2 = array_diff_p.find(function(element) {
                    return element == table[i] ;
                });
                //if nothing found, found === undefined  
                //if table[i] is different from array_diff_p[j] 
                if( (found1 === undefined) &&  ( found2 === undefined ) )
                {    
                    array_diff_p.push(table[i]);
                }
            }

        }
        
        
    }
    return array_diff_p;
}

/**
 * Find the first element in a table. If the element is not find return undefined
 */
function FindFirstEl(table, element){
    var idx; 
    for(var i=0; i<table.length; i++){
        if( table[i] == element){
            idx = i;
            break; 
        }
    }
    return idx;
}

/**
 * Function to clone an object  
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
