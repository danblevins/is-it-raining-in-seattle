const weatherConditions = {
    "yes": ["thunderstorm", "drizzle", "rain", "mist"],
    "noBut": ["broken clouds", "overcast clouds"],
}

let weather = {
    apiKey: "",

    fetchWeather: function () {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { icon, description, main } = data.weather[0];

        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        if (weatherConditions.yes.includes(main.toLowerCase())) {
            document.querySelector(".answer").innerText = "Yes! It's your typical Seattle day.";
        }
        else if (weatherConditions.noBut.includes(description.toLowerCase())) {
            document.querySelector(".answer").innerText = "No, but wear a Jacket.";
        }
        else {
            document.querySelector(".answer").innerText = "Nope! They don't call it the Sunshine City for nothing.";
        }

        document.querySelector(".time").innerText = ". Updates every 10 minutes."
        document.querySelector(".description").innerText = description;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?Seattle')";
    },
};

weather.fetchWeather("Seattle");
