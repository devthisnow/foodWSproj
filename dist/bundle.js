/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //Class for item cards
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.exchange = 89;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.exchange;
        }

        render() {
            const elm = document.createElement("div");
            elm.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(elm);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        }).catch(error => console.log(error));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSel, timerID) {
    //Forms on a server
    const forms = document.querySelectorAll(formSel),
          msg = {
              load: "icons/three-dots_load-anim.svg",
              success: "Спасибо, ждите ответа!",
              fail: "Что-то пошло не так..."
          };

    forms.forEach(it => bindPostData(it));
    
    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Submitted");

            const statusMsg = document.createElement("img");
            statusMsg.src = msg.load;
            statusMsg.style.cssText = `
                display: block;
                margin: 20 auto;
            `;
            form.append(statusMsg);
            form.insertAdjacentElement("afterend", statusMsg);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(msg.success);
                    statusMsg.remove();
                }).catch(() => {
                    showThanksModal(msg.fail);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(mess) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", timerID);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title" data-close>${mess}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSel, modalTimerId) {
    const modal = document.querySelector(modalSel);

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    //console.log("This is UPD");
}

function closeModal(modalSel) {
    const modal = document.querySelector(modalSel);

    modal.style.display = "none";
    document.body.style.overflow = "";
}
    
function modal(triggerSel, modalSel, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSel),
          modal = document.querySelector(modalSel);
 
    modalTrigger.forEach(it => {
        it.addEventListener("click", () => openModal(modalSel, modalTimerId));
    });

    modal.addEventListener("click", (e) => {
        if (e.target == modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSel);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modal.style.display == "block") {
            closeModal(modalSel);
            console.log(e.code);
        }
    });
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSel, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({slide, prevArw, nextArw, totalCounter, currentCounter, wrapper, field}) {
    // Slider design and control
    const slidesTotal = document.querySelectorAll(slide).length,
          curSlide = document.querySelector(currentCounter),
          totSlides = document.querySelector(totalCounter),
          visibleSlides = document.querySelectorAll(slide),
          slidesWrapper = document.querySelector(wrapper),
          slidesWindow = document.querySelector(field),
          width = window.getComputedStyle(slidesWindow).width,
          prevArrow = document.querySelector(prevArw),
          nextArrow = document.querySelector(nextArw);
    let i = 1;

    totSlides.textContent = slidesTotal.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    curSlide.textContent = i.toLocaleString(undefined, { minimumIntegerDigits: 2 });

    // --- Slider option 2
    let offset = 0;

    slidesWindow.style.width = 100 * slidesTotal + "%";
    slidesWindow.style.display = "flex";
    slidesWindow.style.transition = "0.25s all";
    slidesWrapper.style.overflow = "hidden";

    visibleSlides.forEach(slide => {
        slide.style.width = width;
    });

    prevArrow.addEventListener("click", () => {
        console.log("This");
        if (offset == 0) {
            offset = parseInt(width) * (slidesTotal - 1);
        } else {
            offset -= parseInt(width);
        }
        toggleSlides(-1);
        dotsArr.forEach(dot => dot.style.opacity = "0.5");
        dotsArr[i - 1].style.opacity = 1;
        slidesWindow.style.transform = `translateX(-${offset}px)`;
    });

    nextArrow.addEventListener("click", () => {
        console.log("That");
        if (offset == parseInt(width) * (slidesTotal - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }
        toggleSlides(1);
        dotsArr.forEach(dot => dot.style.opacity = "0.5");
        dotsArr[i - 1].style.opacity = "1";
        slidesWindow.style.transform = `translateX(-${offset}px)`;
    });

    function toggleSlides(value) {
        i = i + value;
        if (i < 1) i = slidesTotal;
        if (i > slidesTotal) i = 1;
        curSlide.textContent = i.toLocaleString(undefined, { minimumIntegerDigits: 2 });
        return i;
    }

    // --- Adding dots for a slider
    const slider = document.querySelector(".offer__slider"),
          dots = document.createElement("ol"),
          dotsArr = [];

    slider.style.position = "relative";
    dots.classList.add("carousel-indicators");

    slider.append(dots);

    for (let j = 0; j < slidesTotal; j++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", j + 1);
        dot.classList.add("dot");
        if (j == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    dotsArr.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            i = slideTo;
            offset = parseInt(width) * (slideTo - 1);
            slidesWindow.style.transform = `translateX(-${offset}px)`;
            dotsArr.forEach(dot => { dot.style.opacity = "0.5"; });
            curSlide.textContent = parseInt(i).toLocaleString(undefined, { minimumIntegerDigits: 2 });
            console.log(typeof (curSlide.textContent));
            dotsArr[i - 1].style.opacity = 1;
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    //Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(it => {
            it.style.display = "none";
            //console.log(it, "is done");
        });

        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json"
        }
    });

    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}.`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/services */ "./js/services/services.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(".modal", modalTimerId), 5000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-open]", ".modal", modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map