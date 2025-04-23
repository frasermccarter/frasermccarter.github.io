let currentIndex = 0;
const DEFAULT_IMAGE = 'events/images/defaultPlaceholder.jpeg';

function init() {
    showEvents(pastEvents.events);
}

function showEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
    
    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card' + (index === 0 ? ' active' : '');
        eventCard.style.position = 'absolute';
        eventCard.style.left = `${index * 100}%`;
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image || DEFAULT_IMAGE}" alt="${event.title}" onerror="this.src='${DEFAULT_IMAGE}'">
                <div class="event-title">
                    <h2>${event.title}</h2>
                </div>
            </div>
            <div class="event-content">
                <p class="date">${event.date}</p>
                <div class="description-container">
                    <p class="description">${event.description}</p>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
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

function updateCarousel() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
            card.classList.add('active');
        }
        card.style.transform = `translateX(${-currentIndex * 100}%)`;
    });
}

window.addEventListener('DOMContentLoaded', init);