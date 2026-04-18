let apiKey = "f8bbeae052c34abb92d151644261604";

// Weather Function
async function getWeather(city) {
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    // Error Handling:

    if (data.error) {
        alert("City Not Found");
        return;
    }

    // UI Update :

    document.getElementById("temp").innerText =
        Math.round(data.current.temp_c) + "°C";

    document.getElementById("condition").innerText =
        data.current.condition.text;

    document.getElementById("city").innerText =
        data.location.name + ", " + data.location.country;
}

getWeather("Vadodara, India");

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

    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

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
