const cityId = document.getElementById('city');
const countryId = document.getElementById('country');
        
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      } else if (e.keyCode == 9) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var cities = ['A Coruna', 'Aachen', 'Aarhus', 'Aberdeen', 'Abu Dhabi', 'Acapulco', 'Adelaide', 'Adelboden', 'Agadir', 'Agde', 'Agen', 'Agios Nikolaos', 'Agrigento', 'Agropoli', 'Aigues-Mortes', 'Aix-en-Provence', 'Aix-les-Bains', 'Ajaccio', 'Ajman', 'Akron', 'Al Ain', 'Alanya', 'Albany', 'Albenga', 'Albi', 'Albufeira', 'Albuquerque', 'Alcudia', 'Alessandria', 'Alesund', 'Alexandria', 'Algeciras', 'Alghero', 'Alicante', 'Alkmaar', 'Alta Badia', 'Altea', 'Amalfi', 'Amarillo', 'Amersfoort', 'Amiens', 'Amsterdam', 'Anaheim', 'Anchorage', 'Ancona', 
'Andalo', 'Andermatt', 'Andria', 'Andros', 'Angers', 'Ankara', 'Ann Arbor', 'Annapolis', 'Annecy', 'Antalya', 'Antibes', 'Antwerp', 'Anzio', 'Ao Nang', 'Aosta', 'Appleton', 'Aracaju', 'Arenzano', 'Arezzo', 'Argostoli', 'Arles', 'Arlington', 'Armagh', 'Arnhem', 'Arosa', 'Arrecife', 'Arta', 'Ascoli Piceno', 'Ashdod', 'Ashkelon', 'Aspen', 'Asti', 'Athens', 'Athlone', 'Atlanta', 'Atlantic City', 'Auckland', 'Augsburg', 'Augusta', 'Aurora', 'Austin', 'Auxerre', 'Aveiro', 'Avellino', 'Avignon', 'Avoriaz', 'Axamer Lizum', 'Ayia Napa', 'Bad Gastein', 
'Bad Hofgastein', 'Baden', 'Bakersfield', 'Baltimore', 'Bandar Seri Begawan', 'Bandol', 'Bangkok', 'Bangor', 'Bar', 'Barcelona', 'Bari', 'Barletta', 'Barstow', 'Basel', 'Bastia', 'Bath', 'Baton Rouge', 'Batumi', 'Bayonne', 'Beaulieu-sur-Mer', 'Beersheba', 'Beijing', 'Belfast', 'Belfort', 'Belgrade', 'Belluno', 'Belo Horizonte', 'Bemidji', 'Benalmadena', 'Bendigo', 'Benevento', 'Benicassim', 'Benidorm', 'Bergamo', 'Bergen', 'Bergerac', 'Berkeley', 'Berlin', 'Bern', 'Besancon', 'Beverly Hills', 'Biarritz', 'Biel', 'Bienne', 'Bielefeld', 'Biella', 
'Bilbao', 'Billings', 'Birmingham', 'Bismarck', 'Blanes', 'Bled', 'Blois', 'Blumenau', 'Boca Chica', 'Boca Raton', 'Bochum', 'Bodrum', 'Boise', 'Bologna', 'Bolzano', 'Bonifacio', 'Bonn', 'Bordeaux', 'Bordighera', 'Bormio', 'Boston', 'Boulder', 'Bourges', 'Boynton Beach', 'Bradenton', 'Bradford', 'Braga', 'Brampton', 'Brasilia', 'Bratislava', 'Braunschweig', 'Breda', 'Bregenz', 'Brela', 'Bremen', 'Bremerhaven', 'Brescia', 'Brest', 'Brighton', 'Brindisi', 'Brisbane', 'Bristol', 'Brixen', 'Brixental', 'Brno', 'Brownsville', 'Bruges', 'Brussels', 
'Bucharest', 'Budapest', 'Budva', 'Buenos Aires', 'Buffalo', 'Burgas', 'Cabo San Lucas', 'Cadiz', 'Caen', 'Cagliari', 'Cagnes-sur-Mer', 'Cairns', 'Cala Bona',  'Cala Millor', 'Cala Ratjada', 'Calais', 'Calella', 'Calgary', 'Caloundra', 'Calp', 'Caltanissetta', 'Calvi', 'Cambridge', 'Cambrils', 'Campinas', 'Campobasso', 'Can Picafort', 'Canazei', 'Canberra', 'Cancun', 'Cannes', 'Canterbury', 'Canyamel', 'Capdepera', 'Cape Canaveral', 'Cape Coral', 'Cape May', 'Cape Town', 'Carbonia', 'Carcassonne', 'Cardiff', 'Carlisle', 'Carlsbad', 'Carpi', 
'Carpinteria', 'Carrara', 'Carson City', 'Cartagena', 'Casablanca', 'Caserta', 'Casper', 'Cassis', 'Castelrotto', 'Catania', 'Catanzaro', 'Caxias do Sul', 'Cervinia', 'Cesena', 'Cesky Krumlov', 'Cesme', 'Chamonix', 'Chandler', 'Chania', 'Charleroi', 'Charleston', 'Charlotte', 'Charlottetown', 'Chartres', 'Chattanooga', 'Chelmsford', 'Chemnitz', 'Cherbourg', 'Chesapeake', 'Chester', 'Cheyenne', 'Chiang Mai', 'Chiang Rai', 'Chiavari', 'Chicago', 'Chieti', 'Chioggia', 'Chios', 'Chonburi', 'Christchurch', 'Chula Vista', 'Chur', 'Cincinnati', 
'Ciutadella de Menorca', 'Civitavecchia', 'Clearwater', 'Clermont-Ferrand', 'Cleveland', 'Cocoa Beach', 'Coconut Creek', 'Coimbra', 'Collioure', 'Colmar', 'Cologne', 'Colorado Springs', 'Columbia', 'Columbus', 'Como', 'Concord', 'Conil de la Frontera', 'Copenhagen', 'Coral Springs', 'Cordoba', 'Corfu', 'Corinth', 'Cork', 'Corpus Christi', 'Corralejo',  'Cosenza', 'Costa Adeje', 'Courchevel', 'Courmayeur', 'Coventry', 'Cozumel', 'Crans-Montana', 'Cremona', 'Crotone', 'Cuneo', 'Da Nang', 'Dallas', 'Dana Point', 'Darmstadt', 'Darwin', 
'Dau`gavpils', 'Davos', 'Daytona Beach', 'Deerfield Beach', 'Del Mar', 'Delft', 'Delray Beach', 'Denia', 'Denver', 'Derby', 'Derry', 'Des Moines', 'Detroit', 'Didim', 'Dieppe', 'Dijon', 'Doha', 'Dolomiti Superski', 'Dorfgastein', 'Dortmund', 'Dover', 'Dresden', 'Dubai', 'Dublin', 'Dubrovnik', 'Duisburg', 'Duluth', 'Dundalk', 'Dundee', 'Dunedin', 'Dunkirk', 'Durham', 'Dusseldorf', 'Eau Claire', 'Edinburgh', 'Edmonton', 'Eilat', 'Eindhoven', 'El Paso', 'Elche', 'Ellmau', 'Elm', 'Empuriabrava', 'Encinitas', 'Engelberg', 'Enna', 'Enschede', 
'Erfurt', 'Erie', 'Erlangen', 'Esbjerg', 'Espace Killy', 'Essaouira', 'Essen', 'Estepona', 'Eugene', 'Exeter', 'Faenza', 'Falmouth', 'Famagusta', 'Fano', 'Fargo', 'Faro', 'Fayetteville', 'Fermo', 'Fernandina Beach', 'Ferrara', 'Fethiye', 'Fez', 'Fieberbrunn', 'Filzmoos', 'Finale Ligure', 'Fiumicino', 'Flagstaff', 'Flaine', 'Florence', 'Foggia', 'Folgarida', 'Fontana', 'Forli', 'Fort Collins', 'Fort Lauderdale', 'Fort Myers', 'Fort Wayne', 'Fort Worth', 'Forte dei Marmi', 'Foz do Iguacu', 'Frankfort', 'Frankfurt am Main', 'Fredericton', 
'Freeport', 'Freiburg', 'Fremont', 'Fresno', 'Fribourg', 'Frosinone', 'Fuengirola', 'Fujairah', 'Fukuoka', 'Funchal', 'Gainesville', 'Galtur', 'Galway', 'Garden Grove', 'Garland', 'Gatineau', 'Gdansk', 'Gdynia', 'Geelong', 'Gelsenkirchen', 'Geneva', 'Genoa', 'George Town', 'Ghent', 'Gijon', 'Gilbert', 'Girona', 'Glasgow', 'Glendale', 'Gloucester', 'Gold Coast', 'Gorizia', 'Gothenburg', 'Gottingen', 'Granada', 'Grand Prairie', 'Grand Rapids', 'Grasse', 'Graz', 'Great Falls', 'Green Bay', 'Greensboro', 'Grenoble', 'Grindelwald', 'Groningen', 
'Grossarl', 'Grosseto', 'Gstaad', 'Guadalajara', 'Guangzhou', 'Guimaraes', 'Haarlem', 'Haifa', 'Halifax', 'Halle', 'Hamburg', 'Hamilton', 'Hampton', 'Hangzhou', 'Hannover', 'Hanoi', 'Harrisburg', 'Hartford', 'Hasselt', 'Hat Yai', 'Havana', 'Heidelberg', 'Heilbronn', 'Heiligenblut', 'Helena', 'Helsinki', 'Henderson', 'Heraklion', 'Herceg Novi', 'Hereford', 'Hermosa Beach', 'Hervey Bay', 'Hialeah', 'Hinterglemm', 'Hinterstoder', 'Hiroshima', 'Hoi An', 'Hobart', 'Ho Chi Minh City', 'Hollywood', 'Hong Kong', 'Honolulu', 'Horsens', 'Houston', 
'Hua Hin', 'Hue', 'Huntington Beach', 'Huntsville', 'Hvar', 'Hyeres', 'Ibiza Town', 'Imola', 'Imperia', 'Inca', 'Indianapolis', 'Ingolstadt', 'Innsbruck', 'Interlaken', 'Inverness', 'Ioannina', 'Irvine', 'Irving', 'Ischgl', 'Isernia', 'Islamorada', 'Istanbul', 'Izmir', 'Izola', 'Jackson', 'Jacksonville', 'Jefferson City', 'Jena', 'Jerez de la Frontera', 'Jersey City', 'Jerusalem', 'Johannesburg', 'Joinville', 'Juan-les-Pins', 'Juiz de Fora', 'Juneau', 'Jungfrau', 'Jupiter', 'Jurmala', 'Kalamata', 'Kanchanaburi', 'Kansas City', 'Kappl', 
'Kaprun', 'Karlovy Vary', 'Karlsruhe', 'Kassel', 'Kastoria', 'Kaunas', 'Kavala', 'Kemer', 'Key Largo', 'Key West', 'Khao Lak', 'Kiel', 'Kilkenny', 'Kingston', 'Kingston upon Hull', 'Kissimmee', 'Kitzbühel', 'Klagenfurt', 'Klaipeda', 'Knoxville', 'Kobe', 'Koblenz', 'Kolding', 'Komotini', 'Koper', 'Kos', 'Kosice', 'Kotor', 'Krabi', 'Krakow', 'Krefeld', 'Kuah', 'Kuala Lumpur', 'Kusadasi', 'Kutna Hora', 'Kyoto', 'Kyrenia', 'La Ciotat', 'La Clusaz', 'La Laguna', 'La Maddalena', 'La Manga', 'La Plagne', 'La Plata', 'La Rochelle', 'La Romana', 
'La Spezia', 'La Thuile', 'Laax', 'Lagos', 'Laguna Beach', 'Lakeland', 'Lamezia Terme', 'Lancaster', 'Lansing', 'Laredo', 'Largo', 'Larnaca', 'Las Palmas', 'Las Vegas', 'Latina', 'Lausanne', 'Laval', 'Le Havre', 'Le Lavandou', 'Le Mans', 'Lecce', 'Lecco', 'Lech', 'Leeds', 'Legnano', 'Leicester', 'Leiden', 'Leipzig', 'Leogang', 'Les Arcs', 'Les Deux Alpes', 'Les Gets', 'Les Houches', 'Les Menuires', 'Leuven', 'Lexington', 'Liberec', 'Liege', 'Lienz', 'Liepaja', 'Lille', 'Limassol', 'Limerick', 'Limoges', 'Lincoln', 'Lindos', 'Linz', 'Lisbon', 
'Lisburn', 'Little Rock', 'Liverpool', 'Livigno', 'Livorno', 'Ljubljana', 'Lloret de Mar', 'Loano', 'Locarno', 'Lodi', 'Lodz', 'London', 'Londrina', 'Longyearbyen', 'Long Beach', 'Los Angeles', 'Los Cabos', 'Los Cristianos', 'Louisville', 'Lourdes', 'Loutraki', 'Louvain-la-Neuve', 'Lubbock', 'Lubeck', 'Lublin', 'Lucca', 'Lucerne', 'Lugano', 'Lund', 'Lyon', 'Maastricht', 'Macerata', 'Madison', 'Madonna di Campiglio', 'Madrid', 'Magaluf', 'Megara', 'Magdeburg', 'Mahon', 'Mainz', 'Makarska', 'Malacca', 'Malaga', 'Malia', 'Malibu', 'Malmo', 'Manacor', 
'Manchester', 'Manhattan Beach', 'Mannheim', 'Manosque', 'Mantua', 'Mar del Plata', 'Marathon', 'Marbella', 'Maria Alm', 'Maribor', 'Markham', 'Marmaris', 'Maroochydore', 'Marrakesh', 'Marsala', 'Marseille', 'Maspalomas', 'Massa', 'Matera', 'Mayrhofen', 'Mazara del Vallo', 'Mechelen', 'Megeve', 'Melbourne', 'Memphis', 'Menton', 'Merano', 'Meribel', 'Merida', 'Mesa', 'Messina', 'Mestre', 'Metz', 'Mexico City', 'Miami', 'Middelburg', 'Midland', 'Mijas', 'Milan', 'Millau', 'Milwaukee', 'Minneapolis', 'Miramar', 'Mississauga', 'Moab', 'Mobile', 'Modena', 
'Modesto', 'Modica', 'Moena', 'Mogi das Cruzes', 'Mons', 'Monte Rosa', 'Montego Bay', 'Montepulciano', 'Monterey', 'Montgomery', 'Montpelier', 'Montpellier', 'Montreal', 'Montreux', 'Monza', 'Moraira', 'Moreno Valley', 'Morzine', 'Moscow', 'Mountain View', 'Mulhouse', 'Munich', 'Munster', 'Murcia', 'Murter', 'Mykonos', 'Mytilene', 'Nafplio', 'Nagoya', 'Namur', 'Nancy', 'Nantes', 'Napa', 'Naples', 'Narbonne', 'Narva', 'Nashville', 'Nassau', 'Naxos', 'Nazareth', 'Negril', 'Nelson', 'Nerja', 'Netanya', 'Nevers', 'New Haven', 'New Orleans', 'New Smyrna Beach', 
'New York City', 'Newark', 'Newcastle', 'Newport', 'Newport Beach', 'Newport News', 'Nha Trang', 'Niagara Falls', 'Nice', 'Nicosia', 'Nijmegen', 'Nimes', 'Niort', 'Noosa Heads', 'Norfolk', 'North Las Vegas', 'North Port', 'Norwich', 'Nottingham', 'Novara', 'Novigrad', 'Nuoro', 'Nurnberg', 'Nyon', 'Oakland', 'Oaxaca', 'Obergurgl', 'Oberhausen', 'Ocala', 'Oceanside', 'Ocho Rios', 'Odense', 'Odessa', 'Ogden', 'Oia', 'Oklahoma City', 'Olbia', 'Oldenburg', 'Olomouc', 'Olympia', 'Omaha', 'Opatija', 'Oristano', 'Orlando', 'Orleans', 'Ortisei', 'Osaka', 'Oslo', 
'Osnabrück', 'Ostrava', 'Ottawa', 'Oulu', 'Overland Park', 'Oviedo', 'Oxford', 'Oxnard', 'Paderborn', 'Padova', 'Palanga', 'Palavas-les-Flots', 'Palermo', 'Palm Bay', 'Palm Beach', 'Palma de Mallorca', 'Palma Nova', 'Palmetto', 'Palo Alto', 'Panama City', 'Paphos', 'Paradiski', 'Paralia', 'Parikia', 'Paris', 'Parma', 'Parnu', 'Pasadena', 'Passo del Tonale', 'Passo Rolle', 'Patras', 'Pattaya', 'Pau', 'Pavia', 'Peguera', 'Pembroke Pines', 'Pensacola', 'Perast', 'Perpignan', 'Perth', 'Perugia', 'Pesaro', 'Pescara', 'Pescasseroli', 'Petah Tikva', 'Peterborough', 
'Petrovac', 'Pforzheim', 'Phang Nga', 'Phetchabun', 'Philadelphia', 'Phocis', 'Phoenix', 'Phuket City', 'Piacenza', 'Pierre', 'Piraeus', 'Piran', 'Pisa', 'Pistoia', 'Pittsburgh', 'Plano', 'Playa Blanca', 'Playa de las Americas', 'Playa del Carmen', 'Plovdiv', 'Plymouth', 'Plzen', 'Podgorica', 'Poitiers', 'Pollenca', 'Pompano Beach', 'Pordenone', 'PoreC', 'Port Charlotte', 'Port St. Lucie', 'Portimao', 'Portland', 'Porto', 'Porto Cervo', 'Porto Cristo', 'Porto Torres', 'Portocolom', 'Portofino', 'Portoroz', 'Porto-Vecchio', 'Portsmouth', 'Positano', 'Potenza', 
'Potsdam', 'Poznan', 'Pozzuoli', 'Prague', 'Praia da Rocha', 'Prato', 'Preston', 'Pretoria', 'Propriano', 'Protaras', 'Providence', 'Provo', 'Puerto de la Cruz', 'Puerto Plata', 'Puerto Rico', 'Puerto Vallarta', 'Pula', 'Punta Cana', 'Punta Gorda',  'Quarteira', 'Quebec', 'Quimper', 'Rabat', 'Ragusa', 'Railay Beach', 'Raleigh', 'Rancho Cucamonga', 'Randers', 'Rapallo', 'Rapid City', 'Ras al-Khaimah', 'Ravello', 'Ravenna', 'Rayong', 'Redding', 'Redondo Beach', 'Regensburg', 'Reggio Calabria', 'Reggio Emilia', 'Regina', 'Rehovot', 'Reims', 'Rennes', 'Reno', 
'Rethymno', 'Reus', 'Reutlingen', 'Reykjavik', 'Rhodes', 'Richmond', 'Rieti', 'Riga', 'Rijeka', 'Rimini', 'Rio de Janeiro', 'Riomaggiore', 'Rishon LeZion', 'Riverside', 'Riviera Maya', 'Roanoke', 'Rochester', 'Rodez', 'Rome', 'Rosario', 'Roskilde', 'Rostock', 'Rotterdam', 'Roubaix', 'Rouen', 'Rovigo', 'Rovinj', 'Saalbach', 'Saarbrucken', 'Saas-Fee', 'Sacramento', 'Saint Paul', 'Saint Petersburg', 'Saint-Jean-Cap-Ferrat', 'Saint-Malo', 'Saint-Tropez', 'Salamanca', 'Salem', 'Salerno', 'Salinas', 'Salou', 'Salt Lake City', 'Salta', 'Salvador', 
'Salzburg', 'Samana', 'San Antonio', 'San Bernardino', 'San Clemente', 'San Diego', 'San Francisco', 'San Jose', 'San Juan', 'San Mateo', 'San Sebastian', 'Sanford', 'Sanremo', 'Sant Antoni de Portmany', 'Santa Ana', 'Santa Barbara', 'Santa Clara', 'Santa Clarita', 'Santa Cruz', 'Santa Cruz de Tenerife', 'Santa Eularia des Riu', 'Santa Fe', 'Santa Margherita Ligure', 'Santa Monica', 'Santa Pola', 'Santa Ponsa', 'Santa Rosa', 'Santander', 'Santiago', 'Santiago de Compostela', 'Santo Domingo', 'Sao Paulo', 'Sapporo', 'Sarasota', 'Saskatoon', 'Sassari', 
'Saumur', 'Savannah', 'Savona', 'Schaffhausen', 'Schladming', 'Scottsdale', 'Seal Beach', 'Seattle', 'Sedona', 'Seefeld', 'Segovia', 'Seoul', 'Serre Chevalier', 'Seville', 'Shanghai', 'Sharjah', 'Sheffield', 'Shenzhen', 'Shreveport', 'Siauliai', 'Sibenik', 'Side', 'Siegen', 'Siena', 'Singapore', 'Sion', 'Sioux Falls', 'Sitges', 'Skiathos', 'Sofia', 'Solden', 'Soll', 'Soller', 'Sondrio', 'Sopot', 'Sorocaba', 'Sorrento', 'Southampton', 'Split', 'Spokane', 'Springfield', 'St Albans', 'St. Anton', 'St. Augustine', 'St. Gallen', 'St. George', 'St. John\'s', 
'St. Louis', 'St. Moritz', 'Stavanger', 'Stockholm', 'Stockton', 'Stoke-on-Trent', 'Strasbourg', 'Stuttgart', 'Sukhothai', 'Sunderland', 'Sunnyvale', 'Sunshine Coast', 'Superior', 'Surrey', 'Sveti Stefan', 'Swansea', 'Sydney', 'Syracuse', 'Szczecin', 'Tacoma', 'Tallahassee', 'Tallinn', 'Tampa', 'Tampere', 'Tamworth', 'Tangier', 'Taormina', 'Taranto', 'Tarifa', 'Tarragona', 'Tartu', 'Tauplitz', 'Tauranga', 'Tavira', 'Tbilisi', 'Tel Aviv', 'Temecula', 'Tempe', 'Teramo', 'Terni', 'The Hague', 'Thessaloniki', 'Tignes', 'Tijuana', 'Tilburg', 'Tinos', 'Tivat', 
'Tivoli', 'Tokyo', 'Toledo', 'Toowoomba', 'Topeka', 'Toronto', 'Torre del Greco', 'Torre del Mar', 'Torremolinos', 'Torrevieja', 'Torun', 'Tossa de Mar', 'Toulon', 'Toulouse', 'Tours', 'Townsville', 'Trani', 'Trapani', 'Trento', 'Trenton', 'Treviso', 'Trier', 'Trieste', 'Trogir', 'Tromso', 'Trondheim', 'Troy', 'Troyes', 'Tucson', 'Tulsa', 'Tulum', 'Turin', 'Turku', 'Twin Falls', 'Udine', 'Udon Thani', 'Ulcinj', 'Ulm', 'Umag', 'Uppsala', 'Urbino', 'Ushuaia', 'Utrecht',  'Val di Fassa', 'Val Gardena', 'Val Thorens', 'Valence', 'Valencia', 'Valladolid', 
'Valle Isarco', 'Valletta', 'Vancouver', 'Varazze', 'Varese', 'Varna', 'Vaughan', 'Vejle', 'Venice', 'Ventimiglia', 'Ventspils', 'Ventura', 'Verbania', 'Verbier', 'Vercelli', 'Vero Beach', 'Verona', 'Versailles', 'Vevey', 'Viareggio', 'Vibo Valentia', 'Viborg', 'Vicenza', 'Vichy', 'Victoria', 'Vienna', 'Vigo', 'Vilamoura', 'Villach', 'Villefranche-sur-Mer', 'Vilnius', 'Virginia Beach', 'Viterbo', 'Vitoria-Gasteiz', 'Volos', 'Vrsar', 'Wakefield', 'Warsaw', 'Washington D.C.', 'Waterford', 'Wellington', 'Wengen', 'West Palm Beach', 'Westendorf', 'Westminster', 
'Weston', 'Wichita', 'Wiesbaden', 'Wilmington', 'Winchester', 'Windsor', 'Winnipeg', 'Winston–Salem', 'Winterthur', 'Wolfsburg', 'Wollongong', 'Wolverhampton', 'Worcester', 'Wroclaw', 'Wuppertal', 'Wurzburg', 'Yakima', 'Yokohama', 'Yonkers', 'York', 'Yuma', 'Zadar', 'Zagreb', 'Zakopane', 'Zaragoza', 'Zell am See', 'Zell am Ziller', 'Zermatt', 'Zug', 'Zurich'];

