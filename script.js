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

let galleryImages = Array.from(
  document.querySelectorAll(".project-item img")
);

const klassyMenuGallery = [
  {
    src: "pic/coverwatch.jpg",
    alt: "Front Cover"
  },
  {
    src: "pic/backwatch.jpg",
    alt: "Back Cover Menu"
  },
  {
    src: "pic/watch2.jpg",
    alt: "Inside Page"
  },
  {
    src: "pic/watch3.jpg",
    alt: "Page 3"
  },
  {
    src: "pic/watch4.jpg",
    alt: "Page 4"
  },
  {
    src: "pic/watch5.jpg",
    alt: "Page 5"
  },
  {
    src: "pic/watch6.jpg",
    alt: "Page 6"
  },
  {
    src: "pic/watch7.jpg",
    alt: "Page 7"
  },
  {
    src: "pic/watch8.jpg",
    alt: "Page 8"
  },
  {
    src: "pic/watch9.jpg",
    alt: "Page 9"
  },
  {
    src: "pic/watch10.jpg",
    alt: "Page 10"
  },
  {
    src: "pic/watch11.jpg",
    alt: "Page 11"
  }
];


const klassyMenuCard =
  document.querySelector(
    '[data-project="klassy-menu"]'
  );

if (klassyMenuCard) {
  klassyMenuCard.addEventListener("click", () => {
    galleryImages = klassyMenuGallery;
    currentIndex = 0;

    showImage();

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
}
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
  if (!galleryImages.length || !lightboxImg) {
    return;
  }

  const image = galleryImages[currentIndex];

  if (typeof image === "object" && image.src) {
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt || "";
  } else {
    lightboxImg.src = image.getAttribute("src");
    lightboxImg.alt = image.getAttribute("alt") || "";
  }

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


/* =========================================================
   MOTION LAYER - add AFTER script.js
   <script src="motion.js"></script>
========================================================= */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Scroll progress bar */
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    });
  }, { passive: true });

  /* 2. Hero sequence: tag hero children with an order number */
  document.querySelectorAll("#home .left > *, .profile-img").forEach((el, i) => {
    el.classList.add("hero-seq");
    el.style.setProperty("--s", i);
  });

  /* 3. Typed role line */
  const h1 = document.querySelector("#home h1");
  if (h1) {
    const line = document.createElement("div");
    line.className = "role-line hero-seq";
    line.style.setProperty("--s", 1.5);
    line.innerHTML = '<span class="text"></span><span class="caret"></span>';
    h1.after(line);

    const target = line.querySelector(".text");
    const roles = ["Graphic Designer", "Brand Identity", "Social Media Design", "Menu & Print Design"];

    if (reduce) {
      target.textContent = roles[0];
    } else {
      let r = 0, c = 0, deleting = false;
      const tick = () => {
        const word = roles[r];
        target.textContent = word.slice(0, c);
        if (!deleting && c === word.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
        if (deleting && c === 0) {
          deleting = false;
          r = (r + 1) % roles.length;
        }
        c += deleting ? -1 : 1;
        setTimeout(tick, deleting ? 35 : 70);
      };
      setTimeout(tick, 1200);
    }
  }

  /* 4. Staggered wave for project cards and skills */
  const items = document.querySelectorAll(".project-item, .skill");
  items.forEach((el) => el.classList.add("reveal"));

  const waveObserver = new IntersectionObserver((entries) => {
    // entries that appear together get a small incremental delay
    let n = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty("--d", `${Math.min(n, 8) * 0.07}s`);
      entry.target.classList.add("in");
      waveObserver.unobserve(entry.target);
      n++;
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => waveObserver.observe(el));

  /* 5. Button ripple */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn || reduce) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${e.clientX - rect.left - size / 2}px`;
    dot.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  });

  /* 6. Lightbox open + image swap animations */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");

  if (lightbox && !reduce) {
    new MutationObserver(() => {
      lightbox.classList.toggle("open", lightbox.style.display === "flex");
    }).observe(lightbox, { attributes: true, attributeFilter: ["style"] });
  }

  if (lbImg && !reduce) {
    new MutationObserver(() => {
      lbImg.classList.remove("swap");
      void lbImg.offsetWidth; // restart animation
      lbImg.classList.add("swap");
    }).observe(lbImg, { attributes: true, attributeFilter: ["src"] });
  }
})();


/* =========================================================
   WATER NAVBAR - add AFTER script.js and motion.js
   <script src="water-nav.js"></script>
========================================================= */
(() => {
  const navbar = document.querySelector(".navbar");
  const list = navbar && navbar.querySelector("ul");
  const links = document.querySelectorAll(".navbar .nav-link");
  if (!navbar || !list || !links.length) return;

  /* Liquid blob */
  const blob = document.createElement("span");
  blob.className = "water-blob";
  list.prepend(blob);

  let current = null;

  function moveTo(link, animate = true) {
    if (!link) return;
    const li = link.parentElement;
    const changed = current !== link;
    current = link;

    // measure relative to the <ul>
    blob.style.left = li.offsetLeft + "px";
    blob.style.top = li.offsetTop + "px";
    blob.style.width = li.offsetWidth + "px";
    blob.style.height = li.offsetHeight + "px";

    if (animate && changed) {
      blob.classList.remove("moving");
      void blob.offsetWidth;
      blob.classList.add("moving");
    }
  }

  const activeLink = () =>
    document.querySelector(".navbar .nav-link.active") || links[0];

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => moveTo(link));
    link.addEventListener("focus", () => moveTo(link));
  });
  list.addEventListener("mouseleave", () => moveTo(activeLink()));

  // follow the scroll-spy from script.js
  const spy = new MutationObserver(() => {
    if (!list.matches(":hover")) moveTo(activeLink());
  });
  links.forEach((l) => spy.observe(l, { attributes: true, attributeFilter: ["class"] }));

  // initial position (after fonts/emoji load) + on resize
  const place = () => moveTo(activeLink(), false);
  window.addEventListener("load", place);
  window.addEventListener("resize", place);
  setTimeout(place, 100);

  /* Water ripples where you click the navbar */
  navbar.addEventListener("click", (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = navbar.getBoundingClientRect();
    for (let i = 0; i < 2; i++) {
      const ring = document.createElement("span");
      ring.className = "water-ripple";
      ring.style.left = e.clientX - rect.left + "px";
      ring.style.top = e.clientY - rect.top + "px";
      ring.style.animationDelay = i * 0.15 + "s";
      navbar.appendChild(ring);
      ring.addEventListener("animationend", () => ring.remove());
    }
  });
})();

/* =========================================================
   PDF BOOKLET PROJECT
========================================================= */

const pdfProject =
  document.querySelector(".pdf-project-card");

const pdfViewer =
  document.getElementById("pdfViewer");


if (pdfProject && pdfViewer) {

  pdfProject.addEventListener("click", () => {

    pdfViewer.classList.add("active");

    document.body.style.overflow = "hidden";

  });

}


function closePDF() {

  if (!pdfViewer) return;

  pdfViewer.classList.remove("active");

  document.body.style.overflow = "";

}
