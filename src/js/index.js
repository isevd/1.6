import '../scss/style.scss'
import Swiper from 'swiper/bundle';
//import { Navigation, Pagination } from 'swiper/modules';

'use strict';

const mySwiper = {
    slideToClickedSlide: true,
    slidesPerView: 1.2,
    speed: 300,
    spaceBetween: 15,
    loop: true,
  
    breakpoints: {
      365: {
        slidesPerView: 1.4,
      },
      450: {
        slidesPerView: 1.9,
      },
      640: {
        slidesPerView: 2.4,
      },
    },
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
   
  };
  
function slidersSection(dataSwiperName) {
    const selector = `[data-swiper="${dataSwiperName}"]`;
    let mobileSlider;
    let state = "destroyed";
  
    function createSwiper() {
      mobileSlider = new Swiper(selector, mySwiper);
      state = "initiated";
    }
    
    function destroyedSwiper() {
      mobileSlider.destroy(true, true);
      state = "destroyed";
    }
  
    if (window.innerWidth < 768) createSwiper()
    
    window.addEventListener("resize", (e) => {
      const width = e.target.screen.availWidth;
      if (state === "initiated" && width >= 768) destroyedSwiper()    
      if (state === "destroyed" && width < 768) createSwiper()
    });
  }
  

//modal

  function modalPopup(modalName) {
    const openButtons = document.querySelectorAll(`[data-${modalName}="open"]`);
    const popup = document.querySelector(`[data-modal-name="${modalName}"]`);
    const closeButton = popup.querySelector(`[data-${modalName}="close"]`);
    const wrapper = document.querySelector('.wrapper')
  
    function openPopup(event) {
      event.preventDefault();
      popup.classList.add(`modal--visible`);
      document.body.style.overflow = "hidden";
    }
  
    function closePopup() {
      popup.classList.remove("modal--visible");
      document.body.style.overflow = "";
    }
  
    openButtons.forEach((button) => {
      button.addEventListener("click", (event) => openPopup(event));
    });
  
    closeButton.addEventListener("click", closePopup);
  
    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closePopup();
      }
    });
  }

function clickShow(dataName, textBtn = "Показать всё") {
  const container = document.querySelector(`[data-show-block='${dataName}']`);
  const button = document.querySelector(`[data-show-more-button='${dataName}']`);
  const btnText = button.querySelector(".show-more__text");

  button.addEventListener("click", () => {
    button.classList.toggle("show-more--open");
    if (button.classList.contains("show-more--open")) {
      container.style.maxHeight = `${container.scrollHeight}px`;
      btnText.innerText = "Скрыть";
    } else {
      container.style.maxHeight = ``;
      btnText.innerText = textBtn;
    }
  });
}


modalPopup("menu");
modalPopup("feedback");
modalPopup("callback");

clickShow("text", "Читать далее");

slidersSection("brands");
clickShow("brands");

slidersSection("services");
clickShow("services");

slidersSection("price");
