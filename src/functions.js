export function getDay(time) {
    const date = new Date(time * 1000);
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return days[date.getDay()];
}

export function getMonth(time) {
    const date = new Date(time * 1000);
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля",
        "августа", "сентября", "октября", "ноября", "декабря"];
    return months[date.getMonth()];
}

export function getDate(time) {
    const date = new Date(time * 1000);
    return date.getDate();
}

export function getTime(time, nozero = false) {
    const date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (!nozero) {
        hours = hours >= 10 ? hours : "0" + hours;
    }

    minutes = minutes >= 10 ? minutes : "0" + minutes;
    return `${hours}:${minutes}`;
}

export function setWeatherTemp(elem, temp) {
    temp = Math.round(temp);
    const str = temp >= 0 ? `+${temp} °С` : `-${temp} °С`;
    let color = "#18FFAF";

    if (temp < -12) color = "#184EFF";
    else if (temp >= -12 && temp < 0) color = "#18B4FF";
    else if (temp === 0) color = "#18FFAF";
    else if (temp > 0 && temp < 10) color = "#4CBB17";
    else if (temp >= 10 && temp < 18) color = "#C7C223";
    else if (temp >= 18 && temp < 28) color = "#F79F3B";
    else if (temp >= 28) color = "#F7443B";

    elem.textContent = str;
    elem.style.color = color;
    elem.style.borderBottom = `2px solid ${color}`;
}

export function setWeatherIcon(elem, icon) {
    elem.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function setWeatherDescr(elem, descr) {
    descr = descr[0].toUpperCase() + descr.slice(1);
    elem.textContent = descr;
}

export function setWeatherWind(elem, arrow, deg, wind) {
    elem.textContent = `${wind} м/с`;
    arrow.style.transform = `rotate(${deg - 90 + 180}deg)`;
}

export function setWeatherPressure(elem, pressure, small = false) {
    pressure = Math.round(pressure * 0.750064);

    if (!small) {
        elem.textContent = `${pressure} мм.рт.мт`;
    } else {
        elem.innerHTML = `${pressure} <br> <span>мм.рт.ст</span>`;
    }
}

export function setWeatherHumidity(elem, data) {
    elem.textContent = data.main.humidity + "%";
}