const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname + "/FunctObjects/Planet.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/FunctObjects/Graph.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/FunctObjects/Ship.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/FunctObjects/Functions.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/FunctObjects/Traject.js"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// EXTRACT DATA & NAME OF SQLITE DATABASE
let rawdata_m_falcon = fs.readFileSync('millenium-falcon.json');  
let millenium = JSON.parse(rawdata_m_falcon);
console.log(millenium);

//  UPLOAD EMPIRE.JSON FILE 
app.use(fileUpload());
 
app.listen(8080)

let db = new sqlite3.Database(millenium.routes_db, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
});

let sql = `SELECT ORIGIN, DESTINATION, TRAVEL_TIME FROM ROUTES `;

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }

    app.post('/upload', function (req, res) {
        console.log('called')
        
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }
        var date = 0; 
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.name;
        //date = Date.now(); 
        //console.log(date);
        sampleFile.mv("EmpireFiles/" + sampleFile.name, function(err) {
            if (err)
            return res.status(500).send(err);
            console.log("file upload");
        });

            fs.readFile("EmpireFiles/" + sampleFile.name, function read(err, rawdata_empire) {
                if (err) {
                    throw err;
                }
                let empire = JSON.parse(rawdata_empire); 
                
                //PROCESSING DATA
                
                universe = new Graph();

                //add all the planets from the universe data base to the graph table_planets 
                for(var i = 0; i< rows.length; i++){
                    // Create a new object planet with the name of curent row founded in ORIGIN
                    var p = new Planet(rows[i].ORIGIN);
                    // if it is not table_planet of the object Graph universe
                    if(  !universe.isInTable_Planets(p.getName()) ){ 
                    //on regarde dans la bd où on le retrouve 
                        for(var j =0; j<rows.length; j++){
                            if( (p.getName() == rows[j].ORIGIN) && (!p.isInConnection(rows[j].DESTINATION)) ){
                            //Create a new Planet to add it to table connections of p
                            var p_buff = new Planet(rows[j].DESTINATION); 
                            p.addConnection(p_buff);
                            }   
                        }
                        
                        for(var j =0; j<rows.length; j++){
                            if( (p.getName() == rows[j].DESTINATION) && (!p.isInConnection(rows[j].ORIGIN)) ){
                                var p_buff = new Planet(rows[j].ORIGIN);
                                p.addConnection(p_buff);
                        }   
                    }
                    universe.addPlanet(p);
                    }
                    else{
                        //console.log("already in table_planets ! "); 
                    }
                    //Exactly the same but we are looking for new planet name in the DESTINATION row
                    var p2 = new Planet(rows[i].DESTINATION);
                    if(  !universe.isInTable_Planets(p2.getName()) ){ 
                        //Fill connections tab  
                        for(var j =0; j<rows.length; j++){
                            if( (p2.getName() == rows[j].ORIGIN) && (!p2.isInConnection(rows[j].DESTINATION)) ){
                                var p_buff = new Planet(rows[j].DESTINATION);
                                p2.addConnection(p_buff);
                            }   
                        }
                        for(var j = 0; j<rows.length; j++){
                            if( (p2.getName() == rows[j].DESTINATION) && (!p2.isInConnection(rows[j].ORIGIN)) ){
                                var p_buff2 = new Planet(rows[j].ORIGIN);
                                p2.addConnection(p_buff2);
                            }  
                        }
                        universe.addPlanet(p2);
                    }
                    else{
                        //console.log("already in table_planets ! "); 
                    }
                }
                /*
                for(var i =0; i<universe.table_planets.length; i++){
                    for(var j =0; j<universe.table_planets[i].connection.length; j++){
                    var name = universe.table_planets[i].connection[j].getName();
                    var index_in_Table_planets = universe.Where_InTable_Planets(name);
                    var planet = universe.table_planets[index_in_Table_planets];
                    }
                }
                */

            //set beginning attribut of the universe object
            var index_departure = universe.Where_InTable_Planets(millenium.departure);
            var p3 = universe.table_planets[index_departure];
            universe.setBeginning(p3); 

            //set end attribut of the universe object
            var index_arrival = universe.Where_InTable_Planets(millenium.arrival);
            var p4 = universe.table_planets[index_arrival];
            universe.setEnd(p4); 
            
            //creat a tab queue for our bread first serach algoritm
            var queue = [];
            var tab_results = []; // tab of planet objects

            // We need the first planet 
            var start = universe.getBeginning();
            var end = universe.getEnd().getName();
            queue.push(start); // ADDED TO THE QUEUE  
            /** Create a new object Ship to calculate after the fuel used and the need to 
             * one more day on the current planet
             * */ 
            var millenium_falcon = new Ship(0);
            //////////////////////////////////////////////
            console.log("**************** ((( BEGIN SPACE TRAVEL ))) **************************");
            ////////////////////////////////////////////////
            while(queue.length > 0){
                //Take the first element of the queue
                var current = queue.shift();
                var nb_parents =  current.nbParent(current,empire.countdown);
                //Use the number of previous planets visited to calculate fuel used and the current day
                millenium_falcon.Calcul_Fuel_Day(current, nb_parents, rows);

                if ( (current.getName() == end) 
                && (millenium_falcon.current_day <= empire.countdown)
                ){
                    // !!!! FOUND !!!!!
                    //send current to tab_results
                    tab_results.push(current);
                    //reset current_day and current_fuel
                    millenium_falcon.current_day = 0;
                    millenium_falcon.current_fuel = 6;
                }
                else{
                    // reset current_day and current_fuel
                    millenium_falcon.current_day = 0;
                    millenium_falcon.current_fuel = 6;
                }
                //set connections of current planet
                var connection = current.connection;
                for (var i =0; i<connection.length; i++){
                    /*we looking for in table_planet a planet which has the same name
                    to set its connections */
                    var idx = universe.Where_InTable_Planets(connection[i].getName());
                    connection[i].connection = universe.table_planets[idx].connection;
                    //////// NEIGHBOR PLANET /////////
                    //Go to the next possible planet indicate by connection[i]
                    var neighbor = new Planet();
                    /** Important to not just use '=' to affect an object to an other object.  
                     * We have to use special methods like "Object.assign"
                     */ 
                    neighbor = Object.assign(neighbor,connection[i]);
                
                    if(universe.table_planets[idx].isChecked()){
                    /** If the Planet of the same name has already been checked, 
                     *  We also checked the neighbor Planet
                     * */
                        neighbor.Checked();
                    } 

                    if( !neighbor.isChecked() ){
                        if(neighbor.parent == null ){
                            neighbor.parent = [];
                            //get the current Planet as Parent (Previous planet)
                            neighbor.parent = Object.assign(neighbor.parent,current);
                        }
                        else{
                        neighbor.parent = Object.assign(neighbor.parent,current);
                        }
                        //send it to the queue
                        queue.push(neighbor); 
                    }
                    /** If we have looked all the elements and 
                     * if we have no other planet of the same name in the queue
                     *  */
                    if( (i==connection.length-1) &&  
                    (isInTable(queue,current.name) == false ) 
                    )
                    {   /**Once we have looked all its connections,
                        * we check it and we send it to the table_planets
                        */ 
                        var idx = universe.Where_InTable_Planets(current.getName());
                        current.Checked();
                        universe.table_planets[idx]=Object.assign(universe.table_planets[idx],current);
                    }
                  
                } // end of the main for loop to check connections
                if( current.isGoingBack(empire.countdown) ){
                //Look if the algorithm go back to a planet already visited. 
                // If it is the case we break the while look because it does not make sense
                    break;
                }
            
            }
            
            // Initialiaze a table of valid traject founded.
            /** We create a special object 'Traject' to transform Planet with its Parents, 
             * (previously visited planets) to an array containing just name of planet. 
             * The object Traject has other attribut like the percentage of chance of beign captured.
             *  */  
            var tab_of_valid_trajects = [];
            for(var i =0; i<tab_results.length; i++){
                var valid_traject = new Traject();
                tab_of_valid_trajects[i] = valid_traject.FromPlanetToTraject(tab_results[i], empire.countdown, rows);
            }
            /** Create a traject for the Bounty Hunters, we will use it to calculate percentage 
             * of chance of being captured. 
             *  */ 
            var bounty_hunters_trajects = new Traject();
            for(var i=0; i<empire.bounty_hunters.length; i++){
                var b_day = empire.bounty_hunters[i].day; 
                bounty_hunters_trajects.tab[b_day]=empire.bounty_hunters[i].planet;
            }
            /**
             * We fill day passed in Hyperspace by "HP in the Traject.tab"
             * The tab 'no' inidicates position we don't care
             */
            var no = ["Endor","HP"];

            /// Add trajects to tab_of_valid_trajects
            bounty_hunters_trajects.AddTrajectFromTraject( tab_of_valid_trajects, 
                no, millenium.departure, empire.countdown);

            for(var i =0; i<tab_of_valid_trajects.length; i++ ){
            // Calculate each percentage of each traject   
                var tab_v = tab_of_valid_trajects[i].tab; // traject.tab 
                var len_tab_v = tab_of_valid_trajects[i].tab.length;
                var tab_bd = bounty_hunters_trajects.tab; // traject.tab
                var len_tab_bd = bounty_hunters_trajects.tab.length;

                var proba = 100-tab_of_valid_trajects[i].calculPercentage(tab_v, len_tab_v, tab_bd, len_tab_bd);
                tab_of_valid_trajects[i].percentage = proba;
            }

            console.log("********** FIND BEST PERCENTAGE ***********");
    
            var best_proba = bounty_hunters_trajects.bestPercentage(tab_of_valid_trajects);
            var tab_v_idx = bounty_hunters_trajects.whereBestPercentage(tab_of_valid_trajects, best_proba);

            var tab_final = []
            //Fill a tab of object prefit to be display by the front 
            for(var i=0; i<tab_v_idx.length; i++ ){
                tab_final[i]={ traject : tab_of_valid_trajects[tab_v_idx[i]].tab,
                    percentage : tab_of_valid_trajects[tab_v_idx[i]].percentage
                    }
            }

        
            if(tab_final == 0){
                console.log( "NO SOLUTION ");
                console.log(" PROBABILITY OF SUCESS = 0 ");
                var ret = [{traject : ["NO SOLUTION"], percentage: 0}] ;
                res.send({ 
                result: ret
                })    
            }

            else {
                console.log(" tab_final ==>");
                console.log(tab_final);
                res.send({ 
                    result: tab_final
                })   
            }

                }); //fs read
            }); // app post 
                
}); // db all
         
        
        
