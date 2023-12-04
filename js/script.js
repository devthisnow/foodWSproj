"use strict";
import tabs from "./modules/tabs";
import cards from "./modules/cards";
import modal from "./modules/modal";
import forms from "./modules/forms";
import { openModal } from "./modules/modal";
import { postData } from "./services/services";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 5000);

    tabs();
    cards();
    modal("[data-open]", ".modal", modalTimerId);
    forms("form", modalTimerId);
    slider({
        slide: ".offer__slide", 
        prevArw: ".offer__slider-prev", 
        nextArw: ".offer__slider-next", 
        totalCounter: "#total", 
        currentCounter: "#current", 
        wrapper: ".offer__slider-wrapper", 
        field: ".offer__slider-inner"});

    //Timer
    const deadline = "2024-11-26";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        t < 0 ? t = 0 : t;
        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / (1000)) % 60);

        return {
            "total": t,
            "days": days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = t.days.toLocaleString(undefined, { minimumIntegerDigits: 2 });
            hours.innerHTML = t.hours.toLocaleString(undefined, { minimumIntegerDigits: 2 });
            minutes.innerHTML = t.minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
            seconds.innerHTML = t.seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);
    
    //Calc creation
    const result = document.querySelector(".calculating__result span");
    let gender = "female",
        height, weight, age,
        ratio = 1.375;

    if (localStorage.getItem("gender")) gender = localStorage.getItem("gender");
    if (localStorage.getItem("ratio")) ratio = localStorage.getItem("ratio");

    function initLocalSetup(selector, activeClass) {
        const elmsLoc = document.querySelectorAll(selector);

        elmsLoc.forEach(elm => {
            elm.classList.remove(activeClass);
            if (elm.getAttribute("id") == localStorage.getItem("gender")) {
                elm.classList.add(activeClass);
            }
            if (elm.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
                elm.classList.add(activeClass);
            }
        });
    }

    initLocalSetup("#gender div", "calculating__choose-item_active");
    initLocalSetup(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if (gender == "female") {
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(1);
        } else if (gender == "male") {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(1);
        }
    }

    calcTotal();

    function getStaticInfo(parent, activeClass) {
        const elems = document.querySelectorAll(parent);

        elems.forEach(it => {
            it.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", ratio);
                } else {
                    gender = e.target.getAttribute("id");
                    localStorage.setItem("gender", gender);
                }

                // console.log(ratio, gender);
                elems.forEach(elm => {
                    elm.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInfo("#gender div", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInfo(selector) {
        const inp = document.querySelector(selector);

        inp.addEventListener("input", () => {

            if (inp.value.match(/\D/g)) {
                inp.style.border = "1px solid red";
            } else {
                inp.style.border = "none";
            }

            switch (inp.getAttribute("id")) {
            case "height":
                height = +inp.value;
                break;
            case "weight":
                weight = +inp.value;
                break;
            case "age":
                age = +inp.value;
                break;
            }
            // console.log(inp, height, weight, age);
            calcTotal();
        });

    }

    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");

});