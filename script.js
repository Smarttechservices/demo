function createSlider(sliderSelector, intervalTime = 3000) {
    let index = 0;
    let interval;

    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const slides = slider.querySelector(".slides");
    if (!slides) return;

    const dots = slider.parentElement.querySelectorAll(".dots .dot");

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;

        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }

    }

    function moveSlide(step) {
        const total = slides.children.length;
        index = (index + step + total) % total;
        updateSlide();
        resetAutoSlide();
    }

    function startAutoSlide() {
        stopAutoSlide();
        interval = setInterval(() => {
            const total = slides.children.length;
            index = (index + 1) % total;
            updateSlide();
        }, intervalTime);
    }

    function stopAutoSlide() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => goToSlide(i));
    });

    // Pause on hover
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    // init
    updateSlide();
    startAutoSlide();

    return { moveSlide, startAutoSlide, stopAutoSlide };
}
window.addEventListener('DOMContentLoaded', () => {
        const yearElement = document.getElementById('year');
        if(yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    });
// Init multiple sliders
document.addEventListener("DOMContentLoaded", () => {
    window.slider1 = createSlider("#slider1", 3000); // पहिला slider (3 सेकंद)
    window.slider2 = createSlider("#slider2", 4000); // दुसरा slider (4 सेकंद)
});
