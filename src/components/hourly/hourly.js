import { createHourlyButtons, createHourlyItem } from "@/components/hourly/components.js";
import { getTime, setWeatherIcon, setWeatherTemp, setWeatherWind, setWeatherPressure } from "@/functions";

const ITEMS = 48; // Количество item-ов (часов для прогноза)

class Hourly {
    constructor() {
        this.container = document.querySelector(".forecast__hourly");
        this.items = document.querySelector(".forecast__hourly__items");

        this.counter = 0;
        this.btnPrev;
        this.btnNext;

        this._appendElements(); // Добавление элементов в this.container (кнопки и item-ы)
        this.btnPrev = document.querySelector(".forecast__hourly__prev"); // Теперь можно найти эти кнопки
        this.btnNext = document.querySelector(".forecast__hourly__next"); // _____________________________
        this.btnPrev.style.display = "none"; // Изначально кнопка "листать влево" не отображается

        this._next= this._next.bind(this);
        this._prev = this._prev.bind(this);
    }

    init(data) {
        this.counter = 0;       

        this._setData(data); // Вставить данные в элементы html (температура, иконка погоды, дата и т.д)

        this.btnNext.onclick = null;
        this.btnNext.onclick = this._next;
        
        this.btnPrev.onclick = null;
        this.btnPrev.onclick = this._prev;
    }

    _appendElements() {
        this.container.insertAdjacentHTML("afterbegin", createHourlyButtons());

        for (let i = 0; i < ITEMS; i++) {
            this.items.insertAdjacentHTML("beforeend", createHourlyItem());
        }
    }

    _setData(data) {
        // Добавление данных в каждый item в процессе итерации по массиву этих элементов (item-ов)
        let counter = this.counter;
        const items = this.items.querySelectorAll(".forecast__hourly__item");
        items.forEach(item => {
            this._setItem(item, data[counter++]);
        });
    }

    _setItem(item, data) {
        const time = item.querySelector(".forecast__hourly__time");
        const icon = item.querySelector(".forecast__hourly__icon img");
        const iconBlock = item.querySelector(".forecast__hourly__icon");
        const temp = item.querySelector(".forecast__hourly__temp");
        const wind = item.querySelector(".forecast__hourly__wind .data");
        const windArrow = item.querySelector(".forecast__hourly__wind .arrow");
        const pressure = item.querySelector(".forecast__hourly__pressure");

        const timeValue = getTime(data.dt).split(":");
        time.innerHTML = `${timeValue[0]}<span>00</span>`;

        setWeatherIcon(icon, data.weather[0].icon);
        setWeatherTemp(temp, data.temp);
        setWeatherWind(wind, windArrow, data.wind_deg, data.wind_speed);
        setWeatherPressure(pressure, data.pressure);

        this._addEventListenerHover(iconBlock, data.weather[0].description);
    }

    // Отображение описания погоды (Если иконка не понятна) по нажатию на иконку погоды
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

    _next() {
        const item = this.items.querySelector(".forecast__hourly__item");
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

    _prev(){        
        const item = this.items.querySelector(".forecast__hourly__item");
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
}

const hourly = new Hourly();
export default hourly;