// Home page motion: the WebGL contour field, the rolling role line,
// scroll parallax, magnetic buttons, and pointer spotlights on the focus
// cards. Everything degrades to a calm, static page under
// prefers-reduced-motion.

import { createHeroField } from './hero-field.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const hero = document.querySelector('.hero');

// ------------------------------------------------------------
//  Contour field
// ------------------------------------------------------------
const canvas = document.getElementById('hero-field');
const fallback = () => hero.classList.add('no-field');
let field = null;
try {
    field = canvas && createHeroField(canvas, { reducedMotion: reduceMotion, onLost: fallback });
} catch (err) {
    console.warn('hero-field:', err);
}
if (!field) fallback();

// ------------------------------------------------------------
//  Scroll parallax — publishes --hero-p (0 → 1 as the hero leaves)
// ------------------------------------------------------------
if (!reduceMotion) {
    let queued = false;
    const update = () => {
        queued = false;
        const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
        hero.style.setProperty('--hero-p', progress.toFixed(4));
        field?.setScroll(progress);
    };
    window.addEventListener(
        'scroll',
        () => {
            if (!queued) {
                queued = true;
                requestAnimationFrame(update);
            }
        },
        { passive: true }
    );
    update();
}

// ------------------------------------------------------------
//  Role line — letters roll over in 3D, one after another
// ------------------------------------------------------------
const role = document.querySelector('.hero__role');
const roles = JSON.parse(role.dataset.roles);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const whenVisible = () =>
    document.hidden
        ? new Promise((resolve) =>
              document.addEventListener('visibilitychange', resolve, { once: true })
          )
        : Promise.resolve();

function setLetters(text) {
    role.replaceChildren(
        ...[...text].map((char) => {
            const span = document.createElement('span');
            span.className = 'hero__role-char';
            span.textContent = char;
            return span;
        })
    );
    return [...role.children];
}

function roll(letters, direction) {
    const entering = direction === 'in';
    const hidden = {
        transform: `translateY(${entering ? 0.7 : -0.7}em) rotateX(${entering ? -90 : 90}deg)`,
        opacity: 0,
        filter: 'blur(3px)',
    };
    const shown = { transform: 'none', opacity: 1, filter: 'blur(0px)' };
    return Promise.all(
        letters.map(
            (letter, i) =>
                letter.animate(entering ? [hidden, shown] : [shown, hidden], {
                    duration: entering ? 760 : 460,
                    delay: i * (entering ? 34 : 20),
                    easing: entering ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.55, 0, 0.8, 0.3)',
                    fill: 'both',
                }).finished
        )
    );
}

if (!reduceMotion && role.animate) {
    (async () => {
        let index = 0;
        let letters = setLetters(roles[index]);
        letters.forEach((letter) => (letter.style.opacity = '0'));
        // Join the entrance just after the name has settled (timed from
        // navigation start, like the CSS entrance).
        await wait(Math.max(150, 1250 - performance.now()));
        letters.forEach((letter) => (letter.style.opacity = ''));
        await roll(letters, 'in');
        for (;;) {
            await wait(2600);
            await whenVisible();
            await roll(letters, 'out');
            index = (index + 1) % roles.length;
            letters = setLetters(roles[index]);
            await roll(letters, 'in');
        }
    })();
}

// ------------------------------------------------------------
//  Magnetic buttons and card spotlights (mouse / trackpad only)
// ------------------------------------------------------------
if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
        });
        el.addEventListener('pointerleave', () => {
            el.style.transform = '';
        });
    });

    document.querySelectorAll('.focus-card').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });
}
