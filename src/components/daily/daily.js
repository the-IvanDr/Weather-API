import { getDay, getDate, getMonth, setWeatherIcon, setWeatherWind, setWeatherPressure, setWeatherTemp } from '@/functions';
import { createDailyButtons, createDailyItem } from '@/components/daily/components';

const ITEMS = 8; // Кол-во элементов в слайдере
const FIRST_DAY = 0; // Первый отображаемый день (0 - текущий день)

class Daily {
    constructor() {
        this.container = document.querySelector(".forecast__daily");
        this.items = document.querySelector(".forecast__daily__items");

        this.counter = FIRST_DAY;
        this.btnNext;
        this.btnPrev;

        this._appendElements(); // Добавление элементов в this.container (две кнопки + item-ы)
        this.btnPrev = document.querySelector(".forecast__daily__prev"); // Теперь можно найти кнопки
        this.btnNext = document.querySelector(".forecast__daily__next"); // _________________________
        this.btnPrev.style.display = "none"; // Изначально кнопка "листать влево" не отображается

        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
    }

    init(data) {
        this.counter = FIRST_DAY;        

        this._setData(data);

        this.btnNext.onclick = null;
        this.btnNext.onclick = this._next;
        
        this.btnPrev.onclick = null;
        this.btnPrev.onclick = this._prev;
    }

    _appendElements() {
        this.container.insertAdjacentHTML("afterbegin", createDailyButtons());

        for (let i = 0; i < ITEMS; i++) {
            this.items.insertAdjacentHTML("beforeend", createDailyItem());
        }
    }

    _setData(data) {
        let counter = this.counter;
        const items = this.items.querySelectorAll(".forecast__daily__item");
        items.forEach(item => {
            this._setItem(item, data[counter++]);
        });
    }

    _setItem(item, data) {
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

        this._addEventListenerHover(iconBlock, data.weather[0].description);
    } 

    _next() {
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

    _prev() {
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

    _addEventListenerHover(item, descr) {
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