let city = "Tustin"

const addForm = document.forms['newCity'];

addForm.addEventListener('submit', function(e){
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;
  console.log(value);

city = value;



  showTemp("Weather in " + city);
  
  $.getJSON("http://api.weatherapi.com/v1/current.json?key=651bd08ba0ba430e82e214237211806&q=" + city + "&aqi=no", function(data){
    console.log(data);
    let temp = data.current.temp_f;
    let humidity = data.current.humidity;
    let wind = data.current.wind_mph;
    let precip = data.current.precip_in;
  
    google.charts.load('current', {'packages':['gauge']});
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
    
    }
   
    setInterval(function() {
      drawChart();
      console.log(drawChart);
    }, 1000);

  })

});




