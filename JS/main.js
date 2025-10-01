
document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // Hero Slider
  // ========================
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".hero-dots");
  let currentIndex = 0;
  let interval;

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      goToSlide(i);
      resetInterval();
    });
  });

  const dots = dotsContainer.querySelectorAll("button");

  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startInterval() {
    interval = setInterval(nextSlide, 5000); // 5s per slide
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Start auto-slide
  startInterval();

  // Pause on hover (desktop only)
  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", () => clearInterval(interval));
  hero.addEventListener("mouseleave", () => resetInterval());

  // ========================
  // Mobile Nav Toggle
  // ========================
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // update aria-expanded for accessibility
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
  });

  // ========================
  // Counter animation (fixed duration)
  // ========================
  const counters = document.querySelectorAll(".counter");
  const duration = 2000; // total animation time in ms
  const frameRate = 20;  // update every 20ms → ~50fps

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const steps = duration / frameRate;
      const increment = target / steps;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.floor(count).toLocaleString();
          setTimeout(updateCount, frameRate);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCount();
    });
  };

  // Trigger when stats section comes into view
  const statsSection = document.querySelector(".tournament-stats");
  let animated = false;

  window.addEventListener("scroll", () => {
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (!animated && sectionTop < window.innerHeight - 100) {
      animateCounters();
      animated = true;
    }
  });

  // ========================
// Dark / Light Mode Toggle
// ========================
const themeToggle = document.getElementById("theme-toggle");

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // Swap icon
  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "☀️"; // light mode active
  } else {
    themeToggle.textContent = "🌙"; // dark mode active
  }

  // Save preference
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  }
});

});
