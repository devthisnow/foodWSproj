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

export default slider;