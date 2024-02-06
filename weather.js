const city = document.querySelector(".cityN")
const temprature = document.querySelector(".temp")
const wind = document.querySelector(".wind-speed")
const humidity = document.querySelector(".humidity")
const visibility = document.querySelector(".visibility-dist")
const description = document.querySelector(".discription")
const date = document.querySelector(".date")
const form = document.querySelector(".form")
const input = document.querySelector(".City")
const descriptionIcon = document.querySelector(".discription i")


const apiKey = `9ea60c8f290be9cd7b34cd190add9999`
//const cityName = "jabalpur"
async function fetchWeatherData(enterCity){
    
 try{  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enterCity}&units=metric&appid=${apiKey}`)
    // const data = await response.json()
    // console.log(data)
    // weatherUpdate(data)
  if(!response.ok){
    throw new error("unable to fetch data")
  }

    const data = await response.json()  
    console.log(data)
    weatherUpdate(data)
}catch(error){
    console.error(error) 
  }
}

function weatherUpdate(data){
    city.textContent = data.name
    temprature.textContent = `${Math.round(data.main.temp)}°`
    wind.textContent = `${data.wind.speed} km/h` 
    humidity.textContent = `${data.main.humidity} %`
    visibility.textContent = `${data.visibility/1000} km`
    description.textContent = data.weather[0].description;

    const currentDate = new Date()
    date.textContent = currentDate.toDateString();
    const wetherIcon = newIconName(data.weather[0].main)
    descriptionIcon.innerHTML= `<i class="material-icons">${wetherIcon}</i>`
}



form.addEventListener("submit", function(e){
    e.preventDefault();

    const enterCity = input.value;
    if(enterCity!==""){
        fetchWeatherData(enterCity)
        input.value = ""
    }
});


function newIconName(wetherCondn){
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    }

    return iconMap[wetherCondn] || "help";

}






