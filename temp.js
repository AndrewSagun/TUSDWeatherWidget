var capitals = {
  alabama: "Montgomery",
  alaska: "Juneau",
  arizona: "Phoenix",
  arkansas: "Little Rock",
  california: "Sacramento",
  colorado: "Denver",
  connecticut: "Hartford",
  delaware: "Dover",
  florida: "Tallahassee",
  georgia: "Atlanta",
  hawaii: "Honolulu",
  idaho: "Boise",
  illinois: "Springfield",
  indiana: "Indianapolis",
  iowa: "Des Moines",
  kansas: "Topeka",
  kentucky: "Frankfort",
  louisiana: "Baton Rouge",
  maine: "Augusta",
  maryland: "Annapolis",
  massachusetts: "Boston",
  michigan: "Lansing",
  minnesota: "Saint Paul",
  mississippi: "Jackson",
  missouri: "Jefferson City",
  montana: "Helena",
  nebraska: "Lincoln",
  nevada: "Carson City",
  newhampshire: "Concord",
  newjersey: "Trenton",
  newmexico: "Santa Fe",
  newyork: "Albany",
  northcarolina: "Raleigh",
  northdakota: "Bismarck",
  ohio: "Columbus",
  oklahoma: "Oklahoma City",
  oregon: "Salem",
  pennsylvania: "Harrisburg",
  rhodeisland: "Providence",
  southcarolina: "Columbia",
  southdakota: "Pierre",
  tennessee: "Nashville",
  texas: "Austin",
  utah: "Salt Lake City",
  vermont: "Montpelier",
  virginia: "Richmond",
  washington: "Olympia",
  westvirginia: "Charleston",
  wisconsin: "Madison",
  wyoming: "Cheyenne"

}

var chartUpdate = "";
var r = document.querySelector(':root');
const addForm = document.forms['newCity'];

addForm.addEventListener('submit', function(e){
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;
  console.log(value);
  console.log(capitals[value]);

  city = value.replace(/ /g, "");
  city = city.toLowerCase();

  console.log(city);

  if (typeof capitals[city] == "undefined") {
    r.style.setProperty('--titleColor', 'red');
    r.style.setProperty('--tempColor', 'red');
    r.style.setProperty('--borderShown', 'none');

    showTemp("Invalid Input");
    document.getElementById('inputTextBox').value = "";

    console.log("INVALID");

    var parent = document.getElementById('chart_div');   
    var child = parent.lastElementChild; 

    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
  }

  if (typeof capitals[city] != "undefined") {    

    showTemp("Weather in " + capitals[city]);
    
    $.getJSON("http://api.weatherapi.com/v1/current.json?key=651bd08ba0ba430e82e214237211806&q=" + capitals[city] + "&aqi=no", function(data){
      console.log(data);
      var temp = data.current.temp_f;
      var humidity = data.current.humidity;
      var wind = data.current.wind_mph;
      var precip = data.current.precip_in;
    
      google.charts.load('visualization', 'current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart); 

      function drawChart() {
    
        let data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Temp (F)', temp],
          ['Humidity(%)', humidity],
          ['Wind (mph)', wind],
          ['Precip (in)', precip]
        ]);
      
        let options = {
          width: 1200, height: 500,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          greenFrom:0, greenTo:75,
          minorTicks: 10
        };
      
        let chart = new google.visualization.Gauge(document.getElementById('chart_div'));
      
        chart.draw(data, options);

        r.style.setProperty('--borderShown', '5px solid');
        r.style.setProperty('--titleColor', 'white');

        if (temp>=90) {
          r.style.setProperty('--tempColor', 'red');
        }
        if (90>temp && temp>=75){
          r.style.setProperty('--tempColor', 'orange');
        }
        if (75>temp) {
          r.style.setProperty('--tempColor', 'green');
        }
        if (precip <= 0) {
          r.style.setProperty('--backgroundImage', 'url("Sunny.jpeg")');
        }
        if (precip > 0) {
          r.style.setProperty('--backgroundImage', 'url("Rainy.jpeg")');
        }
      
      }
    
      chartUpdate = setInterval(function() {
        drawChart();
        console.log(drawChart);
      }, 1000);

    })
  
  }
});

function chartReset() {
  clearInterval(chartUpdate);
  console.log("Button Clicked!")
}



