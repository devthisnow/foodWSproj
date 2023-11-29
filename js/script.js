"use strict";
window.addEventListener("DOMContentLoaded", () => {
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

    //Timer
    const deadline = "2024-11-26";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        t < 0 ? t = 0 : t = t;
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

    //Modal window
    const modalTrigger = document.querySelectorAll("[data-open]"),
        modal = document.querySelector(".modal");

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
        //console.log("This is UPD");
    }
    modalTrigger.forEach(it => {
        it.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    modal.addEventListener("click", (e) => {
        if (e.target == modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modal.style.display == "block") {
            closeModal();
            console.log(e.code);
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

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
            const elm = document.createElement('div');
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "“Премиум”"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    //Forms on a server
    const forms = document.querySelectorAll('form'),
        msg = {
            load: "icons/three-dots_load-anim.svg",
            success: "Спасибо, ждите ответа!",
            fail: "Что-то пошло не так..."
        }

    forms.forEach(it => postData(it));

    function postData(form) {
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

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-type", "application/json");

            const formData = new FormData(form);
            const object = {};

            formData.forEach((obj, i) => {
                object[i] = obj;
            });

            const json = JSON.stringify(object);

            request.send(json);
            request.addEventListener("load", () => {
                if (request.status == 200) {
                    console.log(request.response);
                    showThanksModal(msg.success);
                    form.reset();
                    statusMsg.remove();
                } else {
                    showThanksModal(msg.fail);
                }
            })

        })
    }

    function showThanksModal(mess) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

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
            closeModal();
        }, 4000)
    }
});