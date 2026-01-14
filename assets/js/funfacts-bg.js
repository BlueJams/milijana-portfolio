const funCanvas = document.getElementById("funfacts-bg");
const fctx = funCanvas.getContext("2d");

let fw, fh;
let particles = [];

function resizeFunFacts() {
    fw = funCanvas.offsetWidth;
    fh = funCanvas.offsetHeight;
    funCanvas.width = fw;
    funCanvas.height = fh;
}

window.addEventListener("resize", resizeFunFacts);
resizeFunFacts();

function createParticles() {
    particles = [];
    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * fw,
            y: Math.random() * fh,
            radius: 1.5 + Math.random() * 2,
            speed: 0.15 + Math.random() * 0.3,
            alpha: 0.2 + Math.random() * 0.4
        });
    }
}

createParticles();

function animateFunFacts() {
    fctx.clearRect(0, 0, fw, fh);

    particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -10) p.y = fh + 10;

        fctx.beginPath();
        fctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
        fctx.shadowBlur = 8;
        fctx.shadowColor = "rgba(0,255,255,0.5)";
        fctx.fill();
    });

    fctx.shadowBlur = 0;
    requestAnimationFrame(animateFunFacts);
}

animateFunFacts();

