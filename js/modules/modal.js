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

export default modal;
export {openModal, closeModal};