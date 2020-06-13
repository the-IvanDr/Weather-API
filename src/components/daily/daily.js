import { getDay, getDate, getMonth, setWeatherIcon, setWeatherWind, setWeatherPressure, setWeatherTemp } from '@/functions';

const FIRST_DAY = 1;
const ITEMS = 5;

const MAX = 8+FIRST_DAY-1*ITEMS;

class Daily {
    constructor() {
        this.container = document.querySelector(".forecast__daily");
        this.items = document.querySelectorAll(".forecast__daily__item");

        this.counter = FIRST_DAY;
        this.btnNext = document.querySelector(".forecast__daily__next");
        this.btnPrev = document.querySelector(".forecast__daily__prev");
    }

    init(data) {
        console.log("Daily:", data);

        this.counter = FIRST_DAY;
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
            counter++;
        });
    }

    setItem(item, weatherInfo) {
        const day = item.querySelector(".forecast__daily__day");
        const date = item.querySelector(".forecast__daily__date");
        const icon = item.querySelector(".forecast__daily__icon img");
        const iconBlock = item.querySelector(".forecast__daily__icon");
        const tempDay = item.querySelector(".forecast__daily__temp_day");
        const tempNight = item.querySelector(".forecast__daily__temp_night");
        const wind = item.querySelector(".forecast__daily__wind .data");
        const windArrow = item.querySelector(".forecast__daily__wind .arrow");
        const pressure = item.querySelector(".forecast__daily__pressure");

        day.textContent = getDay(weatherInfo.dt);
        date.textContent = `${getDate(weatherInfo.dt)} ${getMonth(weatherInfo.dt)}`;

        setWeatherIcon(icon, weatherInfo.weather[0].icon);
        setWeatherTemp(tempDay, weatherInfo.temp.day);
        setWeatherTemp(tempNight, weatherInfo.temp.night);
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
        this.counter++;
        if (this.counter < MAX) {
            console.log("COUNTER", this.counter);
            this.setData(data);

            this.btnPrev.style.display = "block";

            if (this.counter + 1 >= MAX) {
                this.btnNext.style.display = "none";
            }
        }
    }

    prev(data) {
        if (this.counter > FIRST_DAY) {
            this.counter--;
            this.setData(data);
            this.btnNext.style.display = "block";

            if (this.counter - 1 < FIRST_DAY) {
                this.btnPrev.style.display = "none";
            }
        }
    }
}

const daily = new Daily();
export default daily;