'use strict';

// helper to toggle a class
const elementToggleFunc = (elem) => elem && elem.classList.toggle("active");


// ── SIDEBAR TOGGLE ─────────────────────────────────────────────────────────────
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    elementToggleFunc(sidebar);
  });
}


// ── TESTIMONIALS MODAL ─────────────────────────────────────────────────────────
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer    = document.querySelector("[data-modal-container]");
const modalCloseBtn     = document.querySelector("[data-modal-close-btn]");
const overlay           = document.querySelector("[data-overlay]");
const modalImg          = document.querySelector("[data-modal-img]");
const modalTitle        = document.querySelector("[data-modal-title]");
const modalText         = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

testimonialsItems.forEach(item => {
  item.addEventListener("click", function() {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    if (avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]")?.innerHTML || "";
    modalText.innerHTML  = this.querySelector("[data-testimonials-text]")?.innerHTML  || "";
    testimonialsModalFunc();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay)       overlay.addEventListener("click", testimonialsModalFunc);


// ── CUSTOM SELECT & FILTER (mobile) ────────────────────────────────────────────
const select       = document.querySelector("[data-select]");
const selectItems  = document.querySelectorAll("[data-select-item]");
const selectValue  = document.querySelector("[data-select-value]");  // fixed typo
const filterBtn    = document.querySelectorAll("[data-filter-btn]");
const filterItems  = document.querySelectorAll("[data-filter-item]");

const filterFunc = (val) => {
  filterItems.forEach(item => {
    const cat = item.dataset.category;
    if (val === "all" || cat === val) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

if (select) {
  // 1) toggle dropdown
  select.addEventListener("click", () => elementToggleFunc(select));

  // 2) pick an item
  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      const txt = this.innerText.trim();
      selectValue.innerText = txt;
      elementToggleFunc(select);
      filterFunc(txt.toLowerCase());
    });
  });

  // 3) large-screen filter buttons
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function() {
      const txt = this.innerText.trim();
      selectValue.innerText = txt;
      filterFunc(txt.toLowerCase());

      lastClickedBtn?.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}


// ── CONTACT FORM ENABLE ─────────────────────────────────────────────────────────
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtnEl  = document.querySelector("[data-form-btn]");

if (form && formBtnEl) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtnEl.removeAttribute("disabled");
      } else {
        formBtnEl.setAttribute("disabled", "");
      }
    });
  });
}


// ── PAGE NAVIGATION ─────────────────────────────────────────────────────────────
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages           = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    // hide all
    pages.forEach(p => p.classList.remove("active"));
    navigationLinks.forEach(btn => btn.classList.remove("active"));

    // show/highlight the clicked index
    pages[idx]?.classList.add("active");
    link.classList.add("active");

    // scroll to top for mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
