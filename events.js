let currentIndex = 0;
const DEFAULT_IMAGE = 'events/images/defaultPlaceholder.jpeg';

function showEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card' + (index === currentIndex ? ' active' : '');
        eventCard.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image || DEFAULT_IMAGE}" alt="${event.title}" onerror="this.src='${DEFAULT_IMAGE}'">
                <div class="event-title">
                    <h2>${event.title}</h2>
                </div>
            </div>
            <div class="event-content">
                <div class="date">${event.date}</div>
                <div class="description-container">
                    <p class="description">${event.description}</p>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
    updateCarousel();
}

function updateCarousel() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, idx) => {
        if (idx === currentIndex) {
            card.classList.add('active');
            card.setAttribute('tabindex', '0');
        } else {
            card.classList.remove('active');
            card.setAttribute('tabindex', '-1');
        }
    });
}

function previousEvent() {
    const cards = document.querySelectorAll('.event-card');
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

function nextEvent() {
    const cards = document.querySelectorAll('.event-card');
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

function handleKeydown(e) {
    if (e.key === 'ArrowLeft') previousEvent();
    if (e.key === 'ArrowRight') nextEvent();
}

function init() {
    showEvents(pastEvents.events);
    document.querySelector('.carousel-button.prev').onclick = previousEvent;
    document.querySelector('.carousel-button.next').onclick = nextEvent;
    document.addEventListener('keydown', handleKeydown);
}

window.addEventListener('DOMContentLoaded', init);