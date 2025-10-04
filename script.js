'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav_links = document.querySelector('.nav__links');
const operational_tab = document.querySelector('.operations__tab-container');

const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smoth scrolling

nav_links.addEventListener('click', (Event) => {
  Event.preventDefault();
  const section = document.querySelector(
    `#section--${Event.target.dataset.link}`
  );

  if (!section) return;

  section.scrollIntoView({
    behavior: 'smooth',
  });
});

operational_tab.addEventListener('click', (event) => {
  // remove active class
  // select all the  tabs and tab containers
  const tabs = document.querySelectorAll('.operations__tab');
  const tab_containers = document.querySelectorAll('.operations__content');

  // remove class operations__tab--active before add
  tabs.forEach((ele) => {
    ele.classList.remove('operations__tab--active');
  });

  tab_containers.forEach((ele) => {
    ele.classList.remove('operations__content--active');
  });

  // fetch which tab is click
  const tab = event.target.closest('.operations__tab');

  // add active class in tab for style
  tab.classList.add('operations__tab--active');

  // add active class on  tab content according to tab data
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// navigation effect

function hoverEffect(e) {
  if (e.target?.classList.contains('nav__link')) {
    const link = e.target;
    const links = e.target.closest('.nav').querySelectorAll('.nav__link');

    links.forEach((ele) => {
      if (ele !== link) {
        ele.style.opacity = this;
      }
    });

    const logo = e.target.closest('.nav').querySelector('#logo');
    logo.style.opacity = this;
  }
}

// do hover effect
// this is the only how  to pass the arguments to handler by this keyword set by bind method

nav.addEventListener('mouseover', hoverEffect.bind(0.5));

// undo hover effect
document
  .querySelector('.nav')
  .addEventListener('mouseout', hoverEffect.bind(1));

// intersection observer

// add sticky class to navigation if all header scroll

const stickyNavObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entrie] = entries;

    if (entrie.isIntersecting) {
      nav.classList.remove('sticky');
    } else {
      nav.classList.add('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px `,
  }
);

const header = document.querySelector('.header');
stickyNavObserver.observe(header);

//image lazy loading

const images = document.querySelectorAll('img[data-src]');

const lazyLoadingObservation = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((ele) => {
      if (!ele.isIntersecting) return;

      ele.target.src = ele.target.dataset.src;
      observer.unobserve(ele.target);
      ele.target.addEventListener('load', (event) => {
        event.target.classList.remove('lazy-img');
      });
    });
  },
  { root: null, threshold: 0.4 }
);

images.forEach((ele) => {
  lazyLoadingObservation.observe(ele);
});

// section loading effect

const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((ele) => {
      if (!ele.isIntersecting) return;
      ele.target.classList.remove('section--hidden');
    });
  },
  {
    root: null,
    threshold: 0.05,
  }
);

sections.forEach((ele) => {
  sectionObserver.observe(ele);
  ele.classList.add('section--hidden');
});

// slider

let currentslide = 0;
const slides = document.querySelectorAll('.slide'); // select all slides
const slider_button_left = document.querySelector('.slider__btn--left'); // select left button
const slider_button_right = document.querySelector('.slider__btn--right'); // select right button
const dots = document.querySelector('.dots');
const alldots = dots.children;

// create function to activate the current slide dot
function activateDots(currentActiveDot) {
  dots
    .querySelectorAll('.dots__dot')
    .forEach((ele) => ele.classList.remove('dots__dot--active'));

  dots
    .querySelector(`[data-slide='${currentActiveDot}']`)
    .classList.add('dots__dot--active');
}

// change side on dots button click
dots.addEventListener('click', (event) => {
  if (event.target.classList.contains('dots__dot')) {
    currentslide = event.target.dataset.slide;
    sliderContoler(currentslide);
  }
});

// create function to change slide
function sliderContoler(slideVal) {
  activateDots(slideVal);
  slides.forEach((ele, i) => {
    ele.style.transform = `translateX(${100 * (i - slideVal)}em)`;
  });
}

// slide rigth

function rightEventHandler() {
  currentslide += 1;
  if (currentslide === slides.length) currentslide = 0;
  sliderContoler(currentslide);
}
slider_button_right.addEventListener('click', rightEventHandler);

// slide left
function leftEventHandler() {
  currentslide -= 1;
  if (currentslide < 0) currentslide = 0;
  sliderContoler(currentslide);
}
slider_button_left.addEventListener('click', leftEventHandler);

// changing slider on click of left and right arrow

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    rightEventHandler();
  }

  if (event.key === 'ArrowLeft') {
    leftEventHandler();
  }
});

// create  dots with data-slide value according to index val of all slides
slides.forEach((_, i) => {
  const ele = `<button class='dots__dot' data-slide='${i}' ><button>`;
  dots.insertAdjacentHTML('beforeend', ele);
});



sliderContoler(0); // call slider function to set inital side
