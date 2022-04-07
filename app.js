var city = document.querySelector('.input_text');
var country = document.querySelector('.input_text1');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var button= document.querySelector('.submit');

function convertion(val){
    return (val - 273).toFixed(2)
}

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city.value + ',' + country.value +'&appid=50a7aa80fa492fa92e874d23ad061374')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Description : "+descValue;
  temp.innerHTML = "Temperature : " + convertion(tempValue) + "C" ;
 
  city.value ="";
  country.value ="";

})

.catch(err => alert("Wrong city name!"));
})