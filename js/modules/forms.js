import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

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

            postData("http://localhost:3000/requests", json)
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
        openModal(".modal", timerID);

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
            closeModal(".modal");
        }, 4000);
    }
}

export default forms;