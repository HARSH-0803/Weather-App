let apiKey = "f8bbeae052c34abb92d151644261604";

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    document.getElementById("temp").innerText = data.current.temp_c + "°C";

    document.getElementById("condition").innerText = data.current.condition.text;

    document.getElementById("city").innerText = data.location.name;
}

getWeather("Delhi , India");