const countries = ['ASCENSION ISLAND, AC', 'AFGHANISTAN, AF', 'ALAND, AX', 'ALBANIA, AL', 'ALGERIA, DZ', 'ANDORRA, AD', 'ANGOLA, AO', 'ANGUILLA, AI', 'ANTARCTICA, AQ', 'ANTIGUA AND BARBUDA, AG', 'ARGENTINA REPUBLIC, AR', 'ARMENIA, AM', 'ARUBA, AW', 'AUSTRALIA, AU', 'AUSTRIA, AT', 'AZERBAIJAN, AZ', 'BAHAMAS, BS', 'BAHRAIN, BH', 'BANGLADESH, BD', 'BARBADOS, BB', 'BELARUS, BY', 'BELGIUM, BE', 'BELIZE, BZ', 'BENIN, BJ', 'BERMUDA, BM', 'BHUTAN, BT', 'BOLIVIA, BO', 'BOSNIA AND HERZEGOVINA, BA', 'BOTSWANA, BW', 'BOUVET ISLAND, BV', 'BRAZIL, BR', 'BRITISH INDIAN OCEAN TERR, IO', 'BRITISH VIRGIN ISLANDS, VG', 'BRUNEI DARUSSALAM, BN', 'BULGARIA, BG', 'BURKINA FASO, BF', 'BURUNDI, BI', 'CAMBODIA, KH', 'CAMEROON, CM', 'CANADA, CA', 'CAPE VERDE, CV', 'CAYMAN ISLANDS, KY', 'CENTRAL AFRICAN REPUBLIC, CF', 'CHAD, TD', 'CHILE, CL', 'PEOPLE’S REPUBLIC OF CHINA, CN', 'CHRISTMAS ISLANDS, CX', 'COCOS ISLANDS, CC', 'COLOMBIA, CO', 'COMORAS, KM', 'CONGO, CG', 'CONGO (DEMOCRATIC REPUBLIC), CD', 'COOK ISLANDS, CK', 'COSTA RICA, CR', 'COTE D IVOIRE, CI', 'CROATIA, HR', 'CUBA, CU', 'CYPRUS, CY', 'CZECH REPUBLIC, CZ', 'DENMARK, DK', 'DJIBOUTI, DJ', 'DOMINICA, DM', 'DOMINICAN REPUBLIC, DO', 'EAST TIMOR, TP', 'ECUADOR, EC', 'EGYPT, EG', 'EL SALVADOR, SV', 'EQUATORIAL GUINEA, GQ', 'ESTONIA, EE', 'ETHIOPIA, ET', 'FALKLAND ISLANDS, FK', 'FAROE ISLANDS, FO', 'FIJI, FJ', 'FINLAND, FI', 'FRANCE, FR', 'FRANCE METROPOLITAN, FX', 'FRENCH GUIANA, GF', 'FRENCH POLYNESIA, PF', 'FRENCH SOUTHERN TERRITORIES, TF', 'GABON, GA', 'GAMBIA, GM', 'GEORGIA, GE', 'GERMANY, DE', 'GHANA, GH', 'GIBRALTAR, GI', 'GREECE, GR', 'GREENLAND, GL', 'GRENADA, GD', 'GUADELOUPE, GP', 'GUAM, GU', 'GUATEMALA, GT', 'GUINEA, GN', 'GUINEA-BISSAU, GW', 'GUYANA, GY', 'HAITI, HT', 'HEARD & MCDONALD ISLAND, HM', 'HONDURAS, HN', 'HONG KONG, HK', 'HUNGARY, HU', 'ICELAND, IS', 'INDIA, IN', 'INDONESIA, ID', 'IRAN, ISLAMIC REPUBLIC OF, IR', 'IRAQ, IQ', 'IRELAND, IE', 'ISLE OF MAN, IM', 'ISRAEL, IL', 'ITALY, IT', 'JAMAICA, JM', 'JAPAN, JP', 'JORDAN, JO', 'KAZAKHSTAN, KZ', 'KENYA, KE', 'KIRIBATI, KI', 'KOREA, DEM. PEOPLES REP OF, KP', 'KOREA, REPUBLIC OF, KR', 'KUWAIT, KW', 'KYRGYZSTAN, KG', 'LAO PEOPLE’S DEM. REPUBLIC, LA', 'LATVIA, LV', 'LEBANON, LB', 'LESOTHO, LS', 'LIBERIA, LR', 'LIBYAN ARAB JAMAHIRIYA, LY', 'LIECHTENSTEIN, LI', 'LITHUANIA, LT', 'LUXEMBOURG, LU', 'MACAO, MO', 'MACEDONIA, MK', 'MADAGASCAR, MG', 'MALAWI, MW', 'MALAYSIA, MY', 'MALDIVES, MV', 'MALI, ML', 'MALTA, MT', 'MARSHALL ISLANDS, MH', 'MARTINIQUE, MQ', 'MAURITANIA, MR', 'MAURITIUS, MU', 'MAYOTTE, YT', 'MEXICO, MX', 'MICRONESIA, FM', 'MOLDAVA REPUBLIC OF, MD', 'MONACO, MC', 'MONGOLIA, MN', 'MONTENEGRO, ME', 'MONTSERRAT, MS', 'MOROCCO, MA', 'MOZAMBIQUE, MZ', 'MYANMAR, MM', 'NAMIBIA, NA', 'NAURU, NR', 'NEPAL, NP', 'NETHERLANDS ANTILLES, AN', 'NETHERLANDS, THE, NL', 'NEW CALEDONIA, NC', 'NEW ZEALAND, NZ', 'NICARAGUA, NI', 'NIGER, NE', 'NIGERIA, NG', 'NIUE, NU', 'NORFOLK ISLAND, NF', 'NORTHERN MARIANA ISLANDS, MP', 'NORWAY, NO', 'OMAN, OM', 'PAKISTAN, PK', 'PALAU, PW', 'PALESTINE, PS', 'PANAMA, PA', 'PAPUA NEW GUINEA, PG', 'PARAGUAY, PY', 'PERU, PE', 'PHILIPPINES (REPUBLIC OF THE), PH', 'PITCAIRN, PN', 'POLAND, PL', 'PORTUGAL, PT', 'PUERTO RICO, PR', 'QATAR, QA', 'REUNION, RE', 'ROMANIA, RO', 'RUSSIAN FEDERATION, RU', 'RWANDA, RW', 'SAMOA, WS', 'SAN MARINO, SM', 'SAO TOME/PRINCIPE, ST', 'SAUDI ARABIA, SA', 'SCOTLAND, UK', 'SENEGAL, SN', 'SERBIA, RS', 'SEYCHELLES, SC', 'SIERRA LEONE, SL', 'SINGAPORE, SG', 'SLOVAKIA, SK', 'SLOVENIA, SI', 'SOLOMON ISLANDS, SB', 'SOMALIA, SO', 'SOMOA,GILBERT,ELLICE ISLANDS, AS', 'SOUTH AFRICA, ZA', 'SOUTH GEORGIA, SOUTH SANDWICH ISLANDS, GS', 'SOVIET UNION, SU', 'SPAIN, ES', 'SRI LANKA, LK', 'ST. HELENA, SH', 'ST. KITTS AND NEVIS, KN', 'ST. LUCIA, LC', 'ST. PIERRE AND MIQUELON, PM', 'ST. VINCENT & THE GRENADINES, VC', 'SUDAN, SD', 'SURINAME, SR', 'SVALBARD AND JAN MAYEN, SJ', 'SWAZILAND, SZ', 'SWEDEN, SE', 'SWITZERLAND, CH', 'SYRIAN ARAB REPUBLIC, SY', 'TAIWAN, TW', 'TAJIKISTAN, TJ', 'TANZANIA, UNITED REPUBLIC OF, TZ', 'THAILAND, TH', 'TOGO, TG', 'TOKELAU, TK', 'TONGA, TO', 'TRINIDAD AND TOBAGO, TT', 'TUNISIA, TN', 'TURKEY, TR', 'TURKMENISTAN, TM', 'TURKS AND CAICOS ISLANDS, TC', 'TUVALU, TV', 'UGANDA, UG', 'UKRAINE, UA', 'UNITED ARAB EMIRATES, AE', 'UNITED KINGDOM, UK', 'UNITED STATES, US', 'UNITED STATES MINOR OUTL.IS., UM', 'URUGUAY, UY', 'UZBEKISTAN, UZ', 'VANUATU, VU', 'VATICAN CITY STATE, VA', 'VENEZUELA, VE', 'VIETNAM, VN', 'VIRGIN ISLANDS (USA), VI', 'WALLIS AND FUTUNA ISLANDS, WF', 'WESTERN SAHARA, EH', 'YEMEN, YE', 'ZAMBIA, ZM', 'ZIMBABWE, ZW']

autocomplete(cityId, cities);

autocomplete(countryId, countries);
