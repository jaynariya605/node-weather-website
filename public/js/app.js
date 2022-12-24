const WeatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

WeatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    messageOne.innerHTML = 'Loading ....';
    fetchWeather(search.value);
   
    
})

const fetchWeather = (location) =>{
    const URL = window.location.host;
    let searchpara = {location};
    const weatherApi ='http://'+  URL +'/' + 'weather' + '?' + new URLSearchParams(searchpara);
    fetch(weatherApi, ).then((response)=>{
        response.json().then((response)=>{
            displayWeatherInfo(response);
        })
    })

}

const displayWeatherInfo =({error, location, temprature, Type} ={}) =>{
    
    if (error){
        messageOne.innerHTML = error;
    } else{
        messageOne.innerHTML = location;
        messageTwo.innerHTML = temprature + '(' + Type + ')';
    }
}



