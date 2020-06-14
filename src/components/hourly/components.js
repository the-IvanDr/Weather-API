export function createHourlyButtons() {
    return `
    <button class="forecast__hourly__prev">
        <span class="material-icons">
            arrow_forward_ios
        </span>
    </button>
    <button class="forecast__hourly__next">
            <span class="material-icons">
                arrow_forward_ios
            </span>
    </button>`;
}

export function createHourlyItem(){
    return `
    <div class="forecast__hourly__item">
        <div class="forecast__hourly__time">12<span>00</span></div>
        <div class="forecast__hourly__icon">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon">
        </div>
        <div class="forecast__hourly__temp">+29 °С</div>
        <div class="forecast__hourly__wind">
            <span class="material-icons arrow">
                arrow_right_alt
            </span>
            <span class="data">10 м/с</span>
        </div>
        <div class="forecast__hourly__pressure">
            752 <br> <span>мм.рт.ст</span>
        </div>
    </div>`;
}