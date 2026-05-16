// ============= FORM SUBMISSION =============
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  contactFeedback.textContent = `Terima kasih, ${name}! Pesan Anda telah dikirim.`;
  contactForm.reset();
});

// ============= SCROLL ANIMATION (Fade In) =============
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe semua elemen yang perlu animasi scroll
document.querySelectorAll(".soft-card, .project-card, .contact-card").forEach(el => {
  observer.observe(el);
});

// Custom cursor removed; default browser cursor now digunakan.
