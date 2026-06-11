// Hero particle network: drifting green nodes joined by faint lines,
// gently reactive to the pointer. Honors prefers-reduced-motion.

const canvas = document.getElementById('hero-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ACCENT = { r: 119, g: 221, b: 119 };
    const MINT = { r: 193, g: 225, b: 193 };
    const LINK_DIST = 130;
    const MOUSE_DIST = 150;

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;
    const pointer = { x: -1e4, y: -1e4 };

    function seed() {
        const count = Math.min(110, Math.max(32, Math.round((width * height) / 20000)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.7,
            mint: Math.random() < 0.18,
        }));
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
        if (reduceMotion) draw();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < LINK_DIST) {
                    const alpha = (1 - dist / LINK_DIST) * 0.32;
                    ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (const p of particles) {
            const c = p.mint ? MINT : ACCENT;
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.85)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function step() {
        for (const p of particles) {
            // Gentle push away from the pointer.
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_DIST && dist > 0.001) {
                const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.06;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }

            // Cap velocity so pointer interaction never gets wild.
            const speed = Math.hypot(p.vx, p.vy);
            const maxSpeed = 0.9;
            if (speed > maxSpeed) {
                p.vx = (p.vx / speed) * maxSpeed;
                p.vy = (p.vy / speed) * maxSpeed;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
        }

        draw();
        rafId = requestAnimationFrame(step);
    }

    function start() {
        if (rafId === null && !reduceMotion) rafId = requestAnimationFrame(step);
    }

    function stop() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stop() : start();
    });

    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
    });
    hero.addEventListener('pointerleave', () => {
        pointer.x = -1e4;
        pointer.y = -1e4;
    });

    resize();
    reduceMotion ? draw() : start();
}
