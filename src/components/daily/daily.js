import { getDay, getDate, getMonth, setWeatherIcon, setWeatherWind, setWeatherPressure, setWeatherTemp } from '@/functions';
import { createDailyButtons, createDailyItem } from '@/components/daily/components';

const ITEMS = 8;
const FIRST_DAY = 0;

class Daily {
    constructor() {
        this.container = document.querySelector(".forecast__daily");
        this.items = document.querySelector(".forecast__daily__items");

        this.counter = FIRST_DAY;
        this.btnNext;
        this.btnPrev;

        this.appendElements();
        this.btnPrev = document.querySelector(".forecast__daily__prev");
        this.btnNext = document.querySelector(".forecast__daily__next");
        this.btnPrev.style.display = "none";

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    init(data) {
        this.counter = FIRST_DAY;        

        this.setData(data);

        this.btnNext.onclick = null;
        this.btnNext.onclick = this.next;
        
        this.btnPrev.onclick = null;
        this.btnPrev.onclick = this.prev;
    }

    appendElements() {
        this.container.insertAdjacentHTML("afterbegin", createDailyButtons());

        for (let i = 0; i < ITEMS; i++) {
            this.items.insertAdjacentHTML("beforeend", createDailyItem());
        }
    }

    setData(data) {
        let counter = this.counter;
        const items = this.items.querySelectorAll(".forecast__daily__item");
        items.forEach(item => {
            this.setItem(item, data[counter++]);
        });
    }

    setItem(item, data) {
        const day = item.querySelector(".forecast__daily__day");
        const date = item.querySelector(".forecast__daily__date");
        const icon = item.querySelector(".forecast__daily__icon img");
        const iconBlock = item.querySelector(".forecast__daily__icon");
        const tempDay = item.querySelector(".forecast__daily__temp_day");
        const tempNight = item.querySelector(".forecast__daily__temp_night");
        const wind = item.querySelector(".forecast__daily__wind .data");
        const windArrow = item.querySelector(".forecast__daily__wind .arrow");
        const pressure = item.querySelector(".forecast__daily__pressure");

        day.textContent = getDay(data.dt);
        date.textContent = `${getDate(data.dt)} ${getMonth(data.dt)}`;

        setWeatherIcon(icon, data.weather[0].icon);
        setWeatherTemp(tempDay, data.temp.day);
        setWeatherTemp(tempNight, data.temp.night);
        setWeatherWind(wind, windArrow, data.wind_deg, data.wind_speed);
        setWeatherPressure(pressure, data.pressure, true);

        this.addEventListenerHover(iconBlock, data.weather[0].description);
    } 

    next() {
        const item = this.items.querySelector(".forecast__daily__item");
        const itemInfo = item.getBoundingClientRect();
        const itemWidth = itemInfo.width;

        const items = this.items;
        const currentLeft = window.getComputedStyle(items)["left"];
        const currentRight = window.getComputedStyle(items)["right"];

        items.style.left = parseInt(currentLeft) - itemWidth + "px";

        this.btnPrev.style.display = "block";
        if (parseInt(currentRight) >= 0 - itemWidth) {
            this.btnNext.style.display = "none";
        }
    }

    prev() {
        const item = this.items.querySelector(".forecast__daily__item");
        const itemInfo = item.getBoundingClientRect();
        const itemWidth = itemInfo.width;

        const items = this.items;
        const currentLeft = window.getComputedStyle(items)["left"];
        const currentRight = window.getComputedStyle(items)["right"];

        items.style.left = parseInt(currentLeft) + itemWidth + "px";
        
        this.btnNext.style.display = "block";
        if (parseInt(currentLeft) >= 0 - itemWidth){
            this.btnPrev.style.display = "none";
        }
    }

    // setData(data) {
    //     let counter = this.counter;
    //     this.items.forEach((item, index) => {
    //         this.setItem(item, data[counter]);
    //         counter++;
    //     });
    // }

    // setItem(item, weatherInfo) {
    //     const day = item.querySelector(".forecast__daily__day");
    //     const date = item.querySelector(".forecast__daily__date");
    //     const icon = item.querySelector(".forecast__daily__icon img");
    //     const iconBlock = item.querySelector(".forecast__daily__icon");
    //     const tempDay = item.querySelector(".forecast__daily__temp_day");
    //     const tempNight = item.querySelector(".forecast__daily__temp_night");
    //     const wind = item.querySelector(".forecast__daily__wind .data");
    //     const windArrow = item.querySelector(".forecast__daily__wind .arrow");
    //     const pressure = item.querySelector(".forecast__daily__pressure");

    //     day.textContent = getDay(weatherInfo.dt);
    //     date.textContent = `${getDate(weatherInfo.dt)} ${getMonth(weatherInfo.dt)}`;

    //     setWeatherIcon(icon, weatherInfo.weather[0].icon);
    //     setWeatherTemp(tempDay, weatherInfo.temp.day);
    //     setWeatherTemp(tempNight, weatherInfo.temp.night);
    //     setWeatherWind(wind, windArrow, weatherInfo.wind_deg, weatherInfo.wind_speed);
    //     setWeatherPressure(pressure, weatherInfo.pressure, true);

    //     this.addEventListenerHover(iconBlock, weatherInfo.weather[0].description);
    // }

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
}

const daily = new Daily();
export default daily;