import GetWeather from "@/ApiData";
import rightNow from '@/components/right-now/right-now';
import hourly from '@/components/hourly/hourly';
import daily from "@/components/daily/daily";

export default class Header {
    constructor() {
        this.Weather = new GetWeather();
        this.currentCity = "Славянск";
        this.currentData;// = this.Weather.getCurrentData(this.currentCity);
        this.allData;// = this.Weather.getAllData("48.87", "37.62");

        this.getInputCity = this.getInputCity.bind(this);
        this.init();
    }

    async init() {
        this.currentData = await this.Weather.getCurrentData(this.currentCity);

        const lat = this.currentData.coord.lat;
        const lon = this.currentData.coord.lon;
        this.allData = await this.Weather.getAllData(lat, lon);

        this.showCurrentCity();

        this.setGlobalbackground();
        rightNow.setData(this.currentData, this.allData.hourly[0].temp);
        hourly.init(this.allData.hourly);
        daily.init(this.allData.daily);

        const searchForm = document.querySelector(".search");
        searchForm.addEventListener("submit", this.getInputCity);

        const inputCity = document.querySelector(".search__text-input");
        inputCity.addEventListener("input", this.inputCity);
    }

    async getInputCity(event) {
        event.preventDefault();

        const cityInput = document.querySelector(".search__text-input");
        this.currentCity = cityInput.value.trim();

        if (this.currentCity) {
            try {
                this.currentData = await this.Weather.getCurrentData(this.currentCity);

                const lat = this.currentData.coord.lat;
                const lon = this.currentData.coord.lon;

                this.allData = await this.Weather.getAllData(lat, lon);
                this.currentCity = this.currentData.name;
                this.showCurrentCity();
                this.setGlobalbackground();

                console.log("Current:", this.currentData);
                console.log("All:", this.allData);
            } catch {
                this.showWarn("В названии города допущена ошибка, или город отсутствует в базе данных...");
                return;
            }
        } else {
            this.showWarn("Введите название города");
            return;
        }
        cityInput.value = "";
        rightNow.setData(this.currentData, this.allData.hourly[0].temp);
        hourly.init(this.allData.hourly);
        daily.init(this.allData.daily);
    }

    inputCity() {
        const temp = document.querySelector(".header__warn");
        if (temp) {
            temp.style.opacity = "0";
            setTimeout(() => {
                temp.remove();
            }, 600);
        }
    }

    showWarn(msg) {
        const temp = document.querySelector(".header__warn");
        if (temp) temp.remove();

        const form = document.querySelector(".search");
        const warnElement = document.createElement("div");
        warnElement.textContent = msg;
        warnElement.classList.add("header__warn");

        const formOptions = form.getBoundingClientRect();

        warnElement.style.top = formOptions.top + formOptions.height - 10 + "px";
        form.append(warnElement);
    }

    showCurrentCity() {
        const elem = document.querySelector(".current-city__title");
        elem.textContent = this.currentCity;
    }

    setGlobalbackground() {
        const time = new Date(this.currentData.dt * 1000).getHours();
        const weather = this.currentData.weather[0].id;
        let image = "clearly_day.jpg";

        if (weather >= 200 && weather <= 232) image = "storm";
        else if (weather >= 300 && weather <= 531) image = "rain";
        else if (weather >= 600 && weather <= 622) image = "snow";
        else if (weather >= 701 && weather <= 781) image = "fog";
        else if (weather === 800) image = "clearly";
        else if (weather >= 801 && weather <= 804) image = "cloudy";

        if (time >= 0 && time < 21) image += "_day.jpg";
        else image += "_evening.jpg";

        const body = document.querySelector("body");
        body.style.background = `url("./img/header/${image}")`;  
        body.style.backgroundPosition = "top"; 
        body.style.backgroundRepeat = "no-repeat";     
        body.style.backgroundSize = "cover";     
    }
}