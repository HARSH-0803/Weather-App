let apiKey = "f8bbeae052c34abb92d151644261604";

// Weather Function
async function getWeather(city){
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    // Error Handling:

    if(data.error){
        alert("City Not Found");
        return ;
    }

    // UI Update :

    document.getElementById("temp").innerText = 
    data.current.temp_c + "°C" ;

    document.getElementById("condition").innerText = 
    data.current.condition.text;

    document.getElementById("city").innerText = 
    data.location.name + ", " + data.location.country;
}

getWeather("Delhi, India");

// Modal Function :

function openModal(){
    document.getElementById("modal").style.display = "flex";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
}

// Here From this code the country will be auto selected :
