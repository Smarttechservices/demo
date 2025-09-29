// script.js

let index = 0; // current slide
let interval;  // interval reference
const intervalTime = 3000; // 3 seconds

function updateSlide() {
    const slides = document.querySelector(".slides");
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Move slides manually (called by buttons)
function moveSlide(step) {
    const slides = document.querySelector(".slides");
    if (!slides) return;

    const total = slides.children.length;
    index = (index + step + total) % total;
    updateSlide();
    resetAutoSlide(); // restart auto-scroll after manual navigation
}

// Start automatic sliding
function startAutoSlide() {
    stopAutoSlide(); // clear any existing interval
    interval = setInterval(() => {
        const slides = document.querySelector(".slides");
        if (!slides) return;

        const total = slides.children.length;
        index = (index + 1) % total;
        updateSlide();
    }, intervalTime);
}

// Stop automatic sliding
function stopAutoSlide() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

// Reset (useful when clicking buttons)
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Initialize slider after page loads
document.addEventListener("DOMContentLoaded", () => {
    updateSlide();
    startAutoSlide();

    // Pause on hover
    const slider = document.querySelector(".slider");
    if (slider) {
        slider.addEventListener("mouseenter", stopAutoSlide);
        slider.addEventListener("mouseleave", startAutoSlide);
    }

    // Expose function globally (so inline onclick works)
    window.moveSlide = moveSlide;
});
