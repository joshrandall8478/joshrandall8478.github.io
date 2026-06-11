// Scroll-reveal: elements with [data-reveal] fade in when they enter the
// viewport. Children of [data-reveal-stagger] are revealed in sequence.

document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    [...group.children].forEach((child, i) => {
        if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
        child.style.setProperty('--reveal-delay', `${Math.min(i * 70, 420)}ms`);
    });
});

const targets = document.querySelectorAll('[data-reveal]');

if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
}
