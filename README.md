# Motiva — Discover, Save & Revisit Inspiring Quotes

Motiva is a minimalist, elegant web application designed to help users discover and curate a personal collection of inspiring quotes. Built with modern vanilla JavaScript and CSS, it provides a seamless experience for fetching random quotes from an external API and storing them locally for future reflection.

## Features

- **Random Quote Discovery**: Fetch high-quality quotes across various categories using the API Ninjas service.
- **Personal Favorites**: Save quotes that resonate with you to your local collection with a single click.
- **Local Persistence**: Your favorite quotes are stored in your browser's `localStorage`, ensuring they are available even after closing the tab.
- **Manage Collection**: View your saved quotes in reverse chronological order, remove individual quotes, or clear your entire collection.
- **Elegant UI**: A clean, typography-focused design using the "Inter" and "Playfair Display" fonts for a premium reading experience.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## Technical Stack

- **HTML5**: Semantic structure for accessibility and SEO.
- **CSS3**: Custom styling with a focus on modern typography and responsive layouts.
- **Vanilla JavaScript (ES6+)**: Modular code structure using ES modules for clean logic separation.
- **API Integration**: Utilizes the Fetch API with a custom timeout mechanism and `Promise.race` for robust network handling.
- **LocalStorage API**: For client-side data persistence without the need for a backend database.

## Getting Started

### Prerequisites

To fetch new quotes, the app requires an API key from [API Ninjas](https://api-ninjas.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/motiva.git
   ```
2. Navigate to the project directory:
   ```bash
   cd motiva
   ```
3. Open `config.js` and ensure your API key is correctly set:
   ```javascript
   export const ENV = {
     QUOTES_API: "https://api.api-ninjas.com/v2/randomquotes",
     API_KEY: "YOUR_API_KEY_HERE",
     // ...
   }
   ```
4. Open `index.html` in a modern web browser (Note: Due to the use of ES Modules, you may need to serve the files using a local server like `Live Server` in VS Code).

## Project Structure

```text
Motiva/
├── index.html    # Main application structure
├── style.css     # Custom styles and typography
├── app.js        # Core application logic and API handling
├── config.js     # Environment variables and configuration
└── quote.png     # Application icon
```

## License

This project is open-source and available under the [MIT License](LICENSE).

