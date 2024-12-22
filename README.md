# Interactive Image Gallery

🌐 **Live Demo**: [https://galleries-delta.vercel.app/](https://galleries-delta.vercel.app/)

A modern, responsive image gallery built with vanilla JavaScript, featuring an interactive UI with search, autocomplete, tooltips, and a carousel.

## Features

- **Image Carousel**
  - Auto-rotating featured images
  - Manual navigation with previous/next buttons
  - Smooth transitions

- **Search Functionality**
  - Real-time search with autocomplete
  - Reset button to clear search
  - Instant filtering of gallery items

- **Interactive Gallery**
  - Hover tooltips showing image previews
  - Star rating display
  - Responsive grid layout
  - Smooth hover animations

- **Clean Design**
  - Modern, minimalist interface
  - No external dependencies
  - Responsive layout for all screen sizes

## Project Structure

```
hwgroup/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── images.json     # Image data source
```

## Setup

1. Clone the repository
2. Set up a local static server (any of these options):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js's http-server
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```
3. Open your browser and navigate to:
   - Python/PHP: `http://localhost:8000`
   - http-server: `http://localhost:8080`

> **Note**: Opening `index.html` directly in a browser won't work due to CORS restrictions when fetching the JSON data. A local server is required.

## Usage

### Adding New Images

Add new images to `images.json` following this format:
```json
{
  "image_url": "path/to/image.jpg",
  "title": "Image Title",
  "rating": 5,
  "is_featured": true
}
```

### Customization

- Modify `styles.css` to change the appearance
- Adjust grid layout in CSS for different image sizes
- Update carousel timing in JavaScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
