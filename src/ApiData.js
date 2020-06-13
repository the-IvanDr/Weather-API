// const requestURL = `http://api.openweathermap.org/data/2.5/onecall?lat=48.87&lon=37.62&units=metric&lang=ru&appid=${API_KEY}`;
// const requestURL = `http://api.openweathermap.org/data/2.5/weather?q=Славянск,украина&units=metric&lang=ru&appid=${API_KEY}`;

export default class GetWeather {
    constructor() {
        this.API_KEY = "74fae5dab057971c55d374c1e6934ad7";
        this.BaseURL = "http://api.openweathermap.org/data/2.5";
    }

    async getCurrentData(city, country = "") {
        const url = `${this.BaseURL}/weather?q=${city},${country}&units=metric&lang=ru&appid=${this.API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getAllData(lat, lon){
        const url = `${this.BaseURL}/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${this.API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }
}