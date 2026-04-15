function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

const apiKey = "YOUR_API_KEY";

let inputBox = document.getElementById("cityInput");
inputBox.addEventListener("input", async function() {
    const city = this.value;

    if (city.length < 3) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.cod === 200) {
        document.getElementById("countryResult").innerText =
            data.sys.country;
    }else {
        document.getElementById("countryResult").innerText = "Not found ❌";
    }
});

function addCity() {
    const city = document.getElementById("cityInput").value;
    const country = document.getElementById("countryResult").innerText;

    const favList = document.querySelector(".favorites");

    const newCity = document.createElement("div");
    newCity.classList.add("fav-item");

    newCity.innerHTML = `
        ${city}
        <span>${country}</span>
    `;

    favList.appendChild(newCity);

    closeModal();
}

