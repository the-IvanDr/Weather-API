import { getTime, setWeatherIcon, setWeatherTemp, setWeatherWind, setWeatherPressure } from "@/functions";

const ITEMS = 5;
const DIFF = 3;
const MAX = 48-DIFF*ITEMS;

class Hourly {
    constructor() {
        this.container = document.querySelector(".forecast__hourly");
        this.items = document.querySelectorAll(".forecast__hourly__item");

        this.counter = DIFF;
        this.btnPrev = document.querySelector(".forecast__hourly__prev");
        this.btnNext = document.querySelector(".forecast__hourly__next");
    }

    init(data) {
        this.counter = DIFF;
        this.setData(data);

        this.btnNext.onclick = null;
        this.btnNext.onclick = () => this.next(data);

        this.btnPrev.style.display = "none";
        this.btnPrev.onclick = null;
        this.btnPrev.onclick = () => this.prev(data);
    }

    setData(data) {
        let counter = this.counter;
        this.items.forEach((item, index) => {
            this.setItem(item, data[counter]);
            counter += DIFF;
        });
    }

    setItem(item, weatherInfo) {
        const time = item.querySelector(".forecast__hourly__time");
        const iconBlock = item.querySelector(".forecast__hourly__icon");
        const icon = item.querySelector(".forecast__hourly__icon img");
        const temp = item.querySelector(".forecast__hourly__temp");
        const wind = item.querySelector(".forecast__hourly__wind .data");
        const windArrow = item.querySelector(".forecast__hourly__wind .arrow");
        const pressure = item.querySelector(".forecast__hourly__pressure");

        const timeValue = getTime(weatherInfo.dt, true).split(":");
        time.innerHTML = `${timeValue[0]}<span>${timeValue[1]}</span>`;

        setWeatherIcon(icon, weatherInfo.weather[0].icon);
        setWeatherTemp(temp, weatherInfo.temp);
        setWeatherWind(wind, windArrow, weatherInfo.wind_deg, weatherInfo.wind_speed);
        setWeatherPressure(pressure, weatherInfo.pressure, true);

        this.addEventListenerHover(iconBlock, weatherInfo.weather[0].description);
    }

    addEventListenerHover(item, descr) {
        let tip;
        descr = descr.split("")[0].toUpperCase().concat(descr.slice(1));

        item.addEventListener("mouseover", (event) => {
            tip = document.createElement("div");

            tip.textContent = descr;
            tip.classList.add("weather-tip");
            item.append(tip);
        });

        item.addEventListener("mouseout", (event) => {
            if (tip) {
                tip.remove();
                tip = null;
            }
        });
    }

    next(data) {
        this.counter += DIFF;
        if (this.counter <= MAX) {
            this.setData(data);
            this.btnPrev.style.display = "block";

            if (this.counter + DIFF > MAX) {
                this.btnNext.style.display = "none";
            }
        }
    }

    prev(data) {
        if (this.counter > (1 + DIFF)) {
            this.counter -= DIFF;
            this.setData(data);
            this.btnNext.style.display = "block";

            if ((this.counter - DIFF) < (1+DIFF)){
                this.btnPrev.style.display = "none";
            }
        } 
    }
}

const hourly = new Hourly();
export default hourly;