/* shared.js — navigation, scroll animations, mobile menu */

/* ─── NAV SCROLL SHADOW ─── */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
});

/* ─── MOBILE NAV ─── */
function toggleMobile() {
  const nav = document.getElementById("mobileNav");
  const ham = document.getElementById("hamburger");
  nav.classList.toggle("open");
  ham.classList.toggle("open");
}

/* ─── ACTIVE LINK HIGHLIGHT ─── */
function setActiveLink() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || "index.html";

  document.querySelectorAll("[data-page]").forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    link.classList.remove("active-link");

    if (currentPage === "index.html" && linkPage === "home") {
      link.classList.add("active-link");
    } else if (currentPage === "about.html" && linkPage === "about") {
      link.classList.add("active-link");
    } else if (currentPage === "products.html" && linkPage === "products") {
      link.classList.add("active-link");
    } else if (currentPage === "contact.html" && linkPage === "contact") {
      link.classList.add("active-link");
    }
  });
}
document.addEventListener("DOMContentLoaded", setActiveLink);

/* ─── INTERSECTION OBSERVER — SCROLL REVEALS ─── */
function initReveal() {
  const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
  const els = document.querySelectorAll(selectors);
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  els.forEach((el) => observer.observe(el));
}
document.addEventListener("DOMContentLoaded", initReveal);

/* ─── HERO BANNER PARALLAX ─── */
function initParallax() {
  const banner = document.querySelector(".banner");
  if (!banner) return;
  window.addEventListener(
    "scroll",
    () => {
      const svg = banner.querySelector(".banner-svg-wrap");
      if (svg) svg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    },
    { passive: true },
  );
}
document.addEventListener("DOMContentLoaded", initParallax);

/* ─── COUNTER ANIMATION (for stat numbers if any) ─── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, 16);
}

/* ─── CONTACT FORM ─── */
function submitForm(btn) {
  const form = btn.closest(".contact-form") || btn.parentElement;
  const inputs = form.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = "#e05050";
      input.addEventListener(
        "input",
        () => {
          input.style.borderColor = "";
        },
        { once: true },
      );
    }
  });

  if (!valid) {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 500);
    return;
  }

  btn.textContent = "Sending…";
  btn.disabled = true;
  btn.style.opacity = "0.8";

  setTimeout(() => {
    btn.textContent = "✓ Message Sent";
    btn.style.background = "var(--green-dark)";
    btn.style.opacity = "1";
    inputs.forEach((i) => (i.value = ""));
  }, 1400);
}

/* ─── PRODUCT TILE HOVER RIPPLE ─── */
function initTileRipple() {
  document.querySelectorAll(".product-tile").forEach((tile) => {
    tile.addEventListener("mouseenter", function (e) {
      this.style.transform = "translateY(-4px)";
    });
    tile.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}
document.addEventListener("DOMContentLoaded", initTileRipple);

/* ─── HERO TEXT TYPEWRITER (optional, for banner eyebrow) ─── */
function typewriter(el, text, speed = 55) {
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

/* ─── SHAKE KEYFRAME (inject once) ─── */
(function injectShake() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-6px)}
      40%{transform:translateX(6px)}
      60%{transform:translateX(-4px)}
      80%{transform:translateX(4px)}
    }
    .shake { animation: shake 0.45s ease; }
  `;
  document.head.appendChild(style);
})();
