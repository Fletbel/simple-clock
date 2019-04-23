const weather= document.querySelector(".js-weather");
const API_KEY = "9013bb039e14113114773af8a1ab855c";
const COORDS = 'coords';

function handleWeatherEmoji(currentWeatherStatus){
  if(currentWeatherStatus === ("overcast clouds" || "clouds")){
    return "☁️";
  } 
  else if (currentWeatherStatus === "extreme") return "⛈️"; 
  else if (currentWeatherStatus === "Sun") return "☀️️";
  else if (currentWeatherStatus === "Snow") return "🌨️";
  else if (currentWeatherStatus === "Rain") return "🌨️";
  else if (currentWeatherStatus === "sun behind cloud") return "⛅️";
  else if (currentWeatherStatus === "thunder storm") return "🌩";
  else return "";
}

function getWeather(lat ,lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response){
    return response.json();
  })
    .then(function(json){
    const currentWeather = {
      main: `${handleWeatherEmoji(json.weather[0].main)}${json.weather[0].main}`,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      humidity: json.main.humidity,
      place: json.name
    }

    weather.innerText = `${currentWeather.place} @ 
    🌡️ Max:${parseInt(currentWeather.tempMax)}  Min:${parseInt(currentWeather.tempMin)} 
    💧${currentWeather.humidity}%  ${currentWeather.main}`;
  });
  // .then
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //latitude: latitude,
    longitude //longitude: longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadCoords = localStorage.getItem(COORDS);
  if(loadCoords === null){
    askForCoords();
  } else{
    //getWeather
    const parseCoords = JSON.parse(loadCoords);
    //console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();