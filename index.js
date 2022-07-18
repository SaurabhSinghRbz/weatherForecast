let apiKey = "3d4dff5515c3d3a103ef0450fb3cf1fa";
async function getData() {
    try {
        let myApiKey = "0f4df7381719acf8862567cf257610fa";
        let city = document.querySelector("#city").value
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myApiKey}&units=metric`
        let res = await fetch(url);
        let data = await res.json();

        // let t = data.list[0].dt_txt
        // const d = new Date(1658015370);
        // let day = d.getDay();
        if (city == "") {
            alert("Please type a city name")
        } else {
            displayData(data);
        }

    } catch (error) {
        console.log(error);
    }
}

function displayData(data) {
    document.getElementById("buttBox").innerHTML = ""
    document.getElementById("container").innerHTML = "";
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
    let h2 = document.createElement("h2")
    h2.innerHTML = cityName;

    let div11 = document.createElement("div");

    let show = document.createElement("div");
    let show1 = document.createElement("div");
    let show2 = document.createElement("div");
    show1.innerHTML = temp + "°C";
    show2.innerHTML = cloud;

    show.append(show1, show2)

    let imgBox = document.createElement("div");
    let img = document.createElement("img");
    img.src = "./images/sun.png"
    imgBox.append(img)

    div11.append(show, imgBox)


    let div12 = document.createElement("div");
    let p1 = document.createElement("p");
    p1.innerHTML = "Maximum Temp : "
    let p1span = document.createElement("span");
    p1span.innerHTML = `${max_temp}°C`
    p1.append(p1span);

    let p2 = document.createElement("p");
    p2.innerHTML = "Minimum Temp : "
    let p2span = document.createElement("span");
    p2span.innerHTML = `${min_temp}°C`
    p2.append(p2span);


    let p3 = document.createElement("p");
    p3.innerHTML = "Ground Level : "
    let p3span = document.createElement("span");
    p3span.innerHTML = `${ground_lev}`
    p3.append(p3span);

    let p4 = document.createElement("p");
    p4.innerHTML = "Wind Speed : "
    let p4span = document.createElement("span");
    p4span.innerHTML = `${wind} km/h`
    p4.append(p4span);

    let p5 = document.createElement("p");
    p5.innerHTML = "Feels like : "
    let p5span = document.createElement("span");
    p5span.innerHTML = `${feelsLike}`
    p5.append(p5span);

    let p6 = document.createElement("p");
    p6.innerHTML = "See Level : "
    let p6span = document.createElement("span");
    p6span.innerHTML = `${seeLevel}`
    p6.append(p6span);

    let p7 = document.createElement("p");
    p7.innerHTML = "Humidity : "
    let p7span = document.createElement("span");
    p7span.innerHTML = `${hum}`
    p7.append(p7span);

    let p8 = document.createElement("p");
    p8.innerHTML = "Pressure : "
    let p8span = document.createElement("span");
    p8span.innerHTML = `${press}`
    p8.append(p8span);
    let p9 = document.createElement("p");
    p9.innerHTML = "Clouds : "
    let p9span = document.createElement("span");
    p9span.innerHTML = `${cloud} ${clouds}`
    p9.append(p9span);


    div12.append(p1, p2, p3, p4, p5, p6, p7, p8, p9)

    div1.append(h2, div11, div12);



    let mapCity = data.city.name + " " + data.city.country
    let div2 = document.createElement("div");
    div2.id = "mapBox"
    let iframeBox = document.createElement("iframe");
    iframeBox.id = "gmap_canvas"
    iframeBox.src = `https://maps.google.com/maps?q=${mapCity}&t=k&z=13&ie=UTF8&iwloc=&output=embed`;
    div2.append(iframeBox);
    document.getElementById("container").append(div1, div2)


    let butt = document.createElement("button")
    butt.innerHTML = "Show upcoming 7 days forecast 🡲";
    butt.className = "glow-on-hover";
    document.querySelector("#buttBox").append(butt)

}



