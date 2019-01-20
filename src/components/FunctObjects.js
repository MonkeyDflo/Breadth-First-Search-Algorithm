import React from 'react';


const functobjects = props => (
    <div id="functobjects" >
        <h2>Functions and objects</h2>
        <ul>
            <h3>Functions</h3>
            <li>WhereinORIGIN(db, planet_name)</li>
            <p>Find indexes where planet_name has been found in row ORIGIN</p>
            <li>WhereinDESTINATION(db, planet_name)</li>
            <p>Find indexes where planet_name has been found in row DESTINATION</p>
            <li>WhereinTable(db, element)</li>
            <p>Find indexes where element has been found in the table db</p>
            <li>isInTable(table, name)</li>
            <p>Check if the element is in the table </p>
            <li>matchIndex(table1, table2)</li>
            <p>Look for same number in two different table</p>
            <li>diffInTable(table, notWatch, departure)</li>
            <p>Find different elements in a table and doesn't look for element contained in the table notWatch. Take also the departure to add it directly to the returning tab. </p>
            <li>FindFirstEl(table, element)</li>
            <p>Find the first element in a table. If the element is not find return undefined</p>
            <li>clone(obj)</li>
            <p>Function to clone an object </p>
        </ul>
        
        <ul>
            <h3>Graph Object</h3>
            <li>Graph()</li>
            <p>Constructor</p>
            <li>addPlanet(p)</li>
            <p>Add a Planet Object to array table_planet.</p>
            <li>getTablePlanets()</li>
            <p>Return the array table_planet.</p>
            <li>isInTablePlanets(name)</li>
            <p>Check if the element is in the table.</p>
            <li>WhereInTablePlanets(name)</li>
            <p>Return index of a given name founded in table_planet. Other it returns -1.</p>
            <li>setBeginning(planet)</li>
            <p>Set beginning attribut.</p>
            <li>getBeginning(planet)</li>
            <p>Return Beginning attibut.</p>
            <li>setEnd(planet)</li>
            <p>Set end attribut.</p>
            <li>getEnd(planet)</li>
            <p>Return end attribut.</p>
        </ul>
        
        <ul>
            <h3>Planet Object</h3>
            <li>Planet(name)</li>
            <p>Constructor</p>
            <li>getPlanet()</li>
            <p>Return an object with attributs of this.</p>
            <li>addConnection(planet)</li>
            <p>Add a connection to the array connection.</p>
            <li>setConnection(planet, i)</li>
            <p>Define or redefine a connection at a precise index of the array connection.</p>
            <li>IsinConnection(name)</li>
            <p>Check if the name, usually a planet name, is in the connection array. Otherwise return false</p>
            <li>getConnection()</li>
            <p>Return the array connection of this.</p>
            <li>setParent(Planet)</li>
            <p>Set parent of this.</p>
            <li>getParent()</li>
            <p>Get parent of this.</p>
            <li>isChecked()</li>
            <p>Return if the Planet has been checked.</p>
            <li>Checked()</li>
            <p>Check the Planet, boolean checked becomes true.</p>
            <li>unChecked()</li>
            <p>Boolean this.checked become False.</p>
            <li>nbParent(planet, day)</li>
            <p>Return the number of parents by browsing to the previous parent again and again.</p>
            <p>We fix the limit of the for a loop to a number day passed by parameters to have</p>  
            <p>a default value for incrementation that can be exceeded.</p>
            <li>isGoingBack(day)</li>
            <p>Look for if parents names are the same as the current name.</p>
            <p>Which means the algorithm start to go in the other direction, </p>
            <p>no more from planet of departure to the wanted planet.</p>
        </ul>
        
        <ul>
            <h3>Ship Object</h3>
            <li>Ship(day)</li>
            <p>Constructor</p>
            <li>isFuelEmpty()</li>
            <p>Destermine if this.current_fuel is empty.</p>
            <p>If it is the case we add +1 to this.current_fuel.</p>
            <p>And we reset this.current_fuel to 6.</p>
            <li>CalculFuelDay(Planete, nb_parents, db)</li>
            <p>Caculate the current fuel and the current day from the previous parents of the planets</p>
            <p>and the current planet.</p>
        </ul>
        
        <ul>
            <h3>Traject Object</h3>
            <li>Traject()</li>
            <p>Constructor</p>
            <li>FuelEmpty()</li>
            <p>Determine if the attribut Fuel is empty and refuel and add one </p>
            <p>to the current day.</p>
            <li>FromPlanetToTraject(Planete, day, db)</li>
            <p>Transform a planet object to a traject object.</p>
            <p>Fill the traject.tab. We fill it with name of planet and </p>
            <p>with "HP" which represent days passed in Hyper Space.</p>
            <li>calculPercentage(tab_v, len_tab_v, tab_bd, len_tab_bd)</li>
            <p>Take two tabs and the length of the two tabs. Usually the current tab of a valid traject</p>
            <p>and the the traject's tab of the bounty hunters. Count the similarities and calcule with</p>
            <p>this number the percentage of beign caught.</p>
            <li>whereBestPercentage(tab_results, best_proba)</li>
            <p>Find among several object Traject the ones with the same attribut percentage</p>
            <p>as the given parameter best_proba. </p>
            <li>AddTrajectFromTraject(tab_results, no, departure, countdown)</li>
            <p>AddTrajectFromTraject will help us to create new traject and push it to the table of valid traject.</p>
            <p>When "we have traject of a lenght in day shorter than the countdown,</p>
            <p>We can create new traject from each traject like this. Just by added one more day on a planet different </p>
            <p>from the end planet. We will then calculate their percentage of chance of sucess with an other function.</p>
        </ul>
        
    </div>
    
);

export default functobjects;