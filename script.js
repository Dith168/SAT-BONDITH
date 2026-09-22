/* =========================================================
   FADE IN ANIMATION
========================================================= */

const elements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  },
  {
    threshold: 0.12
  }
);

elements.forEach((element) => {
  observer.observe(element);
});


/* =========================================================
   NAVBAR ACTIVE LINK
========================================================= */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink =
          document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );

        if (activeLink) {
          activeLink.classList.add("active");
        }

      }

    });

  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =========================================================
   POPUP
========================================================= */

function openPopup() {

  const popup =
    document.getElementById("social-popup");

  if (popup) {

    popup.style.display = "flex";

    document.body.style.overflow = "hidden";

  }

}


function closePopup() {

  const popup =
    document.getElementById("social-popup");

  if (popup) {

    popup.style.display = "none";

    document.body.style.overflow = "";

  }

}


/* Close popup when clicking outside */

const popup =
  document.getElementById("social-popup");

if (popup) {

  popup.addEventListener("click", (event) => {

    if (event.target === popup) {

      closePopup();

    }

  });

}


/* =========================================================
   CONTACT FORM - WEB3FORMS
========================================================= */

const form =
  document.getElementById("form");

if (form) {

  const submitBtn =
    form.querySelector(
      'button[type="submit"]'
    );

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const formData =
        new FormData(form);

      const originalText =
        submitBtn.textContent;

      submitBtn.textContent =
        "Sending...";

      submitBtn.disabled = true;

      try {

        const response =
          await fetch(
            "https://api.web3forms.com/submit",
            {
              method: "POST",
              body: formData
            }
          );

        const data =
          await response.json();

        if (response.ok) {

          alert(
            "Success! Your message has been sent."
          );

          form.reset();

        } else {

          alert(
            "Error: " +
            (data.message ||
              "Unable to send message.")
          );

        }

      } catch (error) {

        alert(
          "Something went wrong. Please try again."
        );

      } finally {

        submitBtn.textContent =
          originalText;

        submitBtn.disabled = false;

      }

    }
  );

}


/* =========================================================
   LIGHTBOX GALLERY
========================================================= */

const galleryImages =
  document.querySelectorAll(
    ".project-item img"
  );

const lightbox =
  document.getElementById("lightbox");

const lightboxImg =
  document.getElementById("lightbox-img");

const prevBtn =
  document.querySelector(".prev-btn");

const nextBtn =
  document.querySelector(".next-btn");

const closeLightboxBtn =
  document.querySelector(".close-lightbox");

const zoomInBtn =
  document.getElementById("zoom-in");

const zoomOutBtn =
  document.getElementById("zoom-out");

const zoomResetBtn =
  document.getElementById("zoom-reset");

const imageContainer =
  document.querySelector(".image-container");


/* =========================================================
   LIGHTBOX VARIABLES
========================================================= */

let currentIndex = 0;

let scale = 1;

let posX = 0;

let posY = 0;

let isDragging = false;

let startX = 0;

let startY = 0;


/* =========================================================
   UPDATE IMAGE TRANSFORM
========================================================= */

function updateTransform() {

  lightboxImg.style.transform =
    `translate(${posX}px, ${posY}px) scale(${scale})`;

}


/* =========================================================
   RESET ZOOM
========================================================= */

function resetZoom() {

  scale = 1;

  posX = 0;

  posY = 0;

  isDragging = false;

  updateTransform();

}


/* =========================================================
   SHOW IMAGE
========================================================= */

function showImage() {

  if (
    !galleryImages.length ||
    !lightboxImg
  ) {
    return;
  }

  const image =
    galleryImages[currentIndex];

  lightboxImg.src =
    image.getAttribute("src");

  lightboxImg.alt =
    image.getAttribute("alt") || "";

  resetZoom();

}


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

galleryImages.forEach(
  (image, index) => {

    image.addEventListener(
      "click",
      () => {

        currentIndex = index;

        showImage();

        lightbox.style.display =
          "flex";

        document.body.style.overflow =
          "hidden";

      }
    );

  }
);


/* =========================================================
   NEXT IMAGE
========================================================= */

function nextImage() {

  if (!galleryImages.length) {
    return;
  }

  currentIndex++;

  if (
    currentIndex >=
    galleryImages.length
  ) {

    currentIndex = 0;

  }

  showImage();

}


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

function previousImage() {

  if (!galleryImages.length) {
    return;
  }

  currentIndex--;

  if (currentIndex < 0) {

    currentIndex =
      galleryImages.length - 1;

  }

  showImage();

}


/* =========================================================
   NEXT / PREVIOUS BUTTONS
========================================================= */

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      nextImage();

    }
  );

}


if (prevBtn) {

  prevBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      previousImage();

    }
  );

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

  if (!lightbox) {
    return;
  }

  lightbox.style.display =
    "none";

  resetZoom();

  document.body.style.overflow =
    "";

}


if (closeLightboxBtn) {

  closeLightboxBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      closeLightbox();

    }
  );

}


/* Click outside image */

if (lightbox) {

  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );

}


/* =========================================================
   ZOOM IN
========================================================= */

if (zoomInBtn) {

  zoomInBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      scale += 0.2;

      scale =
        Math.min(scale, 5);

      updateTransform();

    }
  );

}


/* =========================================================
   ZOOM OUT
========================================================= */

if (zoomOutBtn) {

  zoomOutBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      scale -= 0.2;

      scale =
        Math.max(scale, 1);

      if (scale === 1) {

        posX = 0;

        posY = 0;

      }

      updateTransform();

    }
  );

}


/* =========================================================
   RESET ZOOM BUTTON
========================================================= */

if (zoomResetBtn) {

  zoomResetBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      resetZoom();

    }
  );

}


/* =========================================================
   MOUSE WHEEL ZOOM
========================================================= */

if (imageContainer) {

  imageContainer.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault();

      if (event.deltaY < 0) {

        scale += 0.1;

      } else {

        scale -= 0.1;

      }

      scale =
        Math.max(
          1,
          Math.min(scale, 5)
        );

      if (scale === 1) {

        posX = 0;

        posY = 0;

      }

      updateTransform();

    },
    {
      passive: false
    }
  );

}


/* =========================================================
   DRAG IMAGE
========================================================= */

if (lightboxImg) {

  lightboxImg.addEventListener(
    "mousedown",
    (event) => {

      if (scale <= 1) {
        return;
      }

      event.preventDefault();

      isDragging = true;

      imageContainer.classList.add(
        "dragging"
      );

      startX =
        event.clientX - posX;

      startY =
        event.clientY - posY;

    }
  );

}


document.addEventListener(
  "mousemove",
  (event) => {

    if (!isDragging) {
      return;
    }

    posX =
      event.clientX - startX;

    posY =
      event.clientY - startY;

    updateTransform();

  }
);


document.addEventListener(
  "mouseup",
  () => {

    isDragging = false;

    if (imageContainer) {

      imageContainer.classList.remove(
        "dragging"
      );

    }

  }
);


/* =========================================================
   DOUBLE CLICK ZOOM
========================================================= */

if (lightboxImg) {

  lightboxImg.addEventListener(
    "dblclick",
    (event) => {

      event.preventDefault();

      if (scale === 1) {

        scale = 2;

      } else {

        resetZoom();

        return;

      }

      updateTransform();

    }
  );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /* ESC */

    if (event.key === "Escape") {

      closePopup();

      closeLightbox();

      return;

    }


    /* Only work when lightbox is open */

    if (
      !lightbox ||
      lightbox.style.display !== "flex"
    ) {

      return;

    }


    /* Next */

    if (
      event.key === "ArrowRight"
    ) {

      nextImage();

    }


    /* Previous */

    if (
      event.key === "ArrowLeft"
    ) {

      previousImage();

    }


    /* Zoom In */

    if (event.key === "+") {

      scale += 0.2;

      scale =
        Math.min(scale, 5);

      updateTransform();

    }


    /* Zoom Out */

    if (event.key === "-") {

      scale -= 0.2;

      scale =
        Math.max(scale, 1);

      if (scale === 1) {

        posX = 0;

        posY = 0;

      }

      updateTransform();

    }

  }
);


/* =========================================================
   TOUCH / MOBILE SWIPE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (lightbox) {

  lightbox.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  lightbox.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleSwipe();

    },
    {
      passive: true
    }
  );

}


function handleSwipe() {

  const difference =
    touchEndX - touchStartX;


  /* Swipe left */

  if (difference < -50) {

    nextImage();

  }


  /* Swipe right */

  if (difference > 50) {

    previousImage();

  }

}