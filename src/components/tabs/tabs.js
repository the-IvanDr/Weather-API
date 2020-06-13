const ACTIVE_TAB = "tabs__item_active";

const tabs = document.querySelectorAll(".tabs__item");
const todayTab = tabs[0];
const weekTab = tabs[1];

const Hourly = document.querySelector(".forecast__hourly");
const Daily = document.querySelector(".forecast__daily");

todayTab.addEventListener("click", () => {
    if (todayTab.classList.contains(ACTIVE_TAB)) return;

    todayTab.classList.add(ACTIVE_TAB);
    weekTab.classList.remove(ACTIVE_TAB);
    Daily.style.display = "none";
    Hourly.style.display = "flex";
});

weekTab.addEventListener("click", () => {
    if (weekTab.classList.contains(ACTIVE_TAB)) return;

    weekTab.classList.add(ACTIVE_TAB);
    todayTab.classList.remove(ACTIVE_TAB);
    Daily.style.display = "flex";
    Hourly.style.display = "none";
});