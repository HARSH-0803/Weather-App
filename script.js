let apiKey = "f8bbeae052c34abb92d151644261604";

async function getWeather(city) {

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.error) {
        alert("City Not Found");
        return;
    }

    // ===== CURRENT =====
    document.getElementById("temp").innerText =
        Math.round(data.current.temp_c) + "°C";

    document.getElementById("condition").innerText =
        data.current.condition.text;

    document.getElementById("city").innerText =
        data.location.name + ", " + data.location.country;


    // Day and Night Concept :

    let iconBox = document.getElementById("weatherIcon");
    if(data.current.is_day === 1){
        iconBox.innerHTML = "☀️"
    }
    else{
        iconBox.innerHTML = "🌙"
    }


    //Dynamic Background Change :

    let main = document.querySelector(".main");
    
    let condition = data.current.condition.text.toLowerCase();

    if(condition.includes("sun")){
        main.style.background = "linear-gradient(135deg, #4facfe, #94a5a5)";
    }
    else if(condition.includes("rain")){
        main.style.background = "linear.gradient(135deg, #4b6cb7, #182848 )";
    }
    else if(condition.includes("cloud")){
        main.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)"
    }
    else {
        main.style.background = "linear-gradient(135deg, #0b1220, #0a0f1c)"
    }

    // ===== WEEKLY =====
    let weekly = document.getElementById("weekly");
    weekly.innerHTML = "";

    data.forecast.forecastday.forEach(day => {

        let date = new Date(day.date);

        let formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            weekday: "short"
        });

        let card = document.createElement("div");
        card.classList.add("day-card");

        card.innerHTML = `
            <p>${formattedDate}</p>
            <span>${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°</span>
            <img src="https:${day.day.condition.icon}" width="25"/>
        `;

        weekly.appendChild(card);
    });


    // ===== HOURLY =====
    let hourly = document.getElementById("hourly");
    hourly.innerHTML = "";

    let hours = data.forecast.forecastday[0].hour;
    let currentHour = new Date().getHours();
    let nextHours = [];

    for(let i = 0; i < 8; i++){
        nextHours.push(hours[(currentHour + i) % 24]);
    }

    nextHours.forEach(h => {

        let time = new Date(h.time).getHours();
        let formatted = time % 12 || 12;
        let ampm = time >= 12 ? "PM" : "AM";

        let card = document.createElement("div");
        card.classList.add("hour-card");

        card.innerHTML = `
            <p>${formatted} ${ampm}</p>
            <img src="https:${h.condition.icon}" width="30"/>
            <span>${Math.round(h.temp_c)}°</span>
        `;

        hourly.appendChild(card);
    });
}
// Modal Function :

function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Here From this code the country will be auto selected :

let inputBox = document.getElementById("cityInput");
inputBox.addEventListener("input", async function () {
    let city = this.value;
    if (city.length < 3) return;

    let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    let response = await fetch(url);
    let data = await response.json();

    if (!data.error) {
        document.getElementById("countryResult").innerText =
            data.location.country;
    }
    else {
        document.getElementById("countryResult").innerText =
            "Not Found";
    }
});

// Here is the code how to Add the City :

function addCity() {
    let city = document.getElementById("cityInput").value;
    let country = document.getElementById("countryResult").innerText;

    let favList = document.querySelector(".favorites");

    let newCity = document.createElement("div");
    newCity.classList.add("fav-item");

    newCity.innerHTML = `
   <div class="BigBox">
    <div class="fav-item">
    ${city}
    <span>${country}</span>
    </div>
    <div>
     <button class="delete-btn">❌</button>
     </div>
     </div>
    `;

    //Here when the user click the weather will change :

    newCity.addEventListener("click", () => {
        getWeather(city);
    });
 
    // Delete Button :

    let deleteBtn = newCity.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        newCity.remove();
    });

    favList.appendChild(newCity);

    closeModal();
}
// default call
getWeather("Vadodara, India");