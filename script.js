"use strict";

///////////////////////////////////////
// Modal window for opening account

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// scrollling behavior
const btnScrollTo = document.querySelector(".btn--text");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function (e) {
  // const s1Coord = section1.getBoundingClientRect();
  //  console.log(s1Coord)
  // for old browser
  // window.scrollTo({
  //   left:s1Coord.left+window.pageXOffset,
  //   top:s1Coord.top +window.pageYOffset,
  //   behavior:'smooth',
  // })

  // for modern browser
  section1.scrollIntoView({ behavior: "smooth" });
});

// scrolling of navbar with eventdelegation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
// operations on three buttons yellow green and red
const tab = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  if (!clicked) return;
  tab.forEach((t) => t.classList.remove("operations__tab--active"));
  tabContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// fading menue bar all nav links
const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
// sticky navbar
const initailCoords = section1.getBoundingClientRect();
// console.log(initailCoords)
window.addEventListener("scroll", function () {
  // console.log(window.scrollY)
  if (window.scrollY > initailCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// revealing section when section cross 15%
const allSections = document.querySelectorAll(".section");

const revealSection = function (enteries, observer) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy lading effect by intesectionObserverAPI
let imgTarget = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTarget.forEach((img) => imgObserver.observe(img));

// working on slider last three slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";

let currentSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
};
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  // console.log(e)
  if (e.key == "ArrowRight") nextSlide();
  if (e.key == "ArrowLeft") prevSlide();
});

// creating dots for slider

const creatDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};
creatDots();

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // console.log("DOT")
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});

// making dots active in which u r

const activateDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};
activateDots(0)