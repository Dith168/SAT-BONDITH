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