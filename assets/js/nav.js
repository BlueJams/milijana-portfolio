const links = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section');

/* Smooth scrolling */
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').split('#')[1];
        const target = document.getElementById(targetId);

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* Active link on scroll */
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const modalTech = document.getElementById("modalTech");

document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "block";

        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;

        // Clear old content
        modalGallery.innerHTML = "";
        modalTech.innerHTML = "";

        // Gallery images with captions (max 4)
        JSON.parse(card.dataset.images).slice(0, 4).forEach(item => {
            const wrapper = document.createElement("div");
            wrapper.className = "modal-image";

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.caption || "";

            const caption = document.createElement("p");
            caption.className = "modal-caption";
            caption.textContent = item.caption || "";

            wrapper.appendChild(img);
            wrapper.appendChild(caption);
            modalGallery.appendChild(wrapper);
        });

        // Technologies
        card.dataset.tech.split(",").forEach(tech => {
            const span = document.createElement("span");
            span.textContent = tech;
            modalTech.appendChild(span);
        });
    });
});

document.querySelector(".modal .close").onclick = () => {
    modal.style.display = "none";
};

window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});
