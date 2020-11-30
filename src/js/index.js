import Swiper from 'swiper/bundle';
import Counter from "./counter";

const counter = new Counter({
    startFromElementId: "about-us",
    countersSelector: "#about-us .numeric-text"
});

const slides = document.querySelectorAll('.estate-card');
const slidesSelectors = document.getElementsByClassName('button-selector');

const ACTIVE_CLASS_NAME = 'active';
const HIDDEN_CLASS_NAME = 'hidden';

document.addEventListener("DOMContentLoaded", onDocumentLoaded);
window.addEventListener("scroll", onScroll);

function onScroll() {
    counter.onScroll();
}

function onDocumentLoaded() {
    const swiper = initSwiperSlider();
    initSlidesSelectors(swiper);
    addEventListenerOnDetails();
    initMenuBurger();
    initMainSlider();
    setInterval(initMainSlider, 15000);
}

function initSwiperSlider() {
    return new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
        },
        slidesPerView: 1,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });
}

function initSlidesSelectors(swiper) {
    [...slidesSelectors].forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('selected'))
                return;

            [...slidesSelectors]
                .filter(button => button.classList.contains('selected'))
                .forEach(button => button.classList.remove('selected'));

            button.classList.add('selected');
            showSlides(button.dataset.slidesSelector);
            hideSlides(button.dataset.slidesSelector);
            swiper.update();
        });
    });
}

function showSlides(classNameToShow) {
    [...slides]
        .filter(slide => slide.classList.contains(classNameToShow) && slide.classList.contains(HIDDEN_CLASS_NAME))
        .forEach(slide => showSlide(slide));
}

function hideSlides(classNameShowed) {
    [...slides]
        .filter(slide => !slide.classList.contains(classNameShowed) && slide.classList.contains(ACTIVE_CLASS_NAME))
        .forEach(slide => hideSlide(slide));
}

function showSlide(item) {
    item.classList.add(ACTIVE_CLASS_NAME);
    item.classList.remove(HIDDEN_CLASS_NAME);
}

function hideSlide(item) {
    item.classList.add(HIDDEN_CLASS_NAME);
    item.classList.remove(ACTIVE_CLASS_NAME);
}

function addEventListenerOnDetails() {
    const details = document.querySelectorAll("details");

    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
}

function initMainSlider() {
    let slides = document.querySelectorAll(".slide-bg");

    [...slides].forEach((slide) => {
        if (slide.classList.contains('opacity-none')) {
            slide.classList.remove("opacity-none");
        } else {
            slide.classList.add("opacity-none");
        }

    });
}

function initMenuBurger() {
    let menuDisplayToggle = document.querySelector("#menuToggle input"),
        menu = document.querySelector(".menu");

    menuDisplayToggle.addEventListener("change", () => {
        if (menuDisplayToggle.checked) {
            menu.classList.add("menu-active");
        } else {
            menu.classList.remove("menu-active");
        }
    });
}
