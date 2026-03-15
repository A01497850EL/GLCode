// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 },
);

document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

// Badger animation
const badger = document.getElementById("badger");

const badgerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        badger.classList.add("animate");
      } else {
        badger.classList.remove("animate");
      }
    });
  },
  { threshold: 0.6 },
);

badgerObserver.observe(document.querySelector(".hero-left"));
