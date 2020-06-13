import {
    getDay, getMonth, getTime, getDate, setWeatherTemp, setWeatherIcon,
    setWeatherDescr, setWeatherWind, setWeatherPressure, setWeatherHumidity
} from '@/functions';

class RightNow {
    constructor() {
        this.date = document.querySelector(".right-now__date");
        this.temp = document.querySelector(".right-now__temp");
        this.icon = document.querySelector(".right-now__icon");
        this.descr = document.querySelector(".right-now__descr");

        this.wind = document.querySelector(".right-now__wind .data");
        this.windArrow = document.querySelector(".right-now__wind .material-icons");

        this.pressure = document.querySelector(".right-now__pressure .data");
        this.humidity = document.querySelector(".right-now__humidity .data");
        this.sunrise = document.querySelector(".right-now__sunrise .data");
        this.sunset = document.querySelector(".right-now__sunset .data");
    }

    setData(data, temp) {
        const currentDate = `Акутально на: ${getDay(data.dt)}, 
                                ${getDate(data.dt)} 
                                ${getMonth(data.dt)}, 
                                ${getTime(data.dt)}`;

        this.date.textContent = currentDate;
        setWeatherTemp(this.temp, /* data.main. */temp);
        setWeatherIcon(this.icon, data.weather[0].icon);
        setWeatherDescr(this.descr, data.weather[0].description);
        setWeatherWind(this.wind, this.windArrow, data.wind.deg, data.wind.speed);
        setWeatherPressure(this.pressure, data.main.pressure) + " мм.рт.ст";
        setWeatherHumidity(this.humidity, data);

        this.sunrise.textContent = getTime(data.sys.sunrise);
        this.sunset.textContent = getTime(data.sys.sunset);
    }
}

const rightNow = new RightNow();
export default rightNow;