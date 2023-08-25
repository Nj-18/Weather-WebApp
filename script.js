const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");

const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant_local-container");
const searchForm=document.querySelector("[datasearchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

let oldTab=userTab;
const  API_key="cccb40191cf35af794dade15224f3785";
oldTab.classList.add("current-tab");
 getfromSessionStorage();

function switchTab(newTab)
{
   if(newTab !=oldTab)
   {

    oldTab.classList.remove("current-tab"); //background color htaa do
    oldTab=newTab;
    oldTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active"))
    {
        //kya search bala is invisible , make it visible
   userInfoContainer.classList.remove("active");
   grantAccessContainer.classList.remove("active");
   searchForm.classList.add("active");
   }
     
   //mein phle search bale tab pr tha ab your vale ko visible krna hai 
 else{
    searchForm.classList.remove("active");
    userInfoContainer.classList.remove("active");
    getfromSessionStorage();
   }
}

}

userTab.addEventListener("click",()=>
{
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>
{
    switchTab(searchTab);
});

function getfromSessionStorage()
{
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates)
    {
        grantAccessContainer.classList.add("active");
    }
    else
    {
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates)
{
    const {lat,lon}=coordinates;
    //make grant contianer invisible 
    grantAccessContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    //API_CAll
    try
    {
        
    const res=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
      );
    
    const data=await res.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data); 

    }
    catch(err)
    {
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo)
{

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
    
    // console.log(weatherInfo);

 
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °K`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s `;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}








































// console.log("Bibi ki vines");
// const  API_key="cccb40191cf35af794dade15224f3785";

// function renderWeatherInfo(data)
// {
//         let newPara=document.createElement('p');
    
//          newPara.textContent=`${data?.main?.temp.toFixed(2)} deg C`
//          document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails()
// {
    
//     try{
//         let city="Goa";
        
//         const response=await (fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`));
        
//         const data= await response.json();
    
//         console.log("Weather data:-> ",data);
    
        
//         renderWeatherInfo(data);
//     }
    
//     catch(err)
//     {
    
    
//     }
    
    
// }

// async function getCustomWeatherDetails()
// {
//     try
//     {
//         let latitude=15.3333;
//         let longitude=74.0833;
//     let result=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
    
//     let data=await result.json();
//     console.log(data);

//     }
//     catch(err)
//     {
//         console.log("Error Found",err);

//     }
// }

// function switchTab(clickedTab) {
//     // apiErrorContainer.classList.remove("active");

//     if(clickedTab != currentTab) {
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")) {
//             //kya search form wala container is invisible, if yes then make it visible
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else {
//             //main pehle search wale tab pr tha, ab your weather tab visible karna h 
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
//             //for coordinates, if we haved saved them there.
//             // getfromSessionStorage();
//         }
//     }
// }

// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else {
//         console.log("No Geolocation supported");
//         //HW - show an alert for no gelolocation support available
//     }
// }

// function showPosition(position)
// {
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;
//     console.log(lat);
//     console.log(longi);
// }
