# Botanica Website

## Adding Past Events

Events are stored in `/events/events-data.js`. To add a new event:

1. Open `events/events-data.js`
2. Add a new event object to the `events` array
3. Follow this template:

```javascript
{
    title: "Event Title Here",
    date: "DD Month YYYY",
    description: "Event description here...",
    image: "events/images/your-image.webp"
}
```

### Example
```javascript
{
    title: "Summer Bass Night",
    date: "15 August 2023",
    description: "A night of deep bass and good vibes in the heart of Edinburgh.",
    image: "events/images/bass-night.webp"
}
```

### Important Notes
- Add new events at the start of the array (top of the list)
- Make sure to include commas between events
- Image path should be relative to the website root
- Supported image formats: .webp, .jpg, .png
- Place event images in the `events/images` folder
- Keep image sizes reasonable (recommended max 1MB)
- Make sure all quotation marks match the format shown above

### Event Image Guidelines
- Landscape orientation recommended
- Minimum width: 800px
- Maximum file size: 1MB
- Convert images to .webp format for better performance
- Place images in the `events/images` folder
