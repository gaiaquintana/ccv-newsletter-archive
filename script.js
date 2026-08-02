async function loadNewsletters() {
  const listEl = document.getElementById('newsletter-list');

  try {
    const response = await fetch('newsletters.json');
    const newsletters = await response.json();

    const sorted = [...newsletters].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    renderNewsletters(sorted, listEl);
  } catch (error) {
    listEl.innerHTML = '<p class="empty-state">No se pudieron cargar las ediciones. Intentá de nuevo más tarde.</p>';
    console.error('Error al cargar newsletters.json:', error);
  }
}

function renderNewsletters(newsletters, listEl) {
  if (!newsletters.length) {
    listEl.innerHTML = '<p class="empty-state">Todavía no hay ediciones publicadas.</p>';
    return;
  }

  listEl.innerHTML = newsletters.map(createCard).join('');
  setupCardClicks(listEl);
}

function createCard(newsletter) {
  const { title, date, image, description, link } = newsletter;

  return `
    <article class="newsletter-card" data-link="${link}">
      <div class="newsletter-card__image-wrap">
        <img class="newsletter-card__image" src="${image}" alt="${title}">
      </div>
      <div class="newsletter-card__body">
        <div class="newsletter-card__meta">
          <p class="newsletter-card__date">${formatDate(date)}</p>
        </div>
        <h2 class="newsletter-card__title">${title}</h2>
        <p class="newsletter-card__description">${description}</p>
        <a class="newsletter-card__link" href="${link}" target="_blank" rel="noopener noreferrer">Leer la edición</a>
      </div>
    </article>
  `;
}

function setupCardClicks(listEl) {
  listEl.querySelectorAll('.newsletter-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        return;
      }
      window.open(card.dataset.link, '_blank', 'noopener,noreferrer');
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return dateString;
  }

  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
loadNewsletters();
