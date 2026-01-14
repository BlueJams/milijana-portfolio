const circles = document.querySelectorAll(".circle");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const circle = entry.target;
        const percent = circle.dataset.percent;
        const ring = circle.querySelector(".ring-progress");

        const circumference = 314;
        const offset = circumference - (circumference * percent) / 100;

        ring.style.strokeDashoffset = offset;

        observer.unobserve(circle);
    });
}, { threshold: 0.4 });

circles.forEach(c => observer.observe(c));
