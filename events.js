let currentIndex = 0;
const SHEET_ID = '1RycWZM7wmHGTZ0FL_lvWerayks6p9nbiWquuI8ZpGjI';

function init() {
    Tabletop.init({
        key: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTjv5Id18zodr2j2TU7o5Xnmwyqnm7L2DWEDV2fw5noR5RLQKTWyYfs7Nh5s6y8V_hxCiEazSI0c0-R/pubhtml?gid=0&single=true`,
        simpleSheet: true,
        wanted: ['Sheet1'],
        callback: showEvents
    });
}

function showEvents(data) {
    // Sort events by date (newest first)
    data.sort((a, b) => parseDateDDMMYYYY(b.date) - parseDateDDMMYYYY(a.date));
    
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    data.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <img src="${event.imageUrl}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p class="date">${formatDate(event.date)}</p>
            <p class="description">${event.description}</p>
        `;
        eventsContainer.appendChild(eventCard);
    });

    updateCarousel();
}

function parseDateDDMMYYYY(dateStr) {
    const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
}

function formatDate(dateStr) {
    const date = parseDateDDMMYYYY(dateStr);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
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
    const container = document.getElementById('events-container');
    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('DOMContentLoaded', init);