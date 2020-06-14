const ACTIVE_TAB = "tabs__item_active";

const tabs = document.querySelectorAll(".tabs__item");
const rightNowTab = window.getComputedStyle(tabs[0])["display"] === "none"
    ? null
    : tabs[0];
const todayTab = tabs[1];
const weekTab = tabs[2];

if (rightNowTab) rightNowTab.classList.add("tabs__item_active");
else todayTab.classList.add("tabs__item_active");

const Hourly = document.querySelector(".forecast__hourly");
const Daily = document.querySelector(".forecast__daily");
const RightNow = document.querySelector(".right-now");

if (rightNowTab) {
    rightNowTab.addEventListener("click", () => {
        if (rightNowTab.classList.contains(ACTIVE_TAB)) return;

        rightNowTab.classList.add(ACTIVE_TAB);
        todayTab.classList.remove(ACTIVE_TAB);
        weekTab.classList.remove(ACTIVE_TAB);

        RightNow.style.display = "flex";
        Hourly.style.display = "none";
        Daily.style.display = "none";
    });
}

todayTab.addEventListener("click", () => {
    if (todayTab.classList.contains(ACTIVE_TAB)) return;

    todayTab.classList.add(ACTIVE_TAB);
    weekTab.classList.remove(ACTIVE_TAB);
    if (rightNowTab) rightNowTab.classList.remove(ACTIVE_TAB);

    Hourly.style.display = "flex";
    Daily.style.display = "none";
    if (rightNowTab) RightNow.style.display = "none";
});

weekTab.addEventListener("click", () => {
    if (weekTab.classList.contains(ACTIVE_TAB)) return;

    weekTab.classList.add(ACTIVE_TAB);
    todayTab.classList.remove(ACTIVE_TAB);
    if (rightNowTab) rightNowTab.classList.remove(ACTIVE_TAB);

    Daily.style.display = "flex";
    Hourly.style.display = "none";
    if (rightNowTab) RightNow.style.display = "none";
});