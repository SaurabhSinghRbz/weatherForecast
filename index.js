var myApiKey = "3d4dff5515c3d3a103ef0450fb3cf1fa";
async function getData() {
    try {
        document.getElementById('container').classList.remove('mountingAnimation');
        document.getElementById("container").innerHTML = "";
        document.getElementById("container").style.display = "grid";
        document.getElementById("upcomingForecast").style.display = "none";
        document.getElementById("buttBox").innerHTML = "";
        let city = document.querySelector("#city").value
        if (city === "") {
            return alert("Please enter a city name");
        }
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myApiKey}&units=metric`
        let res = await fetch(url);
        let data = await res.json();
        displayData(data);
    } catch (error) {
        let city = document.querySelector("#city").value
        displayError(city);
    }
}

function clearContainer() {
    let city = document.querySelector("#city").value
    if (city === "") {
        document.getElementById("container").style.display = "none";
        document.getElementById("upcomingForecast").style.display = "none";
        document.getElementById("buttBox").innerHTML = "";
    }
}



function displayError(city) {
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").style.display = "block";
    document.getElementById("upcomingForecast").style.display = "none";
    document.getElementById("buttBox").innerHTML = "";
    let error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = `<p>Sorry, we couldn't find the city ${city}, <br/> Try searching for another city.</p>`;
    document.getElementById("container").appendChild(error);
}


function displayData(data) {
    document.getElementById('container').className = 'mountingAnimation';
    let cityName = data.city.name
    let cloud = data.list[0].weather[0].description
    let temp = data.list[0].main.temp
    let max_temp = data.list[0].main.temp_max;
    let min_temp = data.list[0].main.temp_min;
    let ground_lev = data.list[0].main.grnd_level;
    let feelsLike = data.list[0].main.feels_like;
    let seeLevel = data.list[0].main.sea_level;
    let hum = data.list[0].main.humidity;
    let press = data.list[0].main.pressure;
    let wind = data.list[0].wind.speed;
    let clouds = data.list[0].clouds.all;


    let div1 = document.createElement("div");
    div1.id = "tempBox"

    let cityDiv = document.createElement("div");
    cityDiv.id = "cityDiv"

    let cityname = document.createElement("p");
    cityname.innerText = cityName;

    let timeDateBox = document.createElement("div");
    timeDateBox.id = "timeDateBox";
    const today = new Date();
    let date = document.createElement("p");
    date.innerText = today.toDateString();
    let time = document.createElement("p");
    time.innerText = "Time - " + today.toLocaleTimeString();
    timeDateBox.append(time, date);

    cityDiv.append(cityname, timeDateBox);

    let div11 = document.createElement("div");

    let show = document.createElement("div");
    let show1 = document.createElement("div");
    let show2 = document.createElement("div");
    show1.innerHTML = temp + "°C";
    show2.innerHTML = cloud;

    show.append(show1, show2)

    let imgBox = document.createElement("div");
    let img = document.createElement("img");

    // Specifying Day or Night ---------->
    //  first toTimeString().split(" ") will return an array which lools like this 

    // [
    //     "23:42:29",
    //     "GMT+0530",
    //     "(India",
    //     "Standard",
    //     "Time)"
    // ]

    // and further split the 0th index element and get the first element which represetns the current hour
    // and basis on current hour we will change the image;

    let currentTime = today.toTimeString().split(" ")[0].split(":").map(Number)

    if (currentTime[0] > 17 || currentTime[0] <= 5) {
        div11.style.backgroundImage = "url(./images/night.jpg)"
        img.src = "./images/moon.jpg"
    } else {
        div11.style.backgroundImage = "url(./images/day.jpg)"
        img.src = "./images/sun.png"
    }
    // ------------------------------------------------------

    imgBox.append(img)

    div11.append(show, imgBox)


    let div12 = document.createElement("div");
    let p1 = document.createElement("p");
    p1.innerHTML = "Maximum Temp"
    let p1span = document.createElement("span");
    p1span.innerHTML = `${max_temp}°C`
    p1.append(p1span);

    let p2 = document.createElement("p");
    p2.innerHTML = "Minimum Temp"
    let p2span = document.createElement("span");
    p2span.innerHTML = `${min_temp}°C`
    p2.append(p2span);


    let p3 = document.createElement("p");
    p3.innerHTML = "Ground Level"
    let p3span = document.createElement("span");
    p3span.innerHTML = `${ground_lev}`
    p3.append(p3span);

    let p4 = document.createElement("p");
    p4.innerHTML = "Wind Speed"
    let p4span = document.createElement("span");
    p4span.innerHTML = `${wind} km/h`
    p4.append(p4span);

    let p5 = document.createElement("p");
    p5.innerHTML = "Feels like"
    let p5span = document.createElement("span");
    p5span.innerHTML = `${feelsLike}`
    p5.append(p5span);

    let p6 = document.createElement("p");
    p6.innerHTML = "See Level"
    let p6span = document.createElement("span");
    p6span.innerHTML = `${seeLevel}`
    p6.append(p6span);

    let p7 = document.createElement("p");
    p7.innerHTML = "Humidity"
    let p7span = document.createElement("span");
    p7span.innerHTML = `${hum}`
    p7.append(p7span);

    let p8 = document.createElement("p");
    p8.innerHTML = "Pressure"
    let p8span = document.createElement("span");
    p8span.innerHTML = `${press}`
    p8.append(p8span);
    let p9 = document.createElement("p");
    p9.innerHTML = "Clouds"
    let p9span = document.createElement("span");
    p9span.innerHTML = `${cloud} ${clouds}`
    p9.append(p9span);


    div12.append(p1, p2, p3, p4, p5, p6, p7, p8, p9)

    div1.append(cityDiv, div11, div12);



    let mapCity = data.city.name + " " + data.city.country
    let div2 = document.createElement("div");
    div2.id = "mapBox"
    let iframeBox = document.createElement("iframe");
    iframeBox.id = "gmap_canvas"
    iframeBox.src = `https://maps.google.com/maps?q=${mapCity}&t=k&z=13&ie=UTF8&iwloc=&output=embed`;
    div2.append(iframeBox);
    document.getElementById("container").append(div1, div2)


    let butt = document.createElement("button")
    butt.innerHTML = "Show upcoming 7 days forecast 🙈";
    butt.className = "glow-on-hover";
    document.querySelector("#buttBox").append(butt)
    let f = true;
    butt.onclick = function () {
        if (f) {
            document.getElementById('upcomingForecast').className = 'mountingAnimation';
            document.querySelector("#upcomingForecast").style.display = "flex";
            butt.innerHTML = "Hide upcoming 7 days forecast 🐵";
            f = false;
            displayUpcomingForecast(data);
        } else {
            butt.innerHTML = "Show upcoming 7 days forecast 🙈";
            f = true;
            document.querySelector("#upcomingForecast").style.display = "none";
        }

    };
}





function displayUpcomingForecast(data) {

    document.querySelector("#upcomingForecast").value = null;

    let orderDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let t = data.list[0].dt_txt
    const d = new Date(t);
    let day = d.getDay();
    let days = [];
    days.push("Today")
    for (let i = day + 1; i < orderDay.length; i++) {
        days.push(orderDay[i])
    }

    for (let j = 0; j <= day; j++) {
        days.push(orderDay[j])
    }

    let images = ["./images/1.png", "./images/2.png", "./images/3.png"]

    document.querySelector("#upcomingForecast").innerHTML = null;
    for (let i = 0; i <= 7; i++) {

        let div = document.createElement("div");
        div.className = "upcomingForecastBox";
        let name = document.createElement("p");
        name.innerText = days[i];

        // get the next date-------------------
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);

        let date = document.createElement("p");
        let withMonth = nextDay.toDateString().split(" ");
        date.innerText = withMonth[2] + " " + withMonth[1] + " " + withMonth[3];
        // ---------------------------------------------------------------------


        let image = document.createElement("img");
        if (+data.list[i].main.temp > 30) {
            image.src = images[0];
        } else if (+data.list[i].main.temp > 20 && +data.list[i].main.temp < 25) {
            image.src = images[1]
        } else {
            image.src = images[2];
        }
        let lowTemp = document.createElement("p");
        lowTemp.innerText = data.list[i].main.temp_min + "°C";
        let wind = document.createElement("p");
        wind.innerText = data.list[i].wind.speed + "Km/h";

        div.append(name, date, image, lowTemp, wind);
        document.getElementById("upcomingForecast").style.backgroundColor = "#0f0f0fe1"
        document.getElementById("upcomingForecast").style.boxShadow = "0 0 5px 5px rgb(212, 203, 203)"
        document.querySelector("#upcomingForecast").append(div);
    }
}