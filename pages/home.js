    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('index.sw.js');
                console.log('Service worker registration sucessful');
                console.log(`Registered with scope: ${registration.scope}`);
            } catch (e) {
                debugger;
                console.log('Service worker registration failed');
                console.log(e);
            }
        });
    }



  const nameValue = document.querySelector("#name");
const latValue = document.querySelector("#lat");
const lngValue = document.querySelector("#lng");
const humidityValue = document.querySelector("#humidity");
const tempValue = document.querySelector("#temp");
const descValue = document.querySelector("#desc");
const presValue = document.querySelector("#pressure");
const windDgValue = document.querySelector("#wind-degree");
const windSpValue = document.querySelector("#wind-speed");
const inputField = document.querySelector("#searchbox");
const form = document.querySelector("#form");
const weatherContent = document.querySelector("#weather-content");
const push = document.querySelector("#notification");

// getting the weather array from local storage
let WeatherArray = JSON.parse(localStorage.getItem("weatherdata")) || [];

// load items
document.addEventListener("DOMContentLoaded", function () {
  getWeatherContent(WeatherArray);
  console.log(WeatherArray);
});

const getWeatherContent = (arr) => {
  let mappedArr = arr.map((data) => {
    return `<div class="col-12 col-md-6  col-lg-4 py-2">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title" id="name">${data.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Lat: <span id="lat" class="badge badge-info">${
                          data.coord.lat
                        }</span>, Lng: <span id="lng" class="badge badge-info">${
      data.coord.lon
    }</span> </h6>
                        <p class="card-text">Humidity: <span id="humidity" style="color:cornflowerblue">${
                          data.main.humidity
                        }</span>, Temp: <span id="temp"
                                style="color:cornflowerblue">${
                                  data.main.temp
                                }</span>, Desc:
                            <span style="color:cornflowerblue" id="desc">${data.weather.map(
                              (item) => item.description
                            )}</span> </p>
                        <p class="card-text">Pressure: <span style="color:cornflowerblue" id="pressure">${
                          data.main.pressure
                        }</span>, WDeg: <span
                                style="color:cornflowerblue" id="wind-degree">${
                                  data.wind.deg
                                }deg</span>,
                            WSpeed: <span style="color:cornflowerblue" id="wind-speed">${
                              data.wind.speed
                            }</span></p>
                        
                    </div>
                </div>
            </div>`;
  });
  mappedArr = mappedArr.join("");
  weatherContent.innerHTML = mappedArr;
};

// function 1
const GetWeather = (Location) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=f2d47a3d0678e2f3a5ee723ea2c517d3`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      WeatherArray.unshift(data);
      console.log(WeatherArray);
      localStorage.setItem("weatherdata", JSON.stringify(WeatherArray));
      setTimeout(() => {
        location.reload();
      }, 3500);
    })
    .catch((error) => {
      console.log(error);
    });
};

// function 2
const handleSubmit = (e) => {
  e.preventDefault();
  if (inputField.value.trim() === "") {
    alert("enter any location");
  } else {
    GetWeather(inputField.value);
    getWeatherContent(WeatherArray);
    console.log(inputField.value, "submitted!");
    inputField.value = "";
  }
};

// event Listener => 'submit'
form.addEventListener("submit", handleSubmit);



// push notifications

const displayConfirmNotification = () => {
    if ("serviceWorker" in navigator) {
      let options = {
        body: "Subscription successful!",
        icon: "./logo.png",
        image: "./logo.png",
        dir: "ltr",
        tag: "confirm-notification",
        renotify: true,
        actions: [
          { action: "confirm", title: "Okay", icon: "./logo.png" },
          { action: "cancel", title: "Cancel", icon: "./logo.png" },
        ],
      };
  
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification("You successfully subscribed (from SW!)", options);
      });
    }
  };
  
  const notifyMe = () => {
    Notification.requestPermission((result) => {
      console.log("user choice", result);
      if (result !== "granted") {
        alert("Please permit notifications");
      } else {
        displayConfirmNotification();
      }
    });
  };
  
  // Let's check if the browser supports notifications
  if ("Notification" in window) {
    push.style.display = "block";
    push.addEventListener("click", notifyMe);
  }