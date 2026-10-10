// Client-side filtering for the posts/projects list pages: a text search
// over each card's data-search text and a toggle that reveals cards marked
// data-archived. State is mirrored to ?q= and ?archived=1 so links keep it.

const controls = document.querySelector('[data-list-controls]');
const grid = document.querySelector('[data-list]');

if (controls && grid) {
    const searchInput = controls.querySelector('[data-list-search]');
    const archivedToggle = controls.querySelector('[data-list-archived]');
    const empty = document.querySelector('[data-list-empty]');
    const cards = [...grid.children];

    const params = new URLSearchParams(location.search);
    if (searchInput) searchInput.value = params.get('q') ?? '';
    archivedToggle.checked = params.get('archived') === '1';

    const apply = () => {
        const terms = (searchInput?.value ?? '').toLowerCase().split(/\s+/).filter(Boolean);
        const showArchived = archivedToggle.checked;
        let visible = 0;

        cards.forEach((card) => {
            const text = card.dataset.search ?? '';
            const show =
                (showArchived || !card.hasAttribute('data-archived')) &&
                terms.every((term) => text.includes(term));
            card.hidden = !show;
            if (show) visible++;
        });

        if (empty) empty.hidden = visible > 0 || terms.length === 0;

        const url = new URL(location.href);
        terms.length ? url.searchParams.set('q', searchInput.value.trim()) : url.searchParams.delete('q');
        showArchived ? url.searchParams.set('archived', '1') : url.searchParams.delete('archived');
        history.replaceState(null, '', url);
    };

    searchInput?.addEventListener('input', apply);
    archivedToggle.addEventListener('change', apply);
    apply();
}
