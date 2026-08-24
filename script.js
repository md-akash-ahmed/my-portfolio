/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnMenu = menuBtn.contains(event.target);

    if (
      navLinks.classList.contains("show") &&
      !isClickInsideNav &&
      !isClickOnMenu
    ) {
      navLinks.classList.remove("show");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   CONTACT FORM
========================================= */

function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const subject = `Portfolio Message from ${name}`;

  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`;

  window.location.href =
    `mailto:mdakash30453@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  event.target.reset();
}


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-item img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxPrev = document.getElementById("lightboxPrev");

let currentImageIndex = 0;


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {
  if (!lightbox || !lightboxImage || !galleryImages.length) {
    return;
  }

  currentImageIndex = index;

  showImage();

  lightbox.classList.add("show");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


/* =========================================
   SHOW CURRENT IMAGE
========================================= */

function showImage() {
  if (!galleryImages.length || !lightboxImage) {
    return;
  }

  const image = galleryImages[currentImageIndex];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxImage.onload = () => {
      lightboxImage.style.opacity = "1";
    };
  }, 120);
}


/* =========================================
   CLICK GALLERY IMAGE
========================================= */

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openLightbox(index);
  });
});


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {
  if (!galleryImages.length) return;

  currentImageIndex =
    (currentImageIndex + 1) % galleryImages.length;

  showImage();
}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {
  if (!galleryImages.length) return;

  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) %
    galleryImages.length;

  showImage();
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("show");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


/* =========================================
   LIGHTBOX BUTTON EVENTS
========================================= */

if (lightboxNext) {
  lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();
    nextImage();
  });
}


if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    previousImage();
  });
}


if (lightboxClose) {
  lightboxClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });
}


/* =========================================
   CLICK OUTSIDE IMAGE TO CLOSE
========================================= */

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (
      event.target === lightbox ||
      event.target.classList.contains("lightbox-content")
    ) {
      closeLightbox();
    }
  });
}


/* =========================================
   KEYBOARD CONTROL
========================================= */

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("show")) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }

  if (event.key === "Escape") {
    closeLightbox();
  }
});


/* =========================================
   MOBILE SWIPE
========================================= */

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

const minimumSwipeDistance = 50;


if (lightbox) {
  lightbox.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    },
    { passive: true }
  );


  lightbox.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;

      handleSwipe();
    },
    { passive: true }
  );
}


/* =========================================
   HANDLE SWIPE
========================================= */

function handleSwipe() {
  const swipeX = touchEndX - touchStartX;
  const swipeY = touchEndY - touchStartY;

  /* Ignore vertical swipe */

  if (Math.abs(swipeX) < Math.abs(swipeY)) {
    return;
  }


  /* Swipe Left → Next */

  if (swipeX < -minimumSwipeDistance) {
    nextImage();
  }


  /* Swipe Right → Previous */

  if (swipeX > minimumSwipeDistance) {
    previousImage();
  }
}