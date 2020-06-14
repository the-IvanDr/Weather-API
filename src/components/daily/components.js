export function createDailyButtons() {
    return `
    <button class="forecast__daily__prev">
        <span class="material-icons">
            arrow_forward_ios
        </span>
    </button>
    <button class="forecast__daily__next">
        <span class="material-icons">
            arrow_forward_ios
        </span>
    </button>`;
}

export function createDailyItem() {
    return `
    <div class="forecast__daily__item">
        <div class="forecast__daily__day">Пн</div>
        <div class="forecast__daily__date">9 июня<div class=""></div>
        </div>
        <div class="forecast__daily__icon">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon">
        </div>
        <div class="forecast__daily__temp">
            <div class="forecast__daily__temp_day">
                +30 °С
            </div>
            <div class="forecast__daily__temp_night">
                +19 °С
            </div>
        </div>
        <div class="forecast__daily__wind">
            <span class="material-icons arrow">
                arrow_right_alt
            </span>
            <span class="data">10 м/с</span>
        </div>

        <div class="forecast__daily__pressure">
            752 <br> <span>мм.рт.ст</span>
        </div>
    </div>`;
}