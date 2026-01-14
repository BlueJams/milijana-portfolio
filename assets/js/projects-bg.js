document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("projects-bg");
    const ctx = canvas.getContext("2d");

    let width, height;
    let streams = [];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        width = window.innerWidth;      // FULL SCREEN WIDTH
        height = rect.height;           // SECTION HEIGHT

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    function initStreams() {
        streams = [];
        const spacing = 140;
        const count = Math.ceil(width / spacing);

        for (let i = 0; i < count; i++) {
            streams.push({
                x: i * spacing + Math.random() * 40,
                y: Math.random() * height,
                speed: 0.15 + Math.random() * 0.3,
                nodes: Array.from({ length: 4 }, () => ({
                    offset: Math.random() * height
                }))
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        streams.forEach(stream => {
            // vertical line
            ctx.strokeStyle = "rgba(0,255,255,0.05)";
            ctx.beginPath();
            ctx.moveTo(stream.x, 0);
            ctx.lineTo(stream.x, height);
            ctx.stroke();

            // nodes
            stream.nodes.forEach(node => {
                const y = (stream.y + node.offset) % height;
                ctx.beginPath();
                ctx.arc(stream.x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0,255,255,0.35)";
                ctx.shadowBlur = 6;
                ctx.shadowColor = "rgba(0,255,255,0.3)";
                ctx.fill();
            });

            stream.y += stream.speed;
        });

        ctx.shadowBlur = 0;
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        resize();
        initStreams();
    });

    resize();
    initStreams();
    animate();
});
