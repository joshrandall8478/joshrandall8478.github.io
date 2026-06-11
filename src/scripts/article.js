// Article niceties: reading-progress bar and back-to-top button.

const bar = document.getElementById('read-progress-bar');
const toTop = document.getElementById('to-top');

function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (bar) {
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.width = `${progress * 100}%`;
    }
    if (toTop) {
        toTop.classList.toggle('is-visible', window.scrollY > 600);
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
