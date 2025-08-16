# Weather App

A clean, functional weather application that provides real-time weather data and forecasts for any location using OpenWeatherMap API.

## Features

- **Real Weather Data**: Get actual weather information for any US ZIP code or city using OpenWeatherMap API
- **Location Memory**: Automatically remembers your last searched location
- **URL Sharing**: Share weather for specific ZIP codes via URL parameters (e.g., ?zip=23117)
- **7-Day Forecast**: View detailed weather forecasts with accurate daily temperature ranges
- **Mobile Responsive**: Optimized design that works great on all devices
- **Clean Interface**: Modern, user-friendly design focused on functionality

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to "My API Keys" section
4. Copy your API key

### 2. Configure Your API Key

**⚠️ IMPORTANT: Never commit API keys to version control!**

1. **Copy the config template**: The `config.js` file is already created with a template
2. **Add your API key**: Replace `'YOUR_API_KEY_HERE'` with your actual OpenWeatherMap API key
3. **Save the file**: The `config.js` file is already in `.gitignore` so it won't be committed

Example `config.js`:
```javascript
const config = {
    WEATHER_API_KEY: 'your_actual_api_key_here'
};
```

### 3. Run the Website

1. Open `index.html` in a web browser
2. Enter a ZIP code or city name to get weather data
3. Save locations for quick access
4. Share weather URLs with others

## How It Works

- **Location Search**: Enter ZIP codes or city names for weather data
- **Automatic Memory**: Last location is automatically saved to localStorage
- **URL Sharing**: Weather URLs include ZIP code parameters for easy sharing
- **Real-time Data**: Current conditions and 7-day forecasts from OpenWeatherMap
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## API Endpoints Used

- **ZIP Code Geocoding API**: Converts US ZIP codes to coordinates
- **City Geocoding API**: Converts city names to coordinates
- **5-Day Forecast API**: Gets weather data for current and upcoming days

## File Structure

```
WeatherApp/
├── index.html          # Main HTML file
├── css/
│   └── alternativeweather.css  # Responsive styles
├── js/
│   └── index.js        # Weather functionality
├── img/                # Weather icons
├── config.js           # API key configuration (create this)
└── README.md           # This file
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires internet connection for weather data
- Responsive design works on all screen sizes
- LocalStorage for saving locations

## Notes

- The free OpenWeatherMap API has rate limits (1000 calls/day)
- Weather data is updated every 3 hours
- Last location is saved locally in your browser
- URLs can be shared to show specific ZIP code weather 