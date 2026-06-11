// Hero backdrop slideshow: random background GIFs cross-fading between two
// stacked layers. Each image is fully preloaded before it fades in, the
// rotation pauses while the tab is hidden, and nothing loads at all for
// users who prefer reduced motion or have data saver enabled.

const root = document.querySelector('.hero__bg');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;

if (root && !reduceMotion && !saveData) {
    const gifs = JSON.parse(root.dataset.gifs || '[]');
    const layers = [...root.querySelectorAll('.hero__bg-layer')];

    if (gifs.length > 0 && layers.length === 2) {
        const INTERVAL = 13000;
        let active = 0;
        let current = -1;

        const pick = () => {
            if (gifs.length === 1) return 0;
            let next;
            do {
                next = Math.floor(Math.random() * gifs.length);
            } while (next === current);
            return next;
        };

        const preload = (src) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(src);
                img.onerror = reject;
                img.src = src;
            });

        const rotate = async () => {
            if (document.hidden) return;
            const next = pick();
            try {
                await preload(gifs[next]);
            } catch {
                return;
            }
            const idle = layers[1 - active];
            idle.style.backgroundImage = `url("${gifs[next]}")`;
            idle.classList.add('is-visible');
            layers[active].classList.remove('is-visible');
            active = 1 - active;
            current = next;
        };

        // Let the hero entrance and particle canvas settle before the
        // first backdrop fades in.
        setTimeout(async () => {
            current = pick();
            try {
                await preload(gifs[current]);
            } catch {
                return;
            }
            layers[active].style.backgroundImage = `url("${gifs[current]}")`;
            layers[active].classList.add('is-visible');
            setInterval(rotate, INTERVAL);
        }, 700);
    }
}
