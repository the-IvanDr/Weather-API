import GetWeather from "@/ApiData";
import rightNow from '@/components/right-now/right-now';
import hourly from '@/components/hourly/hourly';
import daily from "@/components/daily/daily";

export default class Header {
    constructor() {
        this.Weather = new GetWeather(); // Класс для работы с API
        this.currentCity = "Славянск"; // Город по умолчанию
        this.currentData; // Погода на текущий момент
        this.allData; // Погода по часово (48 часов) и по денно (текущий + 7 дней)

        this.getInputCity = this.getInputCity.bind(this);
        this.init();
    }

    async init() {
        this.currentData = await this.Weather.getCurrentData(this.currentCity);

        const lat = this.currentData.coord.lat; // широта \
        const lon = this.currentData.coord.lon; // и долгота для работы API
        this.allData = await this.Weather.getAllData(lat, lon);

        this.showCurrentCity(); // Показать текущий город (для которого показана погода)
        this.setGlobalbackground(); // Отобразить фон, подходящий под текущие погодные условия

        rightNow.setData(this.currentData, this.allData.hourly[0].temp); // Заполнить компонент right-now
        hourly.init(this.allData.hourly); // Заполнить компонент hourly
        daily.init(this.allData.daily); // Заполнить компонент daily

        const searchForm = document.querySelector(".search");
        searchForm.addEventListener("submit", this.getInputCity); // событие на submit 

        const inputCity = document.querySelector(".search__text-input");
        inputCity.addEventListener("input", this.inputCity); // событие на ввод города
    }

    async getInputCity(event) {
        event.preventDefault();

        const cityInput = document.querySelector(".search__text-input");
        this.currentCity = cityInput.value.trim();

        // Если введена не пустая строка, то обновить данные и отрисовать по новой все компоненты
        // Иначе отобразить сообщение о необходимости ввести название города (строка №65)
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
        // Если есть предупреждение об ошибке - удалить его
        const warn = document.querySelector(".header__warn");
        if (warn) {
            warn.style.opacity = "0";
            setTimeout(() => {
                warn.remove();
            }, 600);
        }
    }

    showWarn(msg) {
        // Если есть предупреждение об ошибке - удалить его и показать новое
        const warn = document.querySelector(".header__warn");
        if (warn) warn.remove();

        const form = document.querySelector(".search");
        const warnElement = document.createElement("div");

        warnElement.textContent = msg;
        warnElement.classList.add("header__warn");

        const formOptions = form.getBoundingClientRect();

        warnElement.style.top = formOptions.top + formOptions.height - 10 + "px";
        form.append(warnElement);
    }

    showCurrentCity() {
        // Показать название текущего города (погода для которого отображается сейчас)
        const elem = document.querySelector(".current-city__title");
        elem.textContent = this.currentCity;
    }

    setGlobalbackground() {
        // Если время за 21:00 - отобразить ночную версию фона
        const time = new Date(this.currentData.dt * 1000).getHours();

        // ID погоды - тип погоды (облачно, ясно, пасмурно и т.д)
        const weather = this.currentData.weather[0].id;
        let image = "clearly_day.jpg"; // Название файла картинки фона

        // Выбор первой части названия картинки с фоном в зависимости от погоды
        if (weather >= 200 && weather <= 232) image = "storm";
        else if (weather >= 300 && weather <= 531) image = "rain";
        else if (weather >= 600 && weather <= 622) image = "snow";
        else if (weather >= 701 && weather <= 781) image = "fog";
        else if (weather === 800) image = "clearly";
        else if (weather >= 801 && weather <= 804) image = "cloudy";

        // Выбор второй части названия картинки с фоном в зависимост от времени суток (день, ночь)
        if (time >= 0 && time < 21) image += "_day.jpg";
        else image += "_evening.jpg"; // Evening - вечер, а не ночь. Да

        // Применить фон к body
        const body = document.querySelector("body");
        body.style.background = `url("./img/header/${image}")`;  
        body.style.backgroundPosition = "top"; 
        body.style.backgroundRepeat = "no-repeat";     
        body.style.backgroundSize = "cover";     
    }
}