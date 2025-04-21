const SHEET_ID = '1RycWZM7wmHGTZ0FL_lvWerayks6p9nbiWquuI8ZpGjI';
const SHEET_NAME = 'Sheet1';
const SHEET_RANGE = 'A3:D100';

// Add API key handling
const getApiKey = () => {
    // Try environment variable first (for GitHub Pages)
    if (typeof process !== 'undefined' && process.env && process.env.SHEETS_API_KEY) {
        return process.env.SHEETS_API_KEY;
    }
    // Then try CONFIG object (for local development)
    if (typeof CONFIG !== 'undefined' && CONFIG.SHEETS_API_KEY) {
        return CONFIG.SHEETS_API_KEY;
    }
    console.error('No API key found');
    return null;
};

function getGoogleDriveImageUrl(url) {
    if (!url) return 'images/will.webp';
    
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    if (url.includes('drive.google.com')) {
        // Handle full Drive URLs
        const match = url.match(/[-\w]{25,}/);
        fileId = match ? match[0] : '';
    } else {
        // Handle direct file IDs
        fileId = url.trim();
    }
    
    if (!fileId) return 'images/will.webp';
    
    // Construct public image URL
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

async function loadEvents() {
    const container = document.querySelector('.events-container');
    container.innerHTML = '<div class="loading">Loading events...</div>';
    
    const apiKey = getApiKey();
    if (!apiKey) {
        container.innerHTML = '<div class="error">Configuration error: No API key available</div>';
        return;
    }
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${SHEET_RANGE}?key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Raw data:', data); // Debug log
        
        if (!data.values || data.values.length === 0) {
            container.innerHTML = '<div class="no-events">No events found</div>';
            return;
        }

        const events = data.values
            .map(row => {
                if (!row[0] || !row[1]) return null;

                // Parse DD/MM/YYYY format
                let eventDate;
                try {
                    const [day, month, year] = row[1].split('/').map(num => parseInt(num));
                    eventDate = new Date(year, month - 1, day + 1);

                    if (isNaN(eventDate.getTime())) {
                        console.error('Invalid date:', row[1]);
                        return null;
                    }
                } catch (e) {
                    console.error('Error parsing date:', row[1], e);
                    return null;
                }

                // Process Google Drive image URL
                const imageUrl = getGoogleDriveImageUrl(row[3]);
                console.log('Processing image URL:', row[3], '→', imageUrl); // Debug log

                return {
                    title: row[0].trim(),
                    date: eventDate.toISOString().split('T')[0],
                    description: row[2]?.trim() || '',
                    imageUrl: imageUrl
                };
            })
            .filter(event => event !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in reverse chronological order

        console.log('Processed events:', events); // Debug log

        if (events.length === 0) {
            container.innerHTML = '<div class="no-events">No events found</div>';
            return;
        }

        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
        container.innerHTML = `<div class="error">Failed to load events: ${error.message}</div>`;
    }
}

let currentEventIndex = 0;
let totalEvents = 0;

function displayEvents(events) {
    const container = document.querySelector('.events-container');
    container.innerHTML = '';
    totalEvents = events.length;

    events.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = `event-card ${index === 0 ? 'active' : ''}`;
        
        // Format date as DD/MM/YYYY
        const date = new Date(event.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        
        card.innerHTML = `
            <div class="event-image">
                <img src="${event.imageUrl}" alt="${event.title}" onerror="this.src='images/will.webp'">
                <h2>${event.title}</h2>
            </div>
            <div class="event-content">
                <p class="date">${formattedDate}</p>
                <p>${event.description}</p>
            </div>
        `;
        
        container.appendChild(card);
        
        // Set initial transform for non-active cards
        if (index !== 0) {
            card.style.transform = 'translateX(100%)';
        }
    });
}

function nextEvent() {
    const cards = document.querySelectorAll('.event-card');
    if (!cards.length) return;
    
    cards[currentEventIndex].classList.remove('active');
    cards[currentEventIndex].style.transform = 'translateX(-100%)';
    
    currentEventIndex = (currentEventIndex + 1) % totalEvents;
    
    cards[currentEventIndex].classList.add('active');
    cards[currentEventIndex].style.transform = 'translateX(0)';
}

function previousEvent() {
    const cards = document.querySelectorAll('.event-card');
    if (!cards.length) return;
    
    cards[currentEventIndex].classList.remove('active');
    cards[currentEventIndex].style.transform = 'translateX(100%)';
    
    currentEventIndex = (currentEventIndex - 1 + totalEvents) % totalEvents;
    
    cards[currentEventIndex].classList.add('active');
    cards[currentEventIndex].style.transform = 'translateX(0)';
}

// Call loadEvents when the page loads
document.addEventListener('DOMContentLoaded', loadEvents